# -*- coding: utf-8 -*-
from flask import *
import os
import sys
import redisdb as db
import base64
import os.path
import requests

from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


SHIRT_IMAGE_DIR = "shirt_images"
STATIC_DUMP_FILENAME = "textfaces_static.html"

DEVMODE = "TEXTFACES_DEV" in os.environ

SHIRT_API_BASE_URL = "https://rapanuistore.com/api-access-point/"

if DEVMODE:
    TEXTFACES_BASE_PATH = "/home/alex/dev/textfac.es/repo/"
else:
    TEXTFACES_BASE_PATH = "/var/sites/textfac.es/"

sys.path.append(TEXTFACES_BASE_PATH)

MOBILE_USER_AGENTS = "android|fennec|iemobile|iphone|opera|mobile".split("|")


app = Flask(__name__)
DB = db.TextfaceDB()

#TODO use app.root_path? Probably.

def _shirt_path(faceid):
    path = "%s%s/%s_black.png" % (TEXTFACES_BASE_PATH, SHIRT_IMAGE_DIR, faceid)
    return path

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


#@app.context_processor
#def override_url_for():
#    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['t'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


# @app.route('/face/<face_name>')
# Currently unused. But let's use it for sick SEO.
def show_face(face_name):

    query_result = DB.get_face_and_desc(face_name)
    print query_result
    if query_result:
        face,desc = query_result[0]
        return render_template("face.html", face=face, desc=desc)
    else:
        return render_template('page_not_found.html'), 404

def pairify(iterable):
    for i in range(1, len(iterable), 2):
        yield (iterable[i - 1], iterable[i])

@app.route('/')
def faces():
    is_mobile = request.user_agent.platform in MOBILE_USER_AGENTS
    pairs = pairify(DB.get_all_face_data())
    pairs = [[(0,0,"=]"), (1,1,"=D")]]

    return render_template("main.html", facepairs=pairs, is_mobile=is_mobile)


@app.route("/click", methods=['POST', 'OPTIONS'])
@crossdomain(origin="*")
def increment():
    faceid = request.form.get('id')
    DB.increment(faceid)
    return redirect('/') 

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/json")
def dump_to_json():
    # List of tuples of (id, uses, face text)
    # You're welcome @rx.

    all_faces = DB.get_all_face_data()
    facedata = {
        'faces' : {},
    }
    for fid, uses, face in all_faces:
        facedict = facedata['faces']
        facedict[fid] = {}
        facedict[fid]['uses'] = uses
        facedict[fid]['face'] = face

    return json.dumps(facedata, indent=4, separators=(',', ': '))

@app.route('/shirtimage/<int:faceid>/<colour>')
def get_shirt_image(faceid, colour):
    return send_from_directory(TEXTFACES_BASE_PATH + SHIRT_IMAGE_DIR, "%s_%s.png" % (faceid, colour))

@app.route("/shirts")
def show_shirts():
    # Only show the faces that have a shirt.
    pairs = pairify(filter(lambda facedata: os.path.isfile(_shirt_path(facedata[0])), DB.get_all_face_data()))

    return render_template("shirts.html", facepairs=pairs)

@app.route("/get_shirt_url", methods=["POST"])
def get_shirt_url():
    fields = request.form.to_dict()

    face_id = fields["face_id"]
    face_colour = fields["face_colour"]
    shirt_colour = fields["shirt_colour"]

    face_image_url = "http://textfac.es/shirtimage/%s/%s" % (face_id, face_colour)

    api_call_fields = {
        "api_key": "ea77dc0f36685aa03dc880c780719309",
        "image_url": face_image_url,
        "colour": shirt_colour,
        "landing_page": "product",
        "product_name": "A stylish textfac.es shirt!"
    }

    # POST to the API and get a URL back.
    r = requests.post(SHIRT_API_BASE_URL, data=api_call_fields)
    url = r.text
    return url

@app.route("/recieveimage", methods=["POST"])
def recieve_image():
    if app.debug:
        fields = request.form.to_dict()
        save_new_face(fields)
        return "ty"
    else:
        abort(403)

def save_new_face(fields):
    data = fields["img"]
    faceid = fields["faceid"]
    if "colour" in fields:
        colour = fields["colour"]
    else:
        # SENSIBLE DEFAULTS WOO
        colour = "black"

    # Yes nailed it #notremotecodeexecution
    os.system("mkdir -p %s" % SHIRT_IMAGE_DIR)
    with open("%s/%s_%s.png" % (SHIRT_IMAGE_DIR, faceid, colour), 'w') as f:
        f.write(dataUrlToPNG(data))

def dataUrlToPNG(data):
    return base64.b64decode(data.strip().split(',')[1])

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

if __name__ == "__main__":
    app.run(debug=DEVMODE)
