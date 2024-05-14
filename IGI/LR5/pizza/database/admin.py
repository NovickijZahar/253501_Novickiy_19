from django.contrib import admin
from . models import Pizzas, Ingredients, Orders

admin.site.register(Pizzas)
admin.site.register(Ingredients)
admin.site.register(Orders)