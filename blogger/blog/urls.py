from django.urls import path
from . import views as v

urlpatterns = [
    # Blog
    path('', v.BlogList.as_view(), name='blog-list'),
    path('<int:pk>/', v.BlogDetail.as_view(), name='blog-detail'),
    # Comments
    path('<int:pk>/comments/', v.BlogComments.as_view(), name='blog-comment-list'),
    path('comment/<int:pk>/', v.CommentDetail.as_view(), name='comment-detail'),
    
    # Tag
    path('tag/', v.TagList.as_view(), name='tag-list'),
    path('tag/<int:pk>/', v.TagDetail.as_view(), name='tag-detail'),

    # TODO add in accounts blogs and accounts comments in here
    path('account/<int:pk>/', v.AccountBlogList.as_view(), name='account-blog-list'),
    path('account/<int:pk>/comments/', v.AccountCommentList.as_view(), name='account-comment-list')
]