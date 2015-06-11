import logging, sys
import os
sys.path.append('/var/sites/textfac.es')
logging.basicConfig(stream=sys.stderr)
from textface import app as application
if os.environ["TEXTFACES_ENV"] == "DEV":
    application.run(debug=True)
