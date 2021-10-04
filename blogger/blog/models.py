from django.db import models
from django.conf import settings
from django.db.models.fields.related import ForeignKey

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Blog(models.Model):
    title           = models.CharField(max_length=255, unique=True)
    subtitle        = models.CharField(max_length=255, blank=True)
    slug            = models.SlugField(max_length=255, unique=True)
    body            = models.TextField()
    date_created    = models.DateField(auto_now_add=True)
    date_modified   = models.DateField(auto_now=True)
    publish_date    = models.DateTimeField(blank=True, null=True)
    published       = models.BooleanField(default=False)
    
    author          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    tags            = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    author          = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.PROTECT)
    blog            = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    body            = models.TextField()