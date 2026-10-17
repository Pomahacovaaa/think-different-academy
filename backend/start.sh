set -e

PORT="${PORT:-3001}"

python -c "
import os, socket, time
host = os.environ.get('DJANGO_DB_HOST', 'localhost')
port = int(os.environ.get('DJANGO_DB_PORT', '3306'))
for _ in range(30):
    try:
        socket.create_connection((host, port), timeout=2).close()
        break
    except OSError:
        time.sleep(1)
else:
    raise SystemExit(f'Database not reachable at {host}:{port}')
"

python manage.py makemigrations
python manage.py migrate
python manage.py runserver "0.0.0.0:${PORT}"