from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Plan(models.Model):
    name  = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name
    

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, fullname="", plan=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, fullname=fullname, plan=plan, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

# Custom User
class Developer(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    plan = models.ForeignKey(Plan, on_delete= models.CASCADE, blank=True, null=True)

    username = None
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Feature(models.Model):
    chatbot = models.BooleanField()
    navigation = models.BooleanField()
    ai_talk = models.BooleanField()
    plan = models.ForeignKey(Plan, on_delete= models.CASCADE)

    def __str__(self):
        features = [
            "Chatbot" if self.chatbot else "",
            "Navigation" if self.navigation else "",
            "AI Talk" if self.ai_talk else ""
        ]
        return f"Feature: {', '.join(features)}"

class Enterprise(models.Model):
    name =  models.CharField(max_length=100)
    admin = models.ForeignKey(Developer, on_delete=models.CASCADE)
    system_ai = models.TextField()

    def __str__(self):
        return self.name

class EnterpriseDeveloper(models.Model):
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    user = models.ForeignKey(Developer, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.fullname} in {self.enterprise.name}"

class Project(models.Model):
    user = models.ForeignKey(Developer, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.fullname} working on {self.name} project"
    
class Conversation(models.Model):
    user = models.ForeignKey(Developer, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    hierarchy = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} {self.user.fullname} chatting conversation on {self.project.name} project"

class DeveloperPrompt(models.Model):
    user = models.ForeignKey(Developer, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, related_name="developer_prompts", on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.fullname} prompted {self.content}"
    
class BotResponse(models.Model):
    conversation = models.ForeignKey(Conversation, related_name="bot_responses", on_delete=models.CASCADE)
    history_context = models.TextField()
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bot responded {self.content}"