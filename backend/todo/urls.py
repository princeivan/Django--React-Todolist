from django.urls import path 
from .import views
from rest_framework import routers

router =routers.DefaultRouter()
router.register('todo', views.TodoViewSet, basename='todo')


urlpatterns = [
    
]
urlpatterns += router.urls