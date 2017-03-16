#!/usr/bin/env bash

until cd src
do
    echo "Waiting for volume..."
done

C_FORCE_ROOT=true celery worker -A djangoreactredux -l debug
