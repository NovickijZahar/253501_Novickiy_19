from . models import Pizzas, Ingredients
from django.forms import ModelForm, TextInput, NumberInput, CheckboxSelectMultiple, FileInput


class PizzasForm(ModelForm):
    class Meta:
        model = Pizzas
        fields = ['name', 'description', 'price', 'ingredients', 'image']


class IngredientsForm(ModelForm):
    class Meta:
        model = Ingredients
        fields = ['name']
        widgets = {
            'name': TextInput(attrs={
                'placeholder': 'Название ингредиента'
            })
        }
