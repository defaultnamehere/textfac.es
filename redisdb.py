import redis

class textfaceDB():

    def __init__(self):
        redis_password = "de23ce07d0e1b640837f78e3e0a7ab93afdbc0e6"
        self.server = redis.Redis('localhost', password=redis_password)
        self.max_face_id = None

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

    def get_all_face_data(self):

        if self.max_face_id is None:
            self.max_face_id = len(open("faces.txt").readlines())
        results = []
        for i in xrange(self.max_face_id):
            uses, face = self.server.hvals(i)
            results.append((i, face.decode('utf-8'), uses))

        return list(sorted(results, key=lambda t: t[-1], reverse=True))


