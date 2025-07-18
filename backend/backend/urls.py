"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
# from django.conf.urls import url -- Use Path() instead


urlpatterns = [
    path('admin/', admin.site.urls),
    # path function expects at least 2 arguments route and view.
    # include function help us referencing other URLconfs. Include function also cuts whatever part of the URL matched up to that point and sends the remaning string to the included URLconf for further processing.
    # Cite: https://docs.djangoproject.com/en/5.2/intro/tutorial01/#top

    # The idea behind include() is to make it easy to plug-and-play URLs. 
    # Since polls are in their own URLconf (polls/urls.py), they can be placed under “/polls/”, or under “/fun_polls/”, or under “/content/polls/”, or any other path root, and the app will still work.

    # When to use include()

    # You should always use include() when you include other URL patterns. The only exception is admin.site.urls, which is a pre-built URLconf provided by Django for the default admin site.
    path("api/", include("flash_card.urls")),
    # Redirect to admin
    path('', RedirectView.as_view(url='/flash_card/')),
]
