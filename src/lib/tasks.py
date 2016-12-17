from __future__ import absolute_import

from djangoreactredux.celery import app


@app.task(name='some_async_task')
def some_async_task(text='Cool stuff!'):
    """Execute code asynchronously."""
    print('Async task ran with message: {}'.format(text))
    return True
