from django import forms
from .models import HotelRating, AttractionRating

class HotelRatingForm(forms.ModelForm):
    class Meta:
        model = HotelRating
        fields = ['rating', 'comment']
        widgets = {
            'rating': forms.NumberInput(attrs={'min': 1, 'max': 5}),
            'comment': forms.Textarea(attrs={'rows': 3}),
        }

class AttractionRatingForm(forms.ModelForm):
    class Meta:
        model = AttractionRating
        fields = ['rating', 'comment']
        widgets = {
            'rating': forms.NumberInput(attrs={'min': 1, 'max': 5}),
            'comment': forms.Textarea(attrs={'rows': 3}),
        }
