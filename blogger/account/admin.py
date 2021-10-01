from django.contrib import admin
from .models import Account, Follow

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    search_fields = (
        'email', 'name', 'last_name', 'date_joined', 'last_login'
    )

    readonly_fields = ('date_joined', 'last_login', 'blog_count', 'password')
    fieldsets = (
        ("Personal information", {
            'fields': ('email', 'name', 'last_name', 'password')
        }),
        ("Account information", {
            'fields': ('date_joined', 'last_login', 'blog_count')
        }),
        ( "Permissions", {
            'fields': ('is_active', 'is_staff', 'is_admin')
        })
    )

@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    search_fields = (
        'follower__email', 'follower__name', 'follower__last_name',
        'follows__email', 'follows__name', 'follows__last_name'
    )

    readonly_fields = ('follower', 'follows')
    fieldsets = (
        (None, {
            'fields': ('follower', 'follows')
        }),
    )
