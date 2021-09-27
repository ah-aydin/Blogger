from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models import aggregates

class AccountManager(BaseUserManager):
    def create_user(self, email, name, last_name, password=None):
        """
        Create's and saves an account with the given parameters
        """
        if not email:       raise ValueError("An email must be provided")
        if not name:        raise ValueError("A name must be provided")
        if not last_name:   raise ValueError("A last name must be provided")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            last_name=last_name
        )
        user.set_password(password)
        user.is_active = True
        user.save()

        return user
    
    def create_superuser(self, email, name, last_name, password=None):
        """
        Create's and saves an admin account with the given parameters
        """
        user = self.create_user(email, name, last_name, password)
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save()

        return user

class Account(AbstractBaseUser):
    # Personal information
    email           = models.EmailField(verbose_name='email', max_length=256, unique=True)
    name            = models.CharField(verbose_name='name', max_length=128)
    last_name       = models.CharField(verbose_name='last name', max_length=128)
    
    # Account information
    date_joined     = models.DateField(verbose_name='date joined', auto_now_add=True, editable=False)
    last_login      = models.DateField(verbose_name='last login', auto_now=True, editable=False)
    blog_count      = models.IntegerField(verbose_name='blog count', editable=False, default=0)

    # Permissions
    is_active       = models.BooleanField(verbose_name='is active', default=False)
    is_staff        = models.BooleanField(verbose_name='is staff', default=False)
    is_admin        = models.BooleanField(verbose_name='is admin', default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'last_name']

    objects = AccountManager()

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.email
