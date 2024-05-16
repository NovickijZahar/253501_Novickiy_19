from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from . forms import RegisterUserForm
import calendar
import datetime
from django.utils.timezone import get_current_timezone

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
    
