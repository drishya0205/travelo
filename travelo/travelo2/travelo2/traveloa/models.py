# traveloa/models.py

from django.db import models
import math

class Hotel(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    average_rating = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)
    image = models.URLField(blank=True, null=True)
    amenities = models.JSONField(default=list, blank=True)
    elo_rating = models.FloatField(default=1500)  # Starting ELO rating
    
    def calculate_elo_change(self, opponent_rating, result, k_factor=32):
        expected_score = 1 / (1 + math.pow(10, (opponent_rating - self.elo_rating) / 400))
        return k_factor * (result - expected_score)
    
    def update_elo_rating(self, opponent_hotel, result):
        
        rating_change = self.calculate_elo_change(opponent_hotel.elo_rating, result)
        
        # Update both hotels' ratings
        self.elo_rating += rating_change
        opponent_hotel.elo_rating -= rating_change
        
        # Save both hotels
        self.save()
        opponent_hotel.save()

    def __str__(self):
        return self.name


class Attraction(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField(blank=True, null=True)
    duration = models.CharField(max_length=100, blank=True, null=True)
    entry_fee = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    average_rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.name
    
class UserRankings(models.Model):
    name = models.CharField(max_length=255)
    elo_rating = models.FloatField()
    ranking = models.IntegerField()

