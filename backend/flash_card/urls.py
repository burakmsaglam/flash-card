from django.urls import path, include
# . means relative path and we import the views from current directory
from flash_card.views import *
from rest_framework.routers import DefaultRouter

router= DefaultRouter()
router.register(r'flashcards', FlashcardViewSet)
urlpatterns = [
    path('', include(router.urls)),
]

#urlpatterns = [
    # path("", views.index, name="index"),
    # used with APIView
    # path("flashcards/", FlashCardView.as_view(), name="flashcards"),
    # with modelViewSet need to use router
#]