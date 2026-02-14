from rest_framework import serializers
from .models import ReminderType, UserReminder, ReminderLog

class ReminderTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReminderType
        fields = ['id', 'name', 'description', 'default_interval', 'icon']


class UserReminderSerializer(serializers.ModelSerializer):
    reminder_type_detail = ReminderTypeSerializer(source='reminder_type', read_only=True)
    
    class Meta:
        model = UserReminder
        fields = ['id', 'reminder_type', 'reminder_type_detail', 'interval', 'is_active', 'created_at', 'updated_at']


class ReminderLogSerializer(serializers.ModelSerializer):
    reminder_type_detail = ReminderTypeSerializer(source='reminder_type', read_only=True)
    
    class Meta:
        model = ReminderLog
        fields = ['id', 'reminder_type', 'reminder_type_detail', 'shown_at', 'acknowledged', 'acknowledged_at']
