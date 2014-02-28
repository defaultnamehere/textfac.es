# -*- coding: utf-8 -*-

import sys
from urlparse import urlparse, urlunparse
from flask import *
import db
import datetime
app = Flask(__name__)
DB = db.textfaceDB()

DIR = "/home/defaultname/webapps/textfaces/htdocs"
sys.path.append(DIR)

from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


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


@app.before_request
def redirect_nonwww():
    """Redirect non-www requests to www."""
    urlparts = urlparse(request.url)
    if urlparts.netloc == 'www.textfac.es':
        urlparts_list = list(urlparts)
        urlparts_list[1] = 'textfac.es'
        return redirect(urlunparse(urlparts_list), code=301)

@app.route('/face/<face_name>')
def show_face(face_name):

    query_result = DB.get_face_and_desc(face_name)
    print query_result
    if query_result:
        face,desc = query_result[0]
        return render_template("face.html", face=face, desc=desc)
    else:
        return render_template('page_not_found.html'), 404



@app.route('/')
def faces():
    #If I were a good programmer, I'd have the DB sort the data
    #results = sorted(DB.get_all_face_data(), key=lambda x: x[2], reverse=True)
    results = DB.get_all_face_data()
    #whether the page has been seen
    viewed = request.cookies.get('bookmarked')
    bookmarked = viewed != None #true if the page has been seen before
    render_popup = not bookmarked
    #actually render the page,
    template = render_template("main.html", faceids=results, bookmarked=render_popup)
    if render_popup:
        resp = make_response(template)
        now = datetime.datetime.now()
        expiry_time = now + datetime.timedelta(days=3650) #yeah okay. Thanks datetime!
        #black magic to set the cookie
        resp.set_cookie('bookmarked', 'hopefully', expires=expiry_time)
        return resp
    return template

@app.route("/increment", methods=['POST', 'GET'])
def increment():
    faceid = request.args.get('id')
    DB.write_increment(faceid)
    return redirect('/') 

@app.route("/about")
def about():
    return render_template("about.html")

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404
