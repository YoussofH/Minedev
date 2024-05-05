from django.db import models

# Create your models here.
class Plan(models.Model):
    name  = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name
    
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

class Developer(models.Model):
    fullname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=255)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)

    def __str__(self):
        return self.fullname

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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.fullname} chatting conversation on {self.project.name} project"

class DeveloperPrompt(models.Model):
    user = models.ForeignKey(Developer, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.fullname} prompted {self.content}"
    
class BotResponse(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    history_context = models.TextField()
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
