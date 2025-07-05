from django.urls import path
# . means relative path and we import the views from current directory
from flash_card.views import *

urlpatterns = [
    # path("", views.index, name="index"),
    path("flashcards/", FlashCardView.as_view(), name="flashcards"),
]