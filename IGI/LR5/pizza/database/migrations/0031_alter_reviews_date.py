# Generated by Django 5.0.6 on 2024-05-16 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0030_alter_vacancies_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='date',
            field=models.DateTimeField(verbose_name='Дата'),
        ),
    ]
