# Generated by Django 3.2.7 on 2021-09-28 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_account_blog_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='is_staff',
            field=models.BooleanField(default=False, verbose_name='is staff'),
        ),
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(max_length=128, verbose_name='last name'),
        ),
    ]
