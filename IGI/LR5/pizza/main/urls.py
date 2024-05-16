from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about', views.about, name='about'),
    path('accounts/register', views.register, name='register'),
    path('contacts', views.contacts, name='contacts'),
    path('news', views.news, name='news'),
    path('news/<int:pk>', views.NewsDetailView.as_view(), name='news_detail'),
    path('vacancies', views.vacancies, name='vacancies'),
    path('reviews', views.reviews, name='reviews'),
    path('privacy', views.privacy, name='privacy'),
]