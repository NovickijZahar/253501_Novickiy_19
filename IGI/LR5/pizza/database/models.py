from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Pizzas(models.Model):
    name = models.CharField('Название', max_length=50)
    description = models.CharField('Описание', max_length=50)
    price = models.DecimalField('Цена', max_digits=6, decimal_places=2)
    image = models.ImageField('Изображение', upload_to='pizza_images', default='pizza_images/pizza_logo.png')
    ingredients = models.ManyToManyField('Ingredients')

    def __str__(self) -> str:
        return self.name
    
    def get_absolute_url(self):
        return f'/database/{self.id}'
    
    class Meta:
        verbose_name = 'Пицца'
        verbose_name_plural = 'Пиццы'


class Ingredients(models.Model):
    name = models.CharField('Название', max_length=50)

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Игредиенты'


class Carts(models.Model):
    pizzas = models.JSONField(default=dict)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class Order(models.Model):
    pizzas = models.JSONField(default=dict)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey('Address', on_delete=models.CASCADE)
    order_time = models.DateTimeField('Время заказа', default=timezone.now)
    lead_time = models.DateTimeField('Время доставки', default=timezone.now)
    is_complete = models.BooleanField('Готовность заказа', default=False)

    def __str__(self) -> str:
        return f'Заказ {self.user} по адресу город {self.address.city}, улица {self.address.street}, дом {self.address.house}, квартира {self.address.apartment}'

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class Address(models.Model):
    city = models.CharField('Город', max_length=50)
    street = models.CharField('Улица', max_length=50)
    house = models.IntegerField('Дом')
    entrance = models.IntegerField('Подъезд')
    floor = models.IntegerField('Этаж')
    apartment = models.IntegerField('Квартира')

    def __str__(self) -> str:
        return f'Город {self.city}, улица {self.street}, дом {self.house}, квартира {self.apartment}'
    
    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адреса'