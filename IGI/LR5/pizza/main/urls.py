from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    re_path(r'^coupons', views.coupons, name='coupons'),
    path('accounts/register', views.register, name='register'),
    re_path(r'^contacts', views.contacts, name='contacts'),
    re_path(r'^news', views.news, name='news'),
    path('news/<int:pk>', views.NewsDetailView.as_view(), name='news_detail'),
    re_path(r'^vacancies', views.vacancies, name='vacancies'),
    re_path(r'^reviews', views.reviews, name='reviews'),
    path('privacy', views.privacy, name='privacy'),
    path('api1', views.api1, name='api1'),
    path('api2', views.api2, name='api2'),
    re_path(r'^faq', views.faq, name='faq')
]