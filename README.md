Blogging app
============

Basic blog app made using django python for backend and react for frontend

Setting up python environment
------------------

First create a python virtual envornment on the root directory of the project, then run this command after activation:

    pip install django djangorestframework django-filter djoser djangorestframework_simplejwt python-dotenv

### End result

    asgiref                       3.4.1    
    certifi                       2021.5.30
    cffi                          1.14.6
    charset-normalizer            2.0.6
    coreapi                       2.3.3
    coreschema                    0.0.4
    cryptography                  3.4.8
    defusedxml                    0.7.1
    Django                        3.2.7
    django-filter                 21.1
    django-rest-framework         0.1.0
    django-templated-mail         1.1.1
    djangorestframework           3.12.4
    djangorestframework-simplejwt 4.8.0
    djoser                        2.1.0
    idna                          3.2
    itypes                        1.2.0
    Jinja2                        3.0.1
    MarkupSafe                    2.0.1
    oauthlib                      3.1.1
    pip                           20.2.3
    pycparser                     2.20
    PyJWT                         2.1.0
    python-dotenv                 0.19.0
    python3-openid                3.2.0
    pytz                          2021.1
    requests                      2.26.0
    requests-oauthlib             1.3.0
    setuptools                    49.2.1
    six                           1.16.0
    social-auth-app-django        4.0.0
    social-auth-core              4.1.0
    sqlparse                      0.4.2
    uritemplate                   3.0.1
    urllib3                       1.26.7

Setting up React/Redux environment
----------------------------------

In the ``./frontend`` folder run the command

    npx create-react-app

Then install the required packages

    npm install react-router-dom react-redux redux redux-thunk redux-devtools-extension axios

In order to build the frontend and move it to the django server use

    npm run build

Running the local server
------------------------

### ``.env`` file for backend

In order to run the project, a ``.env`` file at ``./blogger/blogger`` is needed. This will hold crutial information like the ``secret key``, ``email host user`` and ``email host password``. The file should contain variables as follows:

    SECRET_KEY = "You're super duper secret key"
    EMAIL_HOST_USER = "You're email address for sending out activation/confimation mails"
    EMAIL_HOST_PASSWORD = "You're email's application password"

### ``.env`` file for frontend

In adition to the backend ``.env`` file we need to add one more at ``./frontend``. This file will contain the ``REACT_APP_URL``, which should hold the url address for you're backend server. If you run it locally with default settings, this should be as follows

    REACT_APP_URL = http://localhost:8000/

### Starting the server

Activate environment:

    source ./env/Scripts/activate

Change directory to backend app:

    cd ./blogger

Make migrations (for the first run only)

    python ./manage.py migrate

Run local server

    python ./manage.py runserver

Build the react app to make sure the latest version is in the backend. Execute this command at the ``./frontend`` directory.

    npm run build

Go to http://localhost:8000/ on browser
