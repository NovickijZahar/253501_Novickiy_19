from django.shortcuts import render, redirect
from database.models import Carts, Pizzas, Address, Orders
from django.utils import timezone

def cart_view(request):
    if not request.user.is_authenticated:
        return redirect('/accounts/login')
    user = request.user
    if Carts.objects.filter(user=user).exists():
        cart = Carts.objects.get(user=user)
    else:
        cart = Carts.objects.create(user=user)
    for i in cart.pizzas.copy():
        if not Pizzas.objects.filter(id=i).exists():
            del cart.pizzas[str(i)]
    cart.save()
    cart_list = {Pizzas.objects.get(id=i): cart.pizzas[str(i)] for i in cart.pizzas}
    s = sum(Pizzas.objects.get(id=k).price * v for k, v in cart.pizzas.items())
    data = {
        'cart': cart_list,
        'sum': s,
        'json_pizzas': cart.pizzas
    }

    if request.method == 'POST':
        pizza_id = request.POST.get('pizza_id')
        action = request.POST.get('action')

        if action == 'increase':
            cart.pizzas[str(pizza_id)] += 1
        elif action == 'decrease':
            if cart.pizzas[str(pizza_id)] == 1:
                del cart.pizzas[str(pizza_id)]
            else:
                cart.pizzas[str(pizza_id)] -= 1
        elif action == 'make_order':
            address = Address.objects.create(city=request.POST.get('city'),
                                   street=request.POST.get('street'),
                                   house=request.POST.get('house'),
                                   entrance=request.POST.get('entrance'),
                                   floor=request.POST.get('floor'),
                                   apartment=request.POST.get('apartment'))
            order = Orders.objects.create(pizzas=Carts.objects.filter(user=request.user)[0].pizzas,
                                        user=request.user,
                                        address=address,
                                        order_time=timezone.now(),
                                        lead_time=timezone.now(),
                                        is_complete=False)
            print(request.POST.get('pizzas'))
            address.save()
            order.save()
            cart.pizzas = {}

        cart.save()
        return redirect('/cart')

    return render(request, 'carts/cart_list.html', data)