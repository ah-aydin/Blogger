from django.urls import path
from . import views as v

urlpatterns = [
    # List view
    path('', v.AccountList.as_view(), name='account-list'),
    # Detail
    path('<int:pk>/', v.AccountDetail.as_view(), name='account-detail'),
]