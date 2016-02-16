rm db.sqlite
./manage.py migrate
./manage.py loaddata fixtures.json
