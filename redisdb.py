
import sys

import redis



TEXTFACES_PATH = "/var/sites/textfac.es/"
sys.path.append(TEXTFACES_PATH)

FACES_FILENAME = "faces.txt"
SYMBOLS_FILENAME = "symbols.txt" 
class TextfaceDB():

    def __init__(self):
        #redis_password = self._load_redis_password()
        redis_password = "de23ce07d0e1b640837f78e3e0a7ab93afdbc0e6"
        self.server = redis.Redis('localhost', password=redis_password)
        self.max_face_id = None
        self.max_symbol_id = None

    def _load_redis_password(self):
        with open("redis_password.txt") as f:
            return f.read().strip()

    def load_faces_from_file(self, filename):
        with open(filename) as f:
            # Remove duplicates
            faces = map(str.strip, set(f.readlines()))
            for i, line in enumerate(faces):
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
            symbols = map(str.strip, set(f.readlines()))
            for i, line in enumerate(symbols):
                self.server.hmset("u%s" % i, {
                    "uses": 0,
                    "symbol" : line.strip()
                })
                self.max_symbol_id = i

    def get_all_symbol_data(self):

        # Fall back to the text file if the data isn't in the datastore for some reason.
        if not self.server.hvals("u1"):
            self.load_symbols_from_file(SYMBOLS_FILENAME)

        if self.max_symbol_id is None:
            self.max_symbol_id = len(set(open(SYMBOLS_FILENAME).readlines()))

        results = []
        for i in range(self.max_symbol_id):
            symid = "u%s" % i
            symbol= self.server.hget(symid,"symbol")
            uses = self.server.hget(symid, "uses")
            results.append((symid, uses, symbol ))

        # Sort by uses, don't forget to convert to int since redis stores everything as strings to be more web scale.
        # "Yeah, you just turn on redis and it scales right up!"
        return list(sorted(results, key=lambda t: int(t[1]), reverse=True))

    def get_all_face_data(self):

        # Check that the faces have been loaded.
        # If not, load them from file.
        if not self.server.hvals(1):
            self.load_faces_from_file(FACES_FILENAME)

        if self.max_face_id is None:
            self.max_face_id = len(set(open(FACES_FILENAME).readlines()))

        results = []
        for i in range(self.max_face_id):
            face = self.server.hget(i,"face")
            uses = self.server.hget(i, "uses")
            results.append((i, uses, face.decode('utf-8')))

        # Sort by uses, don't forget to convert to int since redis stores everything as strings to be more web scale. It would be nice if redis let you sort HGET results by a particular field, but I guess that might cause some extremely-efficient mechanism it already has to fail.
        # "Yeah, you just turn on redis and it scales right up!"
        return list(sorted(results, key=lambda t: int(t[1]), reverse=True))

    def add_faces_from_file(self, filename):
        """Update the database with new faces from a file. These should probably be merged into faces.txt for persistence if we switch DBs"
        >20k hits/day
        >text file 
        >persistence
        """

        all_faces = set(map(lambda x: x[1], self.get_all_face_data()))
        with open(filename, 'rU') as f:
            for i, line in enumerate(f):
                face = line.strip()
                # Don't double-add faces.
                if face in all_faces:
                    continue

                self.add_new_face(face)

    def add_new_face(self, face):
            # Make a new id for this new face, and keep track of the max.
            self.max_face_id += 1

            # Insert into redis at this new index.
            self.server.hmset(self.max_face_id, {
                "uses": 0,
                "face" :face
            })

            # Also add it to the .txt backup.
            with open(FACES_FILENAME, 'a') as faces_file:
                faces_file.write(face)
                faces_file.write("\n")



if __name__ == '__main__':
    # If this file is run directly, load the faces from file.
    db = TextfaceDB()
    db.load_faces_from_file(FACES_FILENAME)
    db.load_symbols_from_file(SYMBOLS_FILENAME)

