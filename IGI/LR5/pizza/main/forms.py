from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm

class RegisterUserForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'password']
        widgets = {
            'username': forms.TextInput(attrs={
                'placeholder': 'Логин'
            }),
            'email': forms.EmailInput(), 
            'first_name': forms.TextInput(attrs={
                'placeholder': 'Имя'
            }), 
            'last_name': forms.TextInput(attrs={
                'placeholder': 'Фамилия'
            }), 
            'password': forms.PasswordInput(),
            'password2': forms.PasswordInput()
        }
    def clean_password(self):
        return self.cleaned_data['password']
        
    def clean_email(self):
        email = self.cleaned_data['email']
        if get_user_model().objects.filter(email='email').exists():
            raise forms.ValidationError('Пользователь с такой почтой уже существует')
        return email
