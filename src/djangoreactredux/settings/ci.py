from djangoreactredux.settings.staging import *  # NOQA (ignore all errors on this line)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'djangoreactredux_ci',
        'USER': 'djangoreactredux',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
}
