from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator

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


class Orders(models.Model):
    pizzas = models.JSONField(default=dict)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Заказчик')
    address = models.ForeignKey('Address', on_delete=models.CASCADE)
    order_time = models.DateTimeField('Время заказа', default=timezone.now)
    lead_time = models.DateTimeField('Время доставки', default=timezone.now)
    is_complete = models.BooleanField('Готовность заказа', default=False)
    courier = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Курьер', null=True)

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
        return f'город {self.city}, улица {self.street}, дом {self.house}, квартира {self.apartment}'
    
    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адреса'


class Contacts(models.Model):
    name = models.CharField('Имя', max_length=50)
    surname = models.CharField('Фамилия', max_length=50)
    phone_regex = RegexValidator(regex=r'\+375\((29|33|44|25)\)\d{3}-\d{2}-\d{2}', message="Номер должен быть в формате +375(29|33|44|25)XXX-XX-XX")
    phone_number = models.CharField('Телефон', validators=[phone_regex], max_length=17, blank=True)
    work = models.TextField('Выполняемая работа')
    email = models.EmailField('Почта')
    image = models.ImageField('Фотография', upload_to='contact_images', default='pizza_images/blank_contact.png')

    def __str__(self) -> str:
        return f'{self.surname} {self.name} '
    
    class Meta:
        verbose_name = 'Контакт'
        verbose_name_plural = 'Контакты'


class News(models.Model):
    title = models.CharField('Заголовок', max_length=50)
    content = models.TextField('Содержание')
    publication_date = models.DateField('Дата публикации')
    image = models.ImageField('Изображение', upload_to='news_images', default='news_images/blank_news.png')

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'


class Vacancies(models.Model):
    title = models.CharField('Название', max_length=50)
    description = models.TextField('Описание', blank=True)
    schedule_info = models.TextField('График работы', blank=True)
    salary_info = models.TextField('Зарплата', blank=True)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'


class Reviews(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='Пользователь')
    rating = models.IntegerField('Оценка', validators=[MinValueValidator(1), MaxValueValidator(5)])
    content = models.TextField('Содержание', blank=True)
    date = models.DateTimeField('Дата')

    def __str__(self) -> str:
        return f'Отзыв {self.user} с оценкой {self.rating}'
    
    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

