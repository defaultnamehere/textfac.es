import sqlite3

if __name__ == '__main__':
    open("textface.db", "w+").close()
    print "Creating database..."
    DB = sqlite3.connect("textface.db")
    DB.execute("""
        CREATE TABLE faces(
            id INTEGER PRIMARY KEY,
            face TEXT,
            uses INT
        )""")
    DB.commit()
    print "Wiping initialdata.sql...."
    open("initialdata.sql", "w+").close()
    print "Generating initialdata.sql...."
    try:
        commandfile = open("initialdata.sql","w+")
        textfile = open("faces.txt", "rU")
        for line in textfile:
            commandfile.write('INSERT INTO faces (face, uses) VALUES ("%s", 0);' % line.strip() + '\n')
        commandfile.close()
        commandfile = open("initialdata.sql", 'rU')
        print "Running initialdata.sql...."
        DB.executescript(commandfile.read())
        DB.commit()
    except IOError:
        print "initialdata.sql not found."
    DB.close()
    print "Setup completed"
