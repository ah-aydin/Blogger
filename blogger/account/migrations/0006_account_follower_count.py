# Generated by Django 3.2.7 on 2021-10-01 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_follow'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='follower_count',
            field=models.IntegerField(default=0, editable=False),
        ),
    ]
