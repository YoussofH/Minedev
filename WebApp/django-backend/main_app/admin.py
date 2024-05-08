from django.contrib import admin
from .models import (Plan, Project, Feature, BotResponse, Conversation,
                     Developer, DeveloperPrompt, Enterprise, EnterpriseDeveloper)

from django.contrib.auth.admin import UserAdmin
from .models import Developer

admin.site.register(Developer)

# Register your models here.
admin.site.register(Plan)
admin.site.register(Project)
admin.site.register(Feature)
admin.site.register(BotResponse)
admin.site.register(Conversation)
admin.site.register(DeveloperPrompt)
admin.site.register(Enterprise)
admin.site.register(EnterpriseDeveloper)
