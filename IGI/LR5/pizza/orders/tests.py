from django.test import TestCase
from database.models import *

class OrdersDataBase(TestCase):
    @classmethod
    def setUpTestData(cls):
        ingredient = Ingredients.objects.create(name='0')
        pizza = Pizzas.objects.create(name='1', description='2', price=3)
        pizza.ingredients.add(ingredient)
        Address.objects.create(city='3', street='4', house=5, entrance=6, floor=7, apartment=8)

    # Run once for every test method to setup clean data.
    def setUp(self):
        self.user = User.objects.create_user(username='user', password='password')
        self.user.save()

        self.user_staff = User.objects.create_user(username='courier', password='password')
        self.user_staff.is_staff = True
        self.user_staff.is_superuser = True
        self.user_staff.save()

        Orders.objects.create(pizzas={'1': 1}, 
                                      user=self.user, 
                                      address=Address.objects.get(id=1),
                                      lead_time=timezone.now(),
                                      order_time=timezone.now(),
                                      is_complete=False,
                                      courier=self.user_staff)

    def test_my_orders(self):
        self.client.force_login(self.user)
        response = self.client.get('/orders/my_orders')
        self.assertEqual(response.context['in_progress_arr_pizzas'], 
                         [[{Pizzas.objects.get(id=1): 1}, 
                          Orders.objects.get(id=1)]])
        self.assertEqual(response.context['completed_arr_pizzas'], 
                         [])
        
    def test_active_orders(self):
        self.client.force_login(self.user)
        response = self.client.get('/orders/active_orders')
        self.assertEqual(response.status_code, 302)
        self.client.force_login(self.user_staff)
        response = self.client.get('/orders/active_orders')
        self.assertEqual(response.status_code, 200)