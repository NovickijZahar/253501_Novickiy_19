from django.shortcuts import render, redirect, HttpResponse
from . models import Pizzas, Ingredients, Carts
from . forms import PizzasForm, IngredientsForm
from django.views.generic import DetailView, UpdateView, DeleteView, CreateView, View
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.mixins import UserPassesTestMixin

def admin_check(user):
    return user.is_superuser


class CreateOrderView(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return redirect('/accounts/login')
        pizza_id = request.POST.get('pizza_id')
        user = request.user
        pizza = Pizzas.objects.get(id=pizza_id)
        if Carts.objects.filter(user=user).exists():
            cart = Carts.objects.get(user=user)
            if str(pizza.id) in cart.pizzas:
                cart.pizzas[str(pizza.id)] += 1
            else:
                cart.pizzas[str(pizza.id)] = 1
        else:
            cart = Carts.objects.create(user=user)
            cart.pizzas = {str(pizza.id): 1}
        cart.save()
        return redirect('/database/')
        return HttpResponse("Пицца добавлена в корзину")


class PizzasDetailView(DetailView):
    model = Pizzas
    template_name = 'database/pizza_detail.html'
    context_object_name = 'pizza'

class PizzasEditView(UserPassesTestMixin, UpdateView):
    def test_func(self) -> bool | None:
        return admin_check(self.request.user)
    
    model = Pizzas
    template_name = 'database/create_pizza.html'
    form_class = PizzasForm

class PizzasDeleteView(UserPassesTestMixin, DeleteView):
    def test_func(self) -> bool | None:
        return admin_check(self.request.user)

    model = Pizzas
    success_url = '/database/'
    template_name = 'database/delete_pizza.html'
    

def index(request):
    pizzas = Pizzas.objects.all()
    return render(request, 'database/index.html', {'pizzas': pizzas})

@user_passes_test(admin_check)
def create_ingredient(request):
    if request.method == 'POST':
        form = IngredientsForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    form = IngredientsForm()
    data = {
        'form': form,
    }
    return render(request, 'database/create_ingredient.html', data)

@user_passes_test(admin_check)
def create_pizza(request):
    if request.method == 'POST':
        form = PizzasForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    form = PizzasForm()
    data = {
        'form': form
    }
    return render(request, 'database/create_pizza.html', data)
