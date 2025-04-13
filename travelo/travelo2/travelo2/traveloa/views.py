# traveloa/views.py

from django.http import JsonResponse
from .models import Hotel, Attraction
from django.shortcuts import get_object_or_404
from django.core.serializers.json import DjangoJSONEncoder
import json

def hotel_list_api(request):
    """
    JSON endpoint that returns a list of hotels filtered by location.
    If a location query parameter is provided, it will match using icontains.
    If no location is provided, it returns all hotels.
    """
    location = request.GET.get('location', '')
    # Filter hotels where the location field contains the query (case-insensitive)
    hotels = Hotel.objects.filter(location__icontains=location)
    # Convert the queryset to a list of dictionaries
    hotel_data = list(hotels.values())
    return JsonResponse(hotel_data, safe=False)

def attraction_list_api(request):
    """
    JSON endpoint that returns a list of attractions filtered by location.
    """
    location = request.GET.get('location', '')
    attractions = Attraction.objects.filter(location__icontains=location)
    attraction_data = list(attractions.values())
    return JsonResponse(attraction_data, safe=False)


# Optionally, you can also define views to handle rating hotels/attractions.
def rate_hotel(request, hotel_id):
    # (Implement your logic for handling ratings.)
    return JsonResponse({"message": f"Hotel {hotel_id} rated!"})

def rate_attraction(request, attraction_id):
    # (Implement your logic for handling ratings.)
    return JsonResponse({"message": f"Attraction {attraction_id} rated!"})

def hotel_detail_api(request, hotel_id):
    hotel = get_object_or_404(Hotel, pk=hotel_id)
    hotel_data = {
        "id": hotel.id,
        "name": hotel.name,
        "location": hotel.location,
        "price": float(hotel.price),
        "average_rating": hotel.average_rating,
        "rating_count": hotel.rating_count,
        "image": hotel.image,
        "amenities": hotel.amenities,
    }

    return JsonResponse(hotel_data, encoder=DjangoJSONEncoder, safe=False)

