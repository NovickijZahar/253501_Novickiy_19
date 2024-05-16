from django.shortcuts import render, redirect
from django.contrib.auth.decorators import user_passes_test
from database.models import Orders, Pizzas
from django.utils import timezone

def authenticated_check(user):
    return user.is_authenticated

def staff_check(user):
    return user.is_staff


@user_passes_test(authenticated_check)
def my_orders(request):
    completed_orders = Orders.objects.filter(is_complete=True, user=request.user)
    in_progress_orders = Orders.objects.filter(is_complete=False, user=request.user)
    completed_arr_pizzas = []
    in_progress_arr_pizzas = []
    for co in completed_orders:
        completed_arr_pizzas.append([{Pizzas.objects.get(id=i): co.pizzas[str(i)] for i in co.pizzas}, co])
    for co in in_progress_orders:
        in_progress_arr_pizzas.append([{Pizzas.objects.get(id=i): co.pizzas[str(i)] for i in co.pizzas}, co])
    data = {
        'completed_arr_pizzas': completed_arr_pizzas,
        'in_progress_arr_pizzas': in_progress_arr_pizzas,
    }
    return render(request, 'orders/my_orders.html', data)


@user_passes_test(staff_check)
def active_orders(request):
    in_progress_orders = Orders.objects.filter(is_complete=False)
    completed_orders = Orders.objects.filter(is_complete=True)
    in_progress_arr_pizzas = []
    completed_arr_pizzas = []
    for co in in_progress_orders:
        in_progress_arr_pizzas.append([{Pizzas.objects.get(id=i): co.pizzas[str(i)] for i in co.pizzas}, co])
    for co in completed_orders:
        completed_arr_pizzas.append([{Pizzas.objects.get(id=i): co.pizzas[str(i)] for i in co.pizzas}, co])
    completed_arr_pizzas.sort(key=lambda x: x[1].order_time, reverse=True)
    in_progress_arr_pizzas.sort(key=lambda x: x[1].order_time, reverse=True)
    data = {
        'in_progress_arr_pizzas': in_progress_arr_pizzas,
        'completed_arr_pizzas': completed_arr_pizzas
    }

    if request.method == 'POST':
        order_id = request.POST.get('order_id')
        order = Orders.objects.get(id=order_id)
        order.is_complete = True
        order.lead_time = timezone.now()
        order.courier = request.user
        order.save()
        return redirect('/orders/active_orders')

    return render(request, 'orders/active_orders.html', data)
