# Generated by Django 4.2.13 on 2024-05-16 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created',
            field=models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created'),
        ),
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Description'),
        ),
    ]
