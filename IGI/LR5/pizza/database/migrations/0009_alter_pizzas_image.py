# Generated by Django 5.0.6 on 2024-05-15 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0008_alter_pizzas_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizzas',
            name='image',
            field=models.ImageField(default='blank_pizza.png', upload_to='piiza_images', verbose_name='Изображение'),
        ),
    ]