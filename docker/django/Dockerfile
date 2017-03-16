FROM python:3.4.3
MAINTAINER Filipe Garcia <filipe.garcia@seedstarslabs.com>

ENV PYTHONUNBUFFERED 1

COPY ./docker/django/backend-entrypoint.sh /
COPY ./docker/django/worker-entrypoint.sh /
COPY ./docker/django/scheduler-entrypoint.sh /
COPY ./py-requirements /django/py-requirements

WORKDIR /django

RUN pip install pip==9.0.1
RUN pip install -r py-requirements/dev.txt
