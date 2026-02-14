# Quick Start Guide - Wellbeing Reminder App

This guide will help you get the Wellbeing Reminder App up and running on your machine or in GitHub Codespaces.

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Option 1: Running in GitHub Codespaces (Recommended)

GitHub Codespaces provides a complete development environment in the cloud.

### Steps:

1. **Open in Codespaces**
   - Navigate to the repository on GitHub
   - Click the "Code" button
   - Select "Open with Codespaces"
   - Click "New codespace"

2. **Start the Backend**
   ```bash
   cd wellbeing-app/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py populate_reminders
   python manage.py runserver 0.0.0.0:8000
   ```

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd wellbeing-app/frontend
   npm install
   npm start
   ```

4. **Access the App**
   - Codespaces will automatically forward ports 3000 and 8000
   - Click on the "Ports" tab and open port 3000 in your browser
   - The app will be running at the provided URL

## Option 2: Running Locally

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd wellbeing-app/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Populate initial data:
   ```bash
   python manage.py populate_reminders
   ```

6. Start the Django server:
   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
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

   The app will automatically open in your browser at `http://localhost:3000/`

## Using the App

### Setting Up Your Reminders

1. **View Active Reminders**
   - The app displays all available reminder types on the main page
   - Each reminder shows its icon, name, description, and current settings

2. **Toggle Reminders On/Off**
   - Use the toggle switch next to each reminder
   - Green = Active, Gray = Paused
   - Only active reminders will send notifications

3. **Customize Intervals**
   - Click the dropdown menu under each reminder
   - Select from preset intervals:
     - 10 minutes
     - 20 minutes (recommended for screen rest)
     - 30 minutes
     - 45 minutes
     - 1 hour
     - 1.5 hours
     - 2 hours

4. **Receive Notifications**
   - Notifications appear as toast messages in the top-right corner
   - They include the reminder icon and description
   - Notifications auto-dismiss after 8 seconds
   - You can manually close them by clicking the X button

### Reminder Types Explained

#### 💧 Water (Default: 60 minutes)
Stay hydrated throughout your coding session. Dehydration can lead to fatigue and decreased concentration.

**Tip**: Keep a water bottle at your desk and aim for 8 glasses per day.

#### ☕ Break (Default: 90 minutes)
Take short mental breaks from focused work to maintain productivity and avoid burnout.

**Tip**: Use the Pomodoro Technique - 25 minutes of work followed by a 5-minute break.

#### 🚶 Walk (Default: 2 hours)
Get up and move around to improve circulation and reduce the health risks of prolonged sitting.

**Tip**: Walk around your office, do some stretches, or climb a flight of stairs.

#### 👁️ Screen Rest (Default: 20 minutes)
Follow the 20-20-20 rule to reduce eye strain and prevent computer vision syndrome.

**Tip**: Every 20 minutes, look at something 20 feet away for at least 20 seconds.

## Admin Interface

Django provides an admin interface to manage reminders directly.

1. Create a superuser account:
   ```bash
   cd wellbeing-app/backend
   source venv/bin/activate
   python manage.py createsuperuser
   ```

2. Access the admin panel:
   - Navigate to `http://localhost:8000/admin/`
   - Log in with your superuser credentials
   - You can view and edit reminder types, user reminders, and logs

## Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError` or import errors
- **Solution**: Make sure you activated the virtual environment and installed all dependencies

**Problem**: Database errors
- **Solution**: Delete `db.sqlite3` and run migrations again:
  ```bash
  rm db.sqlite3
  python manage.py migrate
  python manage.py populate_reminders
  ```

**Problem**: CORS errors in browser console
- **Solution**: Check that CORS is properly configured in `settings.py`

### Frontend Issues

**Problem**: `npm install` fails
- **Solution**: Make sure you have Node.js 14+ installed. Try clearing npm cache:
  ```bash
  npm cache clean --force
  npm install
  ```

**Problem**: API connection errors
- **Solution**: 
  1. Verify the backend is running on port 8000
  2. Check the `.env` file has the correct API URL
  3. For Codespaces, the URL should be: `https://CODESPACE_NAME-8000.app.github.dev/api`

**Problem**: Notifications not appearing
- **Solution**:
  1. Check browser console for JavaScript errors
  2. Verify reminders are toggled to "Active"
  3. Make sure the browser allows notifications from the app

## API Endpoints Reference

### Reminder Types
- `GET /api/reminder-types/` - List all available reminder types

### User Reminders
- `GET /api/user-reminders/` - List all user reminders
- `GET /api/user-reminders/active/` - Get only active reminders
- `GET /api/user-reminders/{id}/` - Get specific reminder
- `PATCH /api/user-reminders/{id}/` - Update reminder (interval, is_active)
- `DELETE /api/user-reminders/{id}/` - Delete reminder

### Reminder Logs
- `GET /api/reminder-logs/` - List all logs
- `GET /api/reminder-logs/recent/` - Get recent logs
- `POST /api/reminder-logs/` - Create new log entry
- `POST /api/reminder-logs/{id}/acknowledge/` - Mark log as acknowledged

## Next Steps

### Customization Ideas

1. **Add Sound Notifications**
   - Use the Web Audio API to play sounds with reminders

2. **Add User Authentication**
   - Implement user accounts to save preferences
   - Track personal health statistics

3. **Add More Reminder Types**
   - Posture check
   - Meal reminders
   - Meditation breaks
   - Stand-up desk reminders

4. **Statistics Dashboard**
   - Track how many reminders you've followed
   - View health streaks
   - Generate weekly/monthly reports

5. **Desktop Notifications**
   - Use browser's Notification API for system-level alerts
   - Add notification sounds

6. **Mobile App**
   - Build a React Native version
   - Add mobile push notifications

## Support

For issues or questions:
1. Check the main README.md
2. Review the code documentation
3. Open an issue on GitHub

---

**Remember**: This app is designed to help you maintain healthy work habits. Listen to your body and adjust the intervals to match your personal needs. Stay healthy while coding! 🌟
