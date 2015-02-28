from flask import *
from textface import app 
from textface import faces
import redisdb as db
DB = db.textfaceDB()
pairs = DB.get_all_face_data()

