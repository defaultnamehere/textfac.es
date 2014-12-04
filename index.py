import logging, sys
sys.path.append('/var/sites/textfac.es')
logging.basicConfig(stream=sys.stderr)
from textface import app as application
