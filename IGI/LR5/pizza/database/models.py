from django.db import models
from django.contrib.auth.models import User

class Pizzas(models.Model):
    name = models.CharField('Название', max_length=50)
    description = models.CharField('Описание', max_length=50)
    price = models.DecimalField('Цена', max_digits=6, decimal_places=2)
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
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'