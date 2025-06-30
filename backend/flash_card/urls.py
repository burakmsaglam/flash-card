from django.urls import path
# . means relative path and we import the views from current directory
from . import views

urlpatterns = [path("", views.index, name="index"),]