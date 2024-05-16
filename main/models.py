from django.db import models
from django.contrib.auth.models import User

from .utilities import *


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True, blank=True, verbose_name='Description')
    # image = models.ImageField(blank=True, upload_to=get_timestamp_path, verbose_name='Picture')
    complete = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['complete']