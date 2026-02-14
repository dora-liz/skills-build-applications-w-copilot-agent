from django.core.management.base import BaseCommand
from reminders.models import ReminderType, UserReminder


class Command(BaseCommand):
    help = 'Populate initial reminder types and user reminders'

    def handle(self, *args, **kwargs):
        # Create reminder types
        reminder_types = [
            {
                'name': 'water',
                'description': 'Reminder to drink water to stay hydrated',
                'default_interval': 60,
                'icon': '💧'
            },
            {
                'name': 'break',
                'description': 'Reminder to take a short break from work',
                'default_interval': 90,
                'icon': '☕'
            },
            {
                'name': 'walk',
                'description': 'Reminder to take a walk and stretch',
                'default_interval': 120,
                'icon': '🚶'
            },
            {
                'name': 'screen',
                'description': 'Reminder to look away from screen (20-20-20 rule)',
                'default_interval': 20,
                'icon': '👁️'
            },
        ]
        
        for rt_data in reminder_types:
            rt, created = ReminderType.objects.get_or_create(
                name=rt_data['name'],
                defaults={
                    'description': rt_data['description'],
                    'default_interval': rt_data['default_interval'],
                    'icon': rt_data['icon']
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created reminder type: {rt.name}'))
                
                # Create a default user reminder for each type
                user_reminder = UserReminder.objects.create(
                    reminder_type=rt,
                    interval=rt.default_interval,
                    is_active=True
                )
                self.stdout.write(self.style.SUCCESS(f'Created user reminder for: {rt.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Reminder type already exists: {rt.name}'))
        
        self.stdout.write(self.style.SUCCESS('Successfully populated reminder data'))
