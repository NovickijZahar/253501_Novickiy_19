from django.contrib import admin
from . models import Pizzas, Ingredients, Carts

admin.site.register(Pizzas)
admin.site.register(Ingredients)
admin.site.register(Carts)