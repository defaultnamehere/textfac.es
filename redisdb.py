
import sys
import random

import redis


FACES_FILENAME = "faces.txt"
SYMBOLS_FILENAME = "symbols.txt" 

FACE_ID_LIST = "faceids"

SHUFFLE_FACES = False
class TextfaceDB():
    def __init__(self):
        self.server = redis.Redis('localhost')
        self.max_face_id = self.server.llen(FACE_ID_LIST)

    def increment(self, faceid):
        self.server.hincrby(faceid, "uses", 1)

    def get_all_face_data(self):

        results = []

        for faceid in self.server.lrange(FACE_ID_LIST, 0, -1):
            face = self.server.hget(faceid, "face")
            uses = self.server.hget(faceid, "uses")
            results.append((faceid, uses, face.decode('utf-8')))

        if SHUFFLE_FACES:
            random.shuffle(results)
            return results
        else:

            # Sort by uses, don't forget to convert to int since redis stores everything as strings to be more web scale. It would be nice if redis let you sort HGET results by a particular field, but I guess that might cause some extremely-efficient mechanism it already has to fail.
            # "Yeah, you just turn on redis and it scales right up!"
            return list(sorted(results, key=lambda t: int(t[1]), reverse=True))

    def add_faces_from_file(self, filename):
        """Update the database with new faces from a file."""

        with open(filename, 'rU') as f:
            for i, line in enumerate(f):
                face = line.strip()

                self.add_new_face(face)

    def add_new_face(self, face):
        """Add a new face, but not duplicates.
        Returns True iff successful"""

        all_faces = set(map(lambda x: x[1], self.get_all_face_data()))

        if face in all_faces:
            print "Not adding duplicate face: %s" % face
            return False

        self.max_face_id += 1
        # Insert into redis at this new index.
        self.server.hmset(self.max_face_id, {
            "uses": 0,
            "face": face
        })

        # Add it to the list of face ids.
        self.server.rpush(FACE_ID_LIST, self.max_face_id)

        # Also add it to the .txt backup.
        # >.txt backup
        with open(FACES_FILENAME, 'a') as faces_file:
            faces_file.write(face)
            faces_file.write("\n")
        return True

if __name__ == '__main__':
    # If this file is run directly, load the faces from file.
    db = TextfaceDB()

    # Or add a new face by CLI arg.
    if len(sys.argv) > 1:
        db.add_new_face(sys.argv[1])
    else:
        db.load_faces_from_file(FACES_FILENAME)
        db.load_symbols_from_file(SYMBOLS_FILENAME)

