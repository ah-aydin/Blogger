Blogging app
============

Visit https://ahamza-blogger.herokuapp.com/ for working demo.

Basic blog app made using django python for backend and react for frontend

Setting up python environment
------------------

First create a python virtual envornment on the root directory of the project, then run this command after activation:

    pip install django djangorestframework django-filter djoser djangorestframework_simplejwt python-dotenv django-richtextfield django-cors-headers

Setting up React/Redux environment
----------------------------------

In the ``./frontend`` folder run the command

    npx create-react-app

Then install the required packages

    npm install react-router-dom react-redux redux redux-thunk redux-devtools-extension axios slate slate-react

In order to build the frontend and move it to the django server use

    npm run build

Running the local server
------------------------

### ``.env`` file
### ``.env`` file for backend

In order to run the project, a ``.env`` file at ``./blogger/blogger`` is needed. This will hold crutial information like the ``secret key``, ``email host user`` and ``email host password``. The file should contain variables as follows:

In order to run the project, a ``.env`` file at ``./blogger/blogger`` is needed.
```
    SECRET_KEY = "Secret key plz"
    EMAIL_HOST_USER = "You're email address for sending out activation/confimation mails"
    EMAIL_HOST_PASSWORD = "You're email's application password"
```
### ``.env`` file for frontend

In adition to the backend ``.env`` file we need to add one more at ``./frontend``. This file will contain the ``REACT_APP_URL``, which should hold the url address for you're backend server. If you run it locally with default settings, this should be as follows

    REACT_APP_URL = http://localhost:8000/

### Starting the server

Activate environment and run local server

    python ./manage.py runserver

Build the react app to make sure the latest version is in the backend. Execute this command at the ``./frontend`` directory.

    npm run build

Go to http://localhost:8000/ on browser
