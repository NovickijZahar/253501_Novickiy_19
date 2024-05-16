from django.urls import path
from . import views

urlpatterns = [
    path('my_orders', views.my_orders, name='my_orders'),
    path('active_orders', views.active_orders, name='active_orders')
]