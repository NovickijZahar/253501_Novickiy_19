# Создание виртуальной среды
python -m venv .venv
# Активация виртуальной среды
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.venv\Scripts\Activate.ps1
# Деактицвация виртуальной среды
deactivate
# Создение проекта
django-admin startproject name
# Запуск проекта
python manage.py runserver
# Создание приложения
python manage.py startapp name
# Создать миграции
python manage.py makemigrations
# Выполнить миграции
python manage.py migrate
# Создать администратора 
python manage.py createsuperuser

# Страницы, создающиеся при подключении django.contrib.auth.urls, и их названия
accounts/login/ [name='login']
accounts/logout/ [name='logout']
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']



# Пароль
kljqw123


<QueryDict: {'csrfmiddlewaretoken': ['OkW5ViwvGAfsW5lMuldopx96t6CufLvjB3VZvN6h3vbefehe0ZoRChCcZA6FIOOA'], 
'city': ['gs'], 'street': ['etr'], 'house': ['2'], 'entrance': ['3'], 'floor': ['4'], 'apartment': ['1'], 'action': ['make_order']}>