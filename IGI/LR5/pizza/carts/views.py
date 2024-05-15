from django.shortcuts import render, redirect
from database.models import Carts, Pizzas

def void(request):
    if not request.user.is_authenticated:
        return redirect('/accounts/login')
    user = request.user
    if Carts.objects.filter(user=user).exists():
        cart = Carts.objects.get(user=user)
    else:
        cart = Carts.objects.create(user=user)
    cart.save()
    cart_list = {Pizzas.objects.get(id=i): cart.pizzas[str(i)] for i in cart.pizzas}
    data = {
        'cart': cart_list
    }
    return render(request, 'carts/cart_list.html', data)