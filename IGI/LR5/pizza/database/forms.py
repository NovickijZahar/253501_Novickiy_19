from . models import Pizzas, Ingredients
from django.forms import ModelForm, TextInput, NumberInput, CheckboxSelectMultiple

class PizzasForm(ModelForm):
    class Meta:
        model = Pizzas
        fields = ['name', 'description', 'price', 'ingredients']
        widgets = {
            'name': TextInput(attrs={
                'placeholder': 'Название пиццы'
            }),
            'description': TextInput(attrs={
                'placeholder': 'Описание пиццы'
            }),
            'price': NumberInput(attrs={
                'min': '0',
                'placeholder': 'Цена пиццы',
            }),
            'ingredients': CheckboxSelectMultiple(attrs={
                'name': 'Ингредиенты',
            })
        }

class IngredientsForm(ModelForm):
    class Meta:
        model = Ingredients
        fields = ['name']
        widgets = {
            'name': TextInput(attrs={
                'placeholder': 'Название ингредиента'
            })
        }
