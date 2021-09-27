# Generated by Django 3.2.7 on 2021-09-27 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=256, unique=True, verbose_name='email')),
                ('name', models.CharField(max_length=128, verbose_name='name')),
                ('last_name', models.CharField(max_length=128, verbose_name='last_name')),
                ('date_joined', models.DateField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateField(auto_now=True, verbose_name='last login')),
                ('is_active', models.BooleanField(default=False, verbose_name='is active')),
                ('is_admin', models.BooleanField(default=False, verbose_name='is admin')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
