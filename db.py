import MySQLdb as sqldb

HOST = 'localhost'
PORT=3306
USER='root'
PASSWORD= '649e357be237dc007b20772f6610ba07c3378c9014876df4d2c5777d7d1f18c3' #STRONG SECURITY
DATABASE='textfacedb'
class textfaceDB():

    def __init__(self):
        self.connection = sqldb.connect(host=HOST,user=USER,passwd=PASSWORD,port=PORT,db=DATABASE, charset='utf8')
        self.DB = self.connection.cursor()

    def get_face_and_desc(self, name):
        self.DB.execute("SELECT face,description FROM faces WHERE name=%s", (name,))
        return self.DB.fetchall()

    def write_increment(self, faceid): 
        self.DB.execute("UPDATE faces SET uses=uses + 1 WHERE id=%s", (faceid,))

    def get_all_uses(self):
        self.DB.execute("SELECT id, uses FROM faces")
        return self.DB.fetchall()

    def get_all_face_data(self):
        self.DB.execute("SELECT id,face,uses FROM faces ORDER BY uses DESC")
        return list(self.DB.fetchall())

