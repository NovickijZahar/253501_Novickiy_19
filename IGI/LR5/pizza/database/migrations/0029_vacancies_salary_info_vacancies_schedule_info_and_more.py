# Generated by Django 5.0.6 on 2024-05-16 22:28

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0028_alter_reviews_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancies',
            name='salary_info',
            field=models.TextField(blank=True, verbose_name='Зарплата'),
        ),
        migrations.AddField(
            model_name='vacancies',
            name='schedule_info',
            field=models.TextField(blank=True, verbose_name='График работы'),
        ),
        migrations.AlterField(
            model_name='contacts',
            name='phone_number',
            field=models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message='Номер должен быть в формате +375(29|33|44|25)XXX-XX-XX', regex='\\+375\\((29|33|44|25)\\)\\d{3}-\\d{2}-\\d{2}')], verbose_name='Телефон'),
        ),
    ]