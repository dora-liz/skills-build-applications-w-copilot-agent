# Wellbeing Reminder App for Software Engineers

A health-focused web application designed to help software engineers maintain wellbeing during long coding sessions. The app provides customizable reminders to drink water, take breaks, walk, and rest eyes from screen time.

## Features

- 💧 **Water Reminders**: Stay hydrated with regular drinking reminders
- ☕ **Break Reminders**: Take short mental breaks from focused work
- 🚶 **Walk Reminders**: Get up and move to improve circulation
- 👁️ **Screen Rest Reminders**: Follow the 20-20-20 rule for eye health

## Technology Stack

- **Backend**: Django REST Framework (Python)
- **Frontend**: React.js with Bootstrap
- **Database**: SQLite (can be easily upgraded to PostgreSQL/MySQL)
- **Notifications**: React Toastify

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd wellbeing-app/backend
   ```

2. Create and activate virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Populate initial reminder data:
   ```bash
   python manage.py populate_reminders
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd wellbeing-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000/`

## Usage

1. Open the app in your browser
2. View all available reminder types (Water, Break, Walk, Screen Rest)
3. Customize the interval for each reminder type
4. Toggle reminders on/off as needed
5. Receive toast notifications at the configured intervals
6. Stay healthy while coding! 🌟

## API Endpoints

- `GET /api/reminder-types/` - List all reminder types
- `GET /api/user-reminders/` - List user reminders
- `GET /api/user-reminders/active/` - Get active reminders
- `PATCH /api/user-reminders/{id}/` - Update reminder settings
- `POST /api/reminder-logs/` - Create reminder log
- `GET /api/reminder-logs/recent/` - Get recent reminder logs

## Customization

You can customize reminder intervals from the UI by selecting from preset options:
- 10 minutes
- 20 minutes (recommended for screen rest - 20-20-20 rule)
- 30 minutes
- 45 minutes
- 60 minutes
- 90 minutes
- 120 minutes

## Health Tips

### 💧 Hydration
Drink at least 8 glasses of water throughout the day. Keep a water bottle at your desk.

### ☕ Breaks
Follow the Pomodoro Technique: 25 minutes of focused work, 5-minute break.

### 🚶 Movement
Stand up and walk for at least 2-5 minutes every hour to improve circulation and reduce sedentary time.

### 👁️ Eye Care
Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.

## Future Enhancements

- User authentication and profiles
- Reminder history and statistics
- Daily/weekly health reports
- Integration with fitness trackers
- Desktop notifications
- Mobile app version
- Streak tracking and gamification
- Team challenges for workplaces

## License

MIT License - feel free to use and modify for your needs!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for healthier coding sessions
