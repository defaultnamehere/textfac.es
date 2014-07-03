import sys
sys.path.append('/var/sites/textfac.es')
from textface import app as application
application.run(debug=True)
