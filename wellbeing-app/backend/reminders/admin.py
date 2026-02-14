from django.contrib import admin
from .models import ReminderType, UserReminder, ReminderLog


@admin.register(ReminderType)
class ReminderTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'default_interval', 'icon']
    search_fields = ['name', 'description']


@admin.register(UserReminder)
class UserReminderAdmin(admin.ModelAdmin):
    list_display = ['reminder_type', 'interval', 'is_active', 'created_at']
    list_filter = ['is_active', 'reminder_type']
    search_fields = ['reminder_type__name']


@admin.register(ReminderLog)
class ReminderLogAdmin(admin.ModelAdmin):
    list_display = ['reminder_type', 'shown_at', 'acknowledged', 'acknowledged_at']
    list_filter = ['acknowledged', 'reminder_type']
    date_hierarchy = 'shown_at'

