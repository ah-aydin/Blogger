from django.urls import path
from . import views as v

urlpatterns = [
    # Blog
    path('', v.BlogList.as_view(), name='blog-list'),
    path('<int:pk>/', v.BlogDetail.as_view(), name='blog-detail'),
    
    # Tag
    path('tag/', v.TagList.as_view(), name='tag-list'),
    path('tag/<int:pk>/', v.TagDetail.as_view(), name='tag-detail'),
]