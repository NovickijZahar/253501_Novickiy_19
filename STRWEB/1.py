import calendar
import datetime

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

print(month_calendar1, month_calendar2, month_calendar3)