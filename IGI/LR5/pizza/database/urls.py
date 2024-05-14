from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='database_home'),
    path('create_ingredient', views.create_ingredient, name='create_ingredient'),
    path('create_pizza', views.create_pizza, name='create_pizza'),
    path('<int:pk>', views.PizzasDetailView.as_view(), name='pizza_detail'),
    path('<int:pk>/edit', views.PizzasEditView.as_view(), name='pizza_edit'),
    path('<int:pk>/delete', views.PizzasDeleteView.as_view(), name='pizza_delete'),
]
