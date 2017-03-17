[![Build Status](https://travis-ci.org/Seedstars/django-react-redux-base.svg?branch=master)](https://travis-ci.org/Seedstars/django-react-redux-base)

# Django React/Redux Base Project

This repository includes a boilerplate project used for all Seedstars Labs applications. It uses Django as backend and React as frontend.

We build on the shoulders of giants with the following technologies:

**Frontend**

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/ReactTraining/react-router) Declarative routing for React
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Clean Webpack Plugin](https://github.com/johnagan/clean-webpack-plugin)
* [Redux](https://github.com/reactjs/redux) Predictable state container for JavaScript apps 
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) DevTools for Redux with hot reloading, action replay, and customizable UI. Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [Redux Thunk](https://github.com/gaearon/redux-thunk) Thunk middleware for Redux - used in async actions
* [React Router Redux](https://github.com/reactjs/react-router-redux) Ruthlessly simple bindings to keep react-router and redux in sync
* [fetch](https://github.com/github/fetch) A window.fetch JavaScript polyfill
* [tcomb form](https://github.com/gcanti/tcomb-form) Forms library for react
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack) to customize FontAwesome
* [bootstrap-loader](https://github.com/shakacode/bootstrap-loader) to customize Bootstrap
* [ESLint](http://eslint.org), [Airbnb Javascript/React Styleguide](https://github.com/airbnb/javascript), [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css) to maintain a consistent code style and [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) to make sure all imports are correct
* [mocha](https://mochajs.org/) to allow writing unit tests for the project
* [Enzyme](http://airbnb.io/enzyme/) JavaScript Testing utilities for React
* [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) a mock store for your testing your redux async action creators and middleware
* [expect](https://github.com/mjackson/expect) Write better assertions
* [Nock](https://github.com/pgte/nock) HTTP mocking and expectations library
* [istanbul](https://github.com/gotwarlost/istanbul) to generate coverage when running mocha

**Backend**

* [Django](https://www.djangoproject.com/)
* [Django REST framework](http://www.django-rest-framework.org/) Django REST framework is a powerful and flexible toolkit for building Web APIs
* [Django REST Knox](https://github.com/James1345/django-rest-knox) Token based authentication for API endpoints
* [WhiteNoise](http://whitenoise.evans.io/en/latest/django.html) to serve files efficiently from Django
* [Prospector](http://prospector.landscape.io/en/master/) a complete Python static analysis tool
* [Bandit](https://github.com/openstack/bandit) a security linter from OpenStack Security
* [pytest](http://pytest.org/latest/) a mature full-featured Python testing tool
* [Mock](http://www.voidspace.org.uk/python/mock/) mocking and testing Library
* [Responses](https://github.com/getsentry/responses) a utility for mocking out the Python Requests library


## Readme Notes

* If the command line starts with $, the command should run with user privileges
* If the command line starts with #, the command should run with root privileges


## Retrieve code

* `$ git clone https://github.com/seedstars/django-react-redux-base.git`
* `$ cd django-react-redux-base`
* `$ git submodule init`
* `$ git submodule update`
* `$ ./scripts/get_static_validation.sh`


Remember that when you copy this repository for a new project you need to add the scripts external module using:

* `$ git submodule add https://github.com/Seedstars/culture-scripts scripts`

NOTE: This is only needed in case you copy this code to a new project. If you only clone or fork the repository, the submodule is already configured


## Installation

### Main Project

We use Docker as a development environment. For production, we leave you to set it up the way you feel better,
although it is trivial to extrapolate a production environment from the current docker-compose.yml.
* Install [Docker](https://www.docker.com/products/overview) and [Docker Compose](https://docs.docker.com/compose/install/).
* `$ docker-compose build`


## Running

Run Docker development server

* `$ docker-compose up`

## Accessing Website

The project has CORS enabled and the URL is hardcoded in javscript to http://localhost:8000 
For login to work you will to use this URL in your browser.

## Stopping

Stop Docker development server

* `$ docker-compose stop`

## Resetting

Stop Docker development server and remove containers, networks, volumes, and images created by up.

* `$ docker-compose down`

### Accessing a container

You can access shell in a container

* `$ docker exec -i -t <CONTAINER_NAME_OR_ID> /bin/bash`

E.g.

* `$ docker ps  # get the name from the list of running containers`
* `$ docker exec -i -t djangoreactreduxbase_frontend_1 /bin/bash`

### Accessing the database

The database can be accessed @localhost:5433

* `$ psql -h localhost -p 5433 -U djangoreactredux djangoreactredux_dev`


## Testing

To make sure the code respects all coding guidelines you should run the statics analysis and test scripts before pushing any code.

Frontend (javascript tests)

* `$ ./scripts/test_local_frontend.sh`

Backend (django/python tests)

* `$ docker exec -i -t djangoreactreduxbase_backend_1 /bin/bash scripts/test_local_backend.sh`

Please take into account that test_local_backend.sh runs py.test with `--nomigrations --reuse-db` flags to allow it be performant. Any time you add a migration please remove those flags next time you run the script.

### Static analysis


Frontend (javascript static analysis)

* `$ ./scripts/static_validate_frontend.sh`

Backend (django/python static analysis)

* `$ docker exec -i -t djangoreactreduxbase_backend_1 /bin/bash scripts/static_validate_backend.sh`


## Screenshots

Here are some screenshots of the boilerplate project.

![Screenshot01][1]  

[1]: ./screenshots/screenshot_01.png

![Screenshot02][2]  

[2]: ./screenshots/screenshot_02.png


## Gotchas

* This project uses NodeJS v6.x (stable) and the corresponding version of npm
* The npm development server takes longer than the django server to start, as it has to install the npm dependencies (if not already installed) and fire webpack. This means that after the django server starts, you should wait that webpack finishes compiling the .js files.
* If your IDE has builtin language support for python with auto-imports (e.g. PyCharm), you can create a virtualenv and install the py-requirements.
* If you are annoyed by docker creating files belonging to root (which is Docker's intended behaviour), you can run `# chown -hR $(whoami) .` before firing up the server.
* While testing the backend, if you have a local virtualenv, you can run the static validation without running a docker container.
* While testing the backend, if you have a local virtualenv and a local database configured with the dev settings, you can run the tests without running a docker container.


## Contributing

We welcome contributions from the community, given that they respect these basic guidelines:

* All Tests & Static Analysis passing;
* 100% code coverage;

Prior to any pull-request, we advise to [open an issue](https://github.com/Seedstars/django-react-redux-base/issues). This is because, although we are happy to merge your code, we must make sure the changes don't impact our way of doing things, thus resulting on a declined PR, and your time wasted.

If you want to tackle any open issue, well..... Just go for it! :)
