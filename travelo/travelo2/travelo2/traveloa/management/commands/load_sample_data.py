from django.core.management.base import BaseCommand
from traveloa.models import Hotel, Attraction
import random

class Command(BaseCommand):
    help = "Load sample hotel and attraction data into the database"

    def handle(self, *args, **kwargs):
        sample_hotels = [
            {
                "name": "Hotel One",
                "location": "New York",
                "image": "https://via.placeholder.com/300x200.png?text=Hotel+One",
                "price": 219.00,
                "amenities": ["Free Wi-Fi", "Fitness Center"],
                "average_rating": 4.7,      # <-- Add a float rating
                "rating_count": 12,        # Optional
            },
            {
                "name": "Modern Times Square Hotel",
                "location": "New York",
                "image": "https://via.placeholder.com/300x200.png?text=Hotel+Two",
                "price": 189.00,
                "amenities": ["Spa", "Restaurant"],
                "average_rating": 4.5,
                "rating_count": 9,
            },
            {
                "name": "Cityview Inn",
                "location": "New York",
                "image": "https://via.placeholder.com/300x200.png?text=Hotel+Three",
                "price": 165.00,
                "amenities": ["Parking", "Pet-Friendly"],
                "average_rating": 4.0,
                "rating_count": 6,
            },
            {
                "name": "Grand Central Hotel",
                "location": "New York",
                "image": "https://via.placeholder.com/300x200.png?text=Hotel+Four",
                "price": 199.00,
                "amenities": ["Gym", "Restaurant"],
                "average_rating": 4.2,
                "rating_count": 14,
            },
            {
                "name": "The Grand Plaza",
                "location": "San Francisco",
                "image": "https://via.placeholder.com/300x200.png?text=Hotel+5",
                "price": 250.00,
                "amenities": ["WiFi", "Pool", "Breakfast"],
                "average_rating": 4.0,
                "rating_count": 2,
            },
            
  {
    "name": "The Kayon Jungle Resort",
    "location": "Bali",
    "image": "kayonbali.jpg",
    "price": 350.00,
    "amenities": ["Free Wi-Fi", "Infinity Pool", "Spa", "Fitness Center"],
    "average_rating": 4.9,
    "rating_count": 120
  },
  {
    "name": "Mulia Villas",
    "location": "Bali",
    "image": "muliabali.jpg",
    "price": 400.00,
    "amenities": ["Private Pool", "Beach Access", "Butler Service", "Free Breakfast"],
    "average_rating": 4.8,
    "rating_count": 95
  },
  {
    "name": "Padma Resort Ubud",
    "location": "Bali",
    "image": "padmabali.jpg",
    "price": 320.00,
    "amenities": ["Jungle Views", "Yoga Classes", "Free Wi-Fi", "Kids Club"],
    "average_rating": 4.7,
    "rating_count": 150
  },
  {
    "name": "The Vira Bali Boutique Hotel & Suite",
    "location": "Bali",
    "image": "virabali.jpg",
    "price": 150.00,
    "amenities": ["Free Airport Shuttle", "Spa", "Outdoor Pool", "Restaurant"],
    "average_rating": 4.5,
    "rating_count": 200
  },
  {
    "name": "Seashell Suites and Villas",
    "location": "Goa",
    "image": "seashellgoa.jpeg",
    "price": 180.00,
    "amenities": ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Bar"],
    "average_rating": 4.6,
    "rating_count": 85
  },
  {
    "name": "Ramada by Wyndham Goa Arpora",
    "location": "Goa",
    "image": "ramada.jpg",
    "price": 160.00,
    "amenities": ["Free Breakfast", "Outdoor Pool", "Spa", "Fitness Center"],
    "average_rating": 4.4,
    "rating_count": 110
  },
  {
    "name": "Resort De Coracao",
    "location": "Goa",
    "image": "coracaogoa.jpg",
    "price": 140.00,
    "amenities": ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Free Parking"],
    "average_rating": 4.3,
    "rating_count": 90
  },
  {
    "name": "The Crescent",
    "location": "Goa",
    "image": "crescent.jpg",
    "price": 200.00,
    "amenities": ["Beach Access", "Free Breakfast", "Spa", "Bar"],
    "average_rating": 4.7,
    "rating_count": 70
  },
  {
    "name": "Evolve Back Coorg",
    "location": "Coorg",
    "image": "https://via.placeholder.com/300x200.png?text=Evolve+Back+Coorg",
    "price": 300.00,
    "amenities": ["Private Pool", "Coffee Plantation Tours", "Spa", "Free Wi-Fi"],
    "average_rating": 4.9,
    "rating_count": 130
  },
  {
    "name": "Club Mahindra Virajpet",
    "location": "Coorg",
    "image": "https://via.placeholder.com/300x200.png?text=Club+Mahindra+Virajpet",
    "price": 250.00,
    "amenities": ["Outdoor Pool", "Restaurant", "Kids Play Area", "Fitness Center"],
    "average_rating": 4.5,
    "rating_count": 100
  },
  {
    "name": "The Tamara Coorg",
    "location": "Coorg",
    "image": "https://via.placeholder.com/300x200.png?text=The+Tamara+Coorg",
    "price": 280.00,
    "amenities": ["Luxury Cottages", "Nature Walks", "Spa", "Free Breakfast"],
    "average_rating": 4.8,
    "rating_count": 115
  },
  {
    "name": "Coorg Wilderness Resort & Spa",
    "location": "Coorg",
    "image": "https://via.placeholder.com/300x200.png?text=Coorg+Wilderness+Resort+&+Spa",
    "price": 270.00,
    "amenities": ["European Styled Rooms", "Infinity Pool", "Spa", "Free Wi-Fi"],
    "average_rating": 4.7,
    "rating_count": 90
  },
  {
    "name": "Four Seasons Hotel Sydney",
    "location": "Sydney",
    "image": "https://via.placeholder.com/300x200.png?text=Four+Seasons+Hotel+Sydney",
    "price": 400.00,
    "amenities": ["Harbour Views", "Outdoor Pool", "Spa", "Free Wi-Fi"],
    "average_rating": 4.8,
    "rating_count": 210
  },
  {
    "name": "Shangri-La Sydney",
    "location": "Sydney",
    "image": "https://via.placeholder.com/300x200.png?text=Shangri-La+Sydney",
    "price": 380.00,
    "amenities": ["Skyline Views", "Indoor Pool", "Spa", "Fine Dining"],
    "average_rating": 4.7,
    "rating_count": 180
  },
  {
    "name": "Park Hyatt Sydney",
    "location": "Sydney",
    "image": "https://via.placeholder.com/300x200.png?text=Park+Hyatt+Sydney",
    "price": 450.00,
    "amenities": ["Opera House Views", "Rooftop Pool", "Spa", "Butler Service"],
    "average_rating": 4.9,
    "rating_count": 160

  },
 

            
        ]
        
        sample_attractions = [
            {
                "name": "Central Park",
                "location": "New York",
                "image": "https://via.placeholder.com/300x200.png?text=Attraction+1",
                "description": "A large public park in New York City.",
                "average_rating": 4.8,
            },
            {
                "name": "Golden Gate Bridge",
                "location": "San Francisco",
                "image": "https://via.placeholder.com/300x200.png?text=Attraction+2",
                "description": "An iconic suspension bridge in San Francisco.",
            },
        ]
        
        for hotel_data in sample_hotels:
            obj, created = Hotel.objects.update_or_create(
                name=hotel_data["name"],  # using name as a unique identifier
                defaults=hotel_data,
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Loaded hotel: {obj.name}"))
            else:
                self.stdout.write(f"Updated hotel: {obj.name}")
        
        for attr_data in sample_attractions:
            obj, created = Attraction.objects.update_or_create(
                name=attr_data["name"],  # using name as a unique identifier
                defaults=attr_data,
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Loaded attraction: {obj.name}"))
            else:
                self.stdout.write(f"Updated attraction: {obj.name}")
