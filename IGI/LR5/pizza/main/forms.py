from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm

class RegisterUserForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password']
        widgets = {
            'username': forms.TextInput(attrs={
                'placeholder': 'Логин'
            }),
            'password': forms.PasswordInput()
        }
    def clean_password(self):
        return self.cleaned_data['password']
        
    def clean_username(self):
        username = self.cleaned_data['username']
        if get_user_model().objects.filter(username='username').exists():
            raise forms.ValidationError('Пользователь с таким логином уже существует')
        return username
