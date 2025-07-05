from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the flash card app.")

class FlashCardView(APIView):
    serializer_class = FlashcardSerializer

    def get (self, request):
        # Will use python list comprehension (since tutorial had this way), but there is a better any dry way of doing this!
        # Serialization happen in this function (reading) -- Turning model object into JSON-ready dictionaries.

        # We took the Flashcard model objects from the data base then for each object we make dictionary with two field to at the end return a JSON list of these dictionaries.
        flash_card_content = [{"front_side" : card.front_side, "back_side" : card.back_side} for card in Flashcard.objects.all()]
        # Returning JSON from Response
        return Response(flash_card_content)
    
    def post(self, request):
        #Deserialization happens over here(writing). Taking input from frontend (form or could be JSON), validate it, and makes a model.
        
        serializer = FlashcardSerializer(data= request.data)

        #Validate data
        if serializer.is_valid(raise_exception=True):
            #Save to the database
            serializer.save()
            #Convert python do JSON and return it as HTTP response
            # All API endpoints need to return a clear HTTP response!
            return Response(serializer.data)

            

        

