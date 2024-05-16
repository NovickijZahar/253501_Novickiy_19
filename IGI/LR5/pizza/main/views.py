from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from . forms import RegisterUserForm
from database.models import *
import calendar
import datetime
from django.utils.timezone import get_current_timezone
from django.views.generic import DetailView

def index(request):
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
        'timezone': get_current_timezone()
    }
    return render(request, 'main/index.html', data)


def about(request):
    return render(request, 'main/about.html')


def register(request):
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            return redirect('home')
    form = RegisterUserForm()
    return render(request, 'registration/register.html', {'form': form})


def contacts(request):
    cons = Contacts.objects.all()
    return render(request, 'main/contacts.html', {'cons': cons})


def news(request):
    ns = News.objects.order_by('-publication_date')
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
    return render(request, 'main/vacancies.html', {'vacs': vacs, 'ser': service})


def reviews(request):
    revs = Reviews.objects.order_by('-date')
    avg = round(sum(map(lambda x: x.rating, revs)) / len(revs), 1)
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'leave_review':
            try:
                rev = Reviews.objects.create(user=request.user,
                                        rating=request.POST.get('rating'),
                                        content=request.POST.get('content'),
                                        date=timezone.now())
            except:
                rev = Reviews.objects.get(user=request.user)
                rev.rating = request.POST.get('rating')
                rev.content = request.POST.get('content')
                rev.date = timezone.now()
            finally:
                rev.save()
                return redirect('/reviews')

    return render(request, 'main/reviews.html', {'revs': revs, 'avg': avg})


def privacy(request):
    return render(request, 'main/privacy.html')