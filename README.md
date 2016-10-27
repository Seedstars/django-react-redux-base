# Django React/Redux Base Project

This repository includes a boilerplate project used for all Seedstars Labs applications. It uses Django as backend and React as frontend. 

We build on the shoulders of giants with the following technologies:

**Frontend**

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Clean Webpack Plugin](https://github.com/johnagan/clean-webpack-plugin)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/rackt/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [Redux Thunk](https://github.com/gaearon/redux-thunk) Thunk middleware for Redux - used in async actions
* [React Router Redux](https://github.com/rackt/react-router-redux) Ruthlessly simple bindings to keep react-router and redux in sync
* [fetch](https://github.com/github/fetch) A window.fetch JavaScript polyfill
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
* If the coommand line starts with #, the command should run with root privileges

## Retrieve code 

* `$ git clone https://github.com/Seedstars/django-react-redux-jwt-base.git`
* `$ cd django-react-redux-jwt-base`
* `$ git submodule init`
* `$ git submodule update`
* `$ ./scripts/get_static_validation.sh`

Remember that when you copy this repository for a new project you need to add the scripts external module using:

* `$ git submodule add https://github.com/Seedstars/culture-scripts scripts`

## Installation

### django-rest-knox dependencies

* `# apt-get install -y build-essential libssl-dev libffi-dev libpq-dev python3-dev python-dev`

### NodeJS

* `# wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -`
* `# apt-get install --yes nodejs`

Make sure npm version is 3.x
* `$ npm -v`
* `$ npm install -g npm@next` # only if version is lower than 3.x

### Main Project

* `$ npm install`
* `$ npm run dev`  # will run webpack with watch and compile code as it changes

* `$ virtualenv -p /usr/bin/python3 virtualenv`
* `$ source virtualenv/bin/activate`
* `$ pip install -r py-requirements/dev.txt`

* `$ cd src`
* `$ python manage.py migrate`
* `$ python manage.py loaddata fixtures.json`
* `$ python manage.py runserver`

## Running

Run webpack in development mode

* `$ npm run dev` 

Run Django development http server 

* `$ cd src`
* `$ python manage.py runserver`

## Testing

Frontend (javascript tests)

* `$ ./scripts/test_local_frontend.sh`

Backend (django/python tests)

* `$ ./scripts/test_local_backend.sh`


### Static analysis

To make sure the code respects all coding guidelines you should run the statics analysis script before pushing any code.


Frontend (javascript static analysis)

* `$ ./scripts/static_validate_frontend.sh`

Backend (django/python static analysis)

* `$ ./scripts/static_validate_backend.sh`

### Screenshots

Here are some screenshots of the boilerplate project.

![Screenshot01][1]  

[1]: ./screenshots/screenshot_01.png

![Screenshot02][2]  

[2]: ./screenshots/screenshot_02.png
