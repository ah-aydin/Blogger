from django.db import models
from django.conf import settings
from django.db.models.fields.related import ForeignKey

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Blog(models.Model):
    title           = models.CharField(max_length=255, unique=True)
    subtitle        = models.CharField(max_length=255, blank=True)
    slug            = models.SlugField(max_length=255, unique=True)
    body            = models.TextField()
    date_created    = models.DateField(auto_now_add=True)
    date_modified   = models.DateField(auto_now=True)
    
    author          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    tags            = models.ManyToManyField(Tag, blank=True)