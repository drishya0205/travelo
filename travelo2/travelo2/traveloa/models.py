# traveloa/models.py

from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    average_rating = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)
    image = models.URLField(blank=True, null=True)
    amenities = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name


class Attraction(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField(blank=True, null=True)
    duration = models.CharField(max_length=100, blank=True, null=True)
    entry_fee = models.DecimalField(max_digits=6, decimal_places=2, default=0)

    def __str__(self):
        return self.name
