# Generated by Django 5.0.6 on 2024-05-15 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0019_alter_pizzas_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizzas',
            name='image',
            field=models.ImageField(blank=True, default='pizza_images/pizza_logo.png', null=True, upload_to='pizza_images', verbose_name='Изображение'),
        ),
    ]
