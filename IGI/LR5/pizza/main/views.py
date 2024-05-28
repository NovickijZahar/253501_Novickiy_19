from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from . forms import RegisterUserForm
from database.models import *
import calendar
import datetime
from django.utils.timezone import get_current_timezone
from django.views.generic import DetailView
import requests
import logging
import translators as ts


def index(request):
    ns = News.objects.order_by('-publication_date')
    cal = calendar.TextCalendar()
    current_date = datetime.datetime.now()
    if 1 < current_date.month < 12:
        month_calendar1 = cal.formatmonth(current_date.year, current_date.month - 1)
        month_calendar2 = cal.formatmonth(current_date.year, current_date.month)
        month_calendar3 = cal.formatmonth(current_date.year, current_date.month + 1)
    elif current_date.month == 1:
        month_calendar1 = cal.formatmonth(current_date.year - 1, 12)
        month_calendar2 = cal.formatmonth(current_date.year, current_date.month)
        month_calendar3 = cal.formatmonth(current_date.year, current_date.month + 1)
    else:
        month_calendar1 = cal.formatmonth(current_date.year, current_date.month - 1)
        month_calendar2 = cal.formatmonth(current_date.year, current_date.month)
        month_calendar3 = cal.formatmonth(current_date.year + 1, 1)
    data = {
        'months': [month_calendar1, month_calendar2, month_calendar3],
        'current_date': datetime.datetime.now(),
        'timezone': get_current_timezone(),
        'ns': ns
    }

    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited main page')

    return render(request, 'main/index.html', data)


def coupons(request):
    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited coupons page')
    cps = Coupons.objects.all()
    return render(request, 'main/coupons.html', {'cps': cps})


def register(request):
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            return redirect('home')
    form = RegisterUserForm()

    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited register page')

    return render(request, 'registration/register.html', {'form': form})


def contacts(request):
    cons = Contacts.objects.all()

    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited contacts page')

    return render(request, 'main/contacts.html', {'cons': cons})


def news(request):
    ns = News.objects.order_by('-publication_date')

    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited news page')

    return render(request, 'main/news.html', {'ns': ns})


class NewsDetailView(DetailView):
    model = News
    template_name = 'main/news_detail.html'
    context_object_name = 'new'


def vacancies(request):
    vacs = Vacancies.objects.all()
    try:
        service = Contacts.objects.get(work='Руководитель кадровой службы')
    except:
        service = None

    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited vacancies page')

    return render(request, 'main/vacancies.html', {'vacs': vacs, 'ser': service})


def reviews(request):
    revs = Reviews.objects.order_by('-date')
    if revs:
        avg = round(sum(map(lambda x: x.rating, revs)) / len(revs), 1)
    else:
        avg = 0
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'leave_review':
            if not request.user.is_authenticated:
                return redirect('/accounts/login')
            try:
                rev = Reviews.objects.create(user=request.user,
                                        rating=request.POST.get('rating'),
                                        content=request.POST.get('content'),
                                        date=timezone.now())
                
                logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
                logging.info('Leaved a review')

            except:
                rev = Reviews.objects.get(user=request.user)
                rev.rating = request.POST.get('rating')
                rev.content = request.POST.get('content')
                rev.date = timezone.now()

                logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
                logging.info('Changed a review')

            finally:
                rev.save()
                return redirect('/reviews')

    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited review page')

    return render(request, 'main/reviews.html', {'revs': revs, 'avg': avg})


def privacy(request):
    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
    logging.info('Visited privacy page')

    return render(request, 'main/privacy.html')


def api1(request):
    try: 
        response = requests.get('https://official-joke-api.appspot.com/random_ten')
        data = response.json()
        data2 = []
        for d in data:
            data2.append({'setup': ts.translate_text(d['setup'], to_language='ru'), 
                          'punchline': ts.translate_text(d['punchline'], to_language='ru')})

        logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                        format="%(asctime)s %(levelname)s %(message)s")
        logging.info('Visited api1 page')

        return render(request, 'main/api1.html', {'data': data2})
    except:
        logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
        logging.warning('Error in api1 page')

        return HttpResponse('Ошибка при получении данных из API')

  
def api2(request):
    try:
        response1 = requests.get('https://api.ipify.org/?format=json')
        ip = response1.json()
        try:
            response2 = requests.get(f'https://ipinfo.io/{ip["ip"]}/geo')
            info = response2.json()

            logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                        format="%(asctime)s %(levelname)s %(message)s")
            logging.info('Visited api2 page')

            return render(request, 'main/api2.html', {'ip': ip, 'info': info})
        except:
            logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
            logging.warning('Error in api2 page')

            return HttpResponse('Ошибка при получении данных из API')
    except:
        logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w",
                    format="%(asctime)s %(levelname)s %(message)s")
        logging.warning('Error in api2 page')

        return HttpResponse('Ошибка при получении данных из API')