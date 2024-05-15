from django.contrib import admin
from . models import *

admin.site.register(Pizzas)
admin.site.register(Ingredients)
admin.site.register(Carts)
admin.site.register(Address)
admin.site.register(Order)