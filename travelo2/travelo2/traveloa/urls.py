# traveloa/urls.py

from django.urls import path
from .views import hotel_list_api, attraction_list_api, rate_hotel, rate_attraction

urlpatterns = [
    path("hotels/", hotel_list_api, name="hotel_list_api"),
    path("attractions/", attraction_list_api, name="attraction_list_api"),
    path("hotels/<int:hotel_id>/rate/", rate_hotel, name="rate_hotel"),
    path("attractions/<int:attraction_id>/rate/", rate_attraction, name="rate_attraction"),
]
