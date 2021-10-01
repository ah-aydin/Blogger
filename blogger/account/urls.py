from django.urls import path
from . import views as v

urlpatterns = [
    # List view
    path('', v.AccountList.as_view(), name='account-list'),
    # Detail
    path('<int:pk>/', v.AccountDetail.as_view(), name='account-detail'),
    # Followers
    path('<int:pk>/followers/', v.AccountFollowers.as_view(), name='account-follower-list'),
    # Following
    path('<int:pk>/follows/', v.AccountFollows.as_view(), name='account-follows-list'),
    # Create/destroy follow
    path('follow/', v.CreateDestoryFollow.as_view(), name='account-create-destroy-follow'),
]