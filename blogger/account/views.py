from .models import Account
from .serializers import AccountSerializer

from rest_framework import generics, permissions

class AccountList(generics.ListAPIView):
    """
    Returns a list of all available accounts
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AccountDetail(generics.RetrieveAPIView):
    """
    Returns detials of one account from the supplied primary key
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer