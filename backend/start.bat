if not defined PORT set PORT=3001

python manage.py makemigrations
python manage.py migrate
python manage.py runserver %PORT%