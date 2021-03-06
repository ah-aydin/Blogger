from .models import Account, Follow
from .serializers import AccountSerializer, AccountFollowerSerializer, AccountFollowingSerializer

from rest_framework import generics, permissions, filters
from rest_framework.response import Response

class AccountList(generics.ListAPIView):
    """
    Returns a list of all available accounts
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email', 'name', 'last_name']

class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Returns details of one account from the supplied primary key
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AccountFollowers(generics.ListAPIView):
    """
    Returns a list of the given accounts followers
    """
    serializer_class = AccountFollowerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['follower__email', 'follower__follower_count']
    def get_queryset(self):
        try:
            # Filter the objects with the given pk then order them according to follower count and name
            return Follow.objects.filter(follows__pk=self.kwargs['pk']).order_by('-follower__follower_count', 'follower__name', 'follower__last_name')
        except Exception:
            return []

class AccountFollows(generics.ListAPIView):
    """
    Returns a list of the accounts this account is following
    """
    serializer_class = AccountFollowingSerializer
    def get_queryset(self):
        try:
            return Follow.objects.filter(follower__pk=self.kwargs['pk'])
        except Exception:
            return []

class CreateDestoryFollow(generics.GenericAPIView):
    """
    POST - Create a follow object, destroy if it exists
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def post(self, request, *args, **kwargs):
        # See if there is an account with the given id
        try:
            follows = Account.objects.get(pk=self.request.data['follow_id'])
        except Exception:
            return Response({"Error": f"No user to follow found with the given ID {self.request.data['follow_id']}"})

        # Check if there is a follow
        try:
            # Remove the follow
            follow = Follow.objects.get(follower=request.user, follows=follows)
            follow.delete()
            # Decrement follower count
            follows.follower_count -= 1
            follows.save()
            return Response("Unfollowed")
        except Exception:
            pass
        
        # Creat follow
        follow = Follow.objects.create(follower=request.user, follows=follows)
        # Increment follower count
        follows.follower_count += 1
        follows.save()
        return Response("Followed")
