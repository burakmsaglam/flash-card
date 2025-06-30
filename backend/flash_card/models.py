from django.db import models

# Create your models here.
# Class name is table name.
class Flashcard(models.Model):
    front_side = models.CharField(max_length=255)
    back_side = models.CharField(max_length=255) 
    def __str__(self):
        return "This is a flashcard"
    def showFlashCard(self):
        return f"Front side text is {self.front_side}\nBack side text is {self.back_side}"
    
