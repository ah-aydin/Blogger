from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    # Admin urls
    path('admin/', admin.site.urls),

    # Djoser
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    # Api
    path('api/account/', include('account.urls')),
    path('api/blog/', include('blog.urls')),

    # Rich text field
    path('djrichtextfield/', include('djrichtextfield.urls')),

    # React/redux frontend build
    re_path('^.*', TemplateView.as_view(template_name='index.html')),
]
