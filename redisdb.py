import redis
import os
if  "alex" in os.getenv("HOME"):
    BASE_PATH = "/home/alex/dev/textfac.es/repo/"
else:
    BASE_PATH = "/var/sites/textfac.es/"



class textfaceDB():

    def __init__(self):
        redis_password = "de23ce07d0e1b640837f78e3e0a7ab93afdbc0e6"
        self.server = redis.Redis('localhost', password=redis_password)
        self.max_face_id = None
        self.max_symbol_id = None

    def load_faces_from_file(self, filename):
        with open(filename, 'rU') as f:
            for i, line in enumerate(f):
                self.server.hmset(i, {
                    "uses": 0,
                    "face" : line.strip()
                })
                self.max_face_id = i

    def increment(self, faceid):
        self.server.hincrby(faceid, "uses", 1)

    def load_symbols_from_file(self, filename):
        """Keys for unicode symbols are u<id>, as opposed to just <id> for faces"""
        with open(filename, 'rU') as f:
            for i, line in enumerate(f):
                self.server.hmset("u%s" % i, {
                    "uses": 0,
                    "symbol" : line.strip()
                })
                self.max_symbol_id = i

    def get_all_symbol_data(self):

        if not self.server.hvals("u1"):
            self.load_symbols_from_file(BASE_PATH + "symbols.txt")

        if self.max_symbol_id is None:
            self.max_symbol_id = len(open(BASE_PATH + "symbols.txt").readlines())

        results = []
        for i in xrange(self.max_symbol_id):
            uses, symbol = self.server.hvals("u%s" % i)
            results.append((i, symbol.decode('utf-8'), uses))

        # Sort by uses, don't forget to convert to int since redis stores everything as strings to be more web scale.
        # "Yeah, you just turn on redis and it scales right up!"

        return list(sorted(results, key=lambda t: int(t[1]), reverse=True))

    def get_all_face_data(self):

        # Check that the faces have been loaded.
        # If not, load them from file.
        if not self.server.hvals(1):
            self.load_faces_from_file(BASE_PATH + "faces.txt")

        if self.max_face_id is None:
            self.max_face_id = len(open(BASE_PATH + "faces.txt").readlines())

        results = []
        for i in xrange(self.max_face_id):
            uses, face = self.server.hvals(i)
            results.append((i, face.decode('utf-8'), uses))

        # Sort by uses, don't forget to convert to int since redis stores everything as strings to be more web scale.
        # "Yeah, you just turn on redis and it scales right up!"
        return list(sorted(results, key=lambda t: int(t[-1]), reverse=True))


