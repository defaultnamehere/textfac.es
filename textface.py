# -*- coding: utf-8 -*-
from flask import *
import sys
import redisdb as db

from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

app = Flask(__name__)
DB = db.TextfaceDB()

sys.path.append(db.TEXTFACES_PATH)
FACES_DIR = "shirt_images"
STATIC_DUMP_FILENAME = "textfaces_static.html"

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

def dump_to_file():
    with open(STATIC_DUMP_FILENAME, 'w') as f:
        f.write(faces())

def pairify(iterable):
    for i in range(1, len(iterable), 2):
        yield (iterable[i - 1], iterable[i])

@app.route('/')
def faces():
    pairs = pairify(DB.get_all_face_data())
    symbols = pairify(DB.get_all_symbol_data())
    return render_template("main.html", facepairs=pairs, symbolpairs=symbols)

@app.route("/click", methods=['POST'])
def increment():
    faceid = request.args.get('id')
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
    symbols = DB.get_all_symbol_data()
    facedata = {
        'faces' : {},
        'symbols' : {}
    }
    for fid, uses, face in all_faces:
        facedict = facedata['faces']
        facedict[fid] = {}
        facedict[fid]['uses'] = uses
        facedict[fid]['face'] = face

    for sid, uses, symbol in symbols:
        symboldict = facedata['symbols']
        symboldict[sid] = {}
        symboldict[sid]['uses'] = uses
        symboldict[sid]['symbol'] = symbol

    return json.dumps(facedata, indent=4, separators=(',', ': '))

@app.route("/recieveimage")
def recieve_image():
    if app.debug:
        fields = request.get_json()
        save_new_face(fields)
    else:
        abort(403)

def save_new_face(fields):
        data = fields["image"]
        faceid = fields["faceid"]
        with open(FACES_DIR + "/" + faceid, 'w') as f:
            f.write(data)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404


if __name__ == "__main__":
    dump_to_file()
