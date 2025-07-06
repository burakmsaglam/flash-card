from rest_framework import serializers
from . models import *

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id','front_side', 'back_side']