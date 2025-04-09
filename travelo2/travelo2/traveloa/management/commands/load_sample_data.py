from django.core.management.base import BaseCommand
from traveloa.models import Hotel, Attraction

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
