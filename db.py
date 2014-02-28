import MySQLdb as sqldb
DIR = "/home/defaultname/webapps/textfaces/htdocs/"
#DIR = ""

HOST = 'localhost'
PORT=3306
USER='alex'
PASSWORD= 'eipi+1=0' #STRONG SECURITY
DATABASE='textfacedb'
class textfaceDB():

    def __init__(self):
	self.connection = sqldb.connect(host=HOST,user=USER,passwd=PASSWORD,port=PORT,db=DATABASE, charset='utf8')
	self.DB = self.connection.cursor()
        #self.cached_uses = dict(self.get_all_uses()) 
        
    def increment(self, faceid):
        #self.DB.execute("UPDATE faces SET uses = uses + 1 WHERE id = ?", faceid)
        try:
            self.cached_uses[int(faceid)] += 1
        except Exception:
            pass
        return "incremented %s" %faceid

    def get_face_and_desc(self, name):
        self.DB.execute("SELECT face,description FROM faces WHERE name=%s", (name,))
	return self.DB.fetchall()

    def write_uses(self):
        for faceid in self.cached_uses:
            #uses = self.cached_uses[faceid]
            self.DB.execute("UPDATE faces SET uses=? WHERE id=?", (uses, faceid))
             

    def write_increment(self, faceid): 
	self.DB.execute("UPDATE faces SET uses=uses + 1 WHERE id=%s", (faceid,))
         
        return "incremented %s" %faceid

    def get_all_uses(self):
        self.DB.execute("SELECT id, uses FROM faces")
	return self.DB.fetchall()

    def get_all_face_data(self):
        self.DB.execute("SELECT id,face,uses FROM faces ORDER BY uses DESC")
	return list(self.DB.fetchall())

        
