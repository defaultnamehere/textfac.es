"""textfac.es one-time setup script"""


import os

TEXTFACES_PROD_BASE_PATH = "/var/sites/textfac.es/"
TEXTFACES_DEV_BASE_PATH = "/home/alex/dev/textfac.es/repo/"


def setup():

    # Set prod mode 
    prod = input("Set environment variables to production settings? (y/n) ").lower()
    if prod == "y":
        os.environ["TEXTFACES_BASE_PATH"] = TEXTFACES_PROD_BASE_PATH
        print("Set base path to '%s'" % TEXTFACES_PROD_BASE_PATH)
    elif prod == "n":
        os.environ["TEXTFACES_BASE_PATH"] = TEXTFACES_DEV_BASE_PATH
        print("Set base path to '%s'" % TEXTFACES_DEV_BASE_PATH)
    else:
        print("Couldn't understand input %s, aborting..." % prod)

    # Ask for redis password
    redis_password = input("""Enter the password for your redis instance.
Leave this blank to use an existing "redis_password.txt" in the base textfac.es directory: """)
    if redis_password:
        with open(os.path.join(os.environ["TEXTFACES_BASE_PATH"], "redis_password.txt"), 'w') as f:
            f.write(redis_password)
        print("Wrote password to 'redis_password.txt'")
    else:
        print("Using existing 'redis_password.txt'")


    print("All done, have a nice day =]")
if __name__ == "__main__":
    setup()
