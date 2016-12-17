#!/usr/bin/env bash

until cd src
do
    echo "Waiting for volume..."
done

rm -f /celerybeat/*.pid
exec "$@"

C_FORCE_ROOT=true celery beat -A djangoreactredux -l debug --pidfile=/celerybeat/celerybeat.pid --schedule=/celerybeat/celerybeat-schedule
