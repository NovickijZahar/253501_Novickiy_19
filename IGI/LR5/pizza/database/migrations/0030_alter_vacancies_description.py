# Generated by Django 5.0.6 on 2024-05-16 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0029_vacancies_salary_info_vacancies_schedule_info_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vacancies',
            name='description',
            field=models.TextField(blank=True, verbose_name='Описание'),
        ),
    ]
