from django.test import TestCase
from database.models import *

class TestCarts(TestCase):
    @classmethod
    def setUpTestData(cls):
        ingredient = Ingredients.objects.create(name='0')
        pizza = Pizzas.objects.create(name='1', description='2', price=3)
        pizza.ingredients.add(ingredient)

    def setUp(self):
        self.user = User.objects.create_user(username='user', password='password')
        self.user.save()
        Carts.objects.create(pizzas={'1': 1},
                             user=self.user)
    
    def test_my_cart(self):
        response = self.client.get('/cart/')
        self.assertNotEqual(response.status_code, 200)
        self.client.force_login(self.user)
        response = self.client.get('/cart/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['sum'], 3)