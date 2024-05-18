from django.test import TestCase
from . forms import PizzasForm, IngredientsForm
from . models import *

class TestDataBase(TestCase):

    # Run once to set up non-modified data for all class methods.
    @classmethod
    def setUpTestData(cls):
        ingredient = Ingredients.objects.create(name='0')
        pizza = Pizzas.objects.create(name='1', description='2', price=3)
        pizza.ingredients.add(ingredient)

    # Run once for every test method to setup clean data.
    def setUp(self):
        self.user = User.objects.create_user(username='admin', password='password')
        self.user.is_staff = True
        self.user.is_superuser = True
        self.user.save()

    def test_pizza_form_name_max_length(self):
        form = PizzasForm()
        self.assertEqual(form.fields['name'].max_length, 50)

    def test_ingredients_form_name_max_length(self):
        form = IngredientsForm()
        self.assertEqual(form.fields['name'].max_length, 50) 

    def test_index(self):
        response = self.client.get('/database/')
        self.assertEqual(response.status_code, 200)

    def test_detail(self):
        response = self.client.get('/database/1')
        self.assertEqual(response.status_code, 200)

    def test_edit(self):
        self.client.force_login(self.user)
        response = self.client.get('/database/1/edit')
        self.assertEqual(response.status_code, 200)

    def test_delete(self):
        self.client.force_login(self.user)
        response = self.client.get('/database/1/delete')
        self.assertEqual(response.status_code, 200)

    def test_create_pizza(self):
        self.client.force_login(self.user)
        response = self.client.get('/database/create_pizza')
        self.assertEqual(response.status_code, 200)

    def test_create_ingredient(self):
        self.client.force_login(self.user)
        response = self.client.get('/database/create_ingredient')
        self.assertEqual(response.status_code, 200)