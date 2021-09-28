from django.contrib import admin
from .models import Account

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
