from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import ReminderType, UserReminder, ReminderLog
from .serializers import ReminderTypeSerializer, UserReminderSerializer, ReminderLogSerializer


class ReminderTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for reminder types"""
    queryset = ReminderType.objects.all()
    serializer_class = ReminderTypeSerializer


class UserReminderViewSet(viewsets.ModelViewSet):
    """API endpoint for user reminders"""
    queryset = UserReminder.objects.all()
    serializer_class = UserReminderSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active reminders"""
        active_reminders = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(active_reminders, many=True)
        return Response(serializer.data)


class ReminderLogViewSet(viewsets.ModelViewSet):
    """API endpoint for reminder logs"""
    queryset = ReminderLog.objects.all()
    serializer_class = ReminderLogSerializer
    
    @action(detail=True, methods=['post'])
    def acknowledge(self, request, pk=None):
        """Mark a reminder as acknowledged"""
        reminder_log = self.get_object()
        reminder_log.acknowledged = True
        reminder_log.acknowledged_at = timezone.now()
        reminder_log.save()
        serializer = self.get_serializer(reminder_log)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent reminder logs"""
        recent_logs = self.queryset.all()[:20]
        serializer = self.get_serializer(recent_logs, many=True)
        return Response(serializer.data)

