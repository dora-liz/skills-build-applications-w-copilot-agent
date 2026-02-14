import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
  const [userReminders, setUserReminders] = useState([]);
  const [activeTimers, setActiveTimers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserReminders();
  }, []);

  const fetchUserReminders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user-reminders/active/`);
      setUserReminders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast.error('Failed to load reminders');
      setLoading(false);
    }
  };

  useEffect(() => {
    const timers = {};
    
    userReminders.forEach(reminder => {
      if (reminder.is_active) {
        const intervalMs = reminder.interval * 60 * 1000;
        
        timers[reminder.id] = setInterval(() => {
          showReminder(reminder);
        }, intervalMs);
      }
    });

    setActiveTimers(timers);

    return () => {
      Object.values(timers).forEach(timer => clearInterval(timer));
    };
  }, [userReminders]);

  const showReminder = async (reminder) => {
    const { reminder_type_detail } = reminder;
    
    toast.info(
      <div>
        <h4>{reminder_type_detail.icon} {reminder_type_detail.name}</h4>
        <p>{reminder_type_detail.description}</p>
      </div>,
      {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );

    try {
      await axios.post(`${API_BASE_URL}/reminder-logs/`, {
        reminder_type: reminder_type_detail.id,
        acknowledged: false
      });
    } catch (error) {
      console.error('Error logging reminder:', error);
    }
  };

  const toggleReminder = async (reminderId, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/user-reminders/${reminderId}/`, {
        is_active: !currentStatus
      });
      fetchUserReminders();
      toast.success(!currentStatus ? 'Reminder activated' : 'Reminder paused');
    } catch (error) {
      console.error('Error updating reminder:', error);
      toast.error('Failed to update reminder');
    }
  };

  const updateInterval = async (reminderId, newInterval) => {
    try {
      await axios.patch(`${API_BASE_URL}/user-reminders/${reminderId}/`, {
        interval: parseInt(newInterval)
      });
      fetchUserReminders();
      toast.success('Interval updated');
    } catch (error) {
      console.error('Error updating interval:', error);
      toast.error('Failed to update interval');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ToastContainer />
      
      <header className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <h1 className="display-4">🌟 Wellbeing Reminder App</h1>
          <p className="lead">Stay healthy while coding! Get reminders for water, breaks, walks, and screen rest.</p>
        </div>
      </header>

      <main className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title mb-4">Your Reminders</h2>
                
                {userReminders.length === 0 ? (
                  <p className="text-muted">No reminders configured yet.</p>
                ) : (
                  <div className="list-group">
                    {userReminders.map(reminder => (
                      <div key={reminder.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <span className="fs-2 me-3">{reminder.reminder_type_detail.icon}</span>
                            <div>
                              <h5 className="mb-1">{reminder.reminder_type_detail.name}</h5>
                              <p className="mb-0 text-muted small">{reminder.reminder_type_detail.description}</p>
                            </div>
                          </div>
                          
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`switch-${reminder.id}`}
                              checked={reminder.is_active}
                              onChange={() => toggleReminder(reminder.id, reminder.is_active)}
                            />
                            <label className="form-check-label" htmlFor={`switch-${reminder.id}`}>
                              {reminder.is_active ? 'Active' : 'Paused'}
                            </label>
                          </div>
                        </div>
                        
                        <div className="d-flex align-items-center mt-3">
                          <label className="me-2 small">Interval:</label>
                          <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto' }}
                            value={reminder.interval}
                            onChange={(e) => updateInterval(reminder.id, e.target.value)}
                          >
                            <option value="10">10 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card shadow mt-4">
              <div className="card-body">
                <h3 className="card-title">About This App</h3>
                <p>
                  This wellbeing app is designed specifically for software engineers and developers
                  who spend long hours in front of screens. It helps you maintain a healthy work-life
                  balance by reminding you to:
                </p>
                <ul>
                  <li><strong>💧 Drink Water:</strong> Stay hydrated throughout the day</li>
                  <li><strong>☕ Take Breaks:</strong> Give your mind a rest from focused work</li>
                  <li><strong>🚶 Walk Around:</strong> Stretch your legs and improve circulation</li>
                  <li><strong>👁️ Rest Your Eyes:</strong> Follow the 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds)</li>
                </ul>
                <p className="mb-0">
                  Customize the intervals for each reminder to match your work routine and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-muted py-4 mt-5">
        <div className="container">
          <p>Made with ❤️ for healthier coding sessions</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
