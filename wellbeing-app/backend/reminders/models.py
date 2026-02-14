from django.db import models

class ReminderType(models.Model):
    """Types of reminders available"""
    WATER = 'water'
    BREAK = 'break'
    WALK = 'walk'
    SCREEN = 'screen'
    
    TYPE_CHOICES = [
        (WATER, 'Drink Water'),
        (BREAK, 'Take a Break'),
        (WALK, 'Take a Walk'),
        (SCREEN, 'Look Away from Screen'),
    ]
    
    name = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
    description = models.TextField()
    default_interval = models.IntegerField(help_text="Default interval in minutes")
    icon = models.CharField(max_length=50, default='🔔')
    
    def __str__(self):
        return self.get_name_display()


class UserReminder(models.Model):
    """User's reminder preferences"""
    reminder_type = models.ForeignKey(ReminderType, on_delete=models.CASCADE)
    interval = models.IntegerField(help_text="Interval in minutes")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.reminder_type.name} - Every {self.interval} minutes"


class ReminderLog(models.Model):
    """Log of reminders shown to users"""
    reminder_type = models.ForeignKey(ReminderType, on_delete=models.CASCADE)
    shown_at = models.DateTimeField(auto_now_add=True)
    acknowledged = models.BooleanField(default=False)
    acknowledged_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.reminder_type.name} at {self.shown_at}"
    
    class Meta:
        ordering = ['-shown_at']

