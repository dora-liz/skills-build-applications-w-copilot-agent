# 🧘 Engineer Wellbeing Timer

A simple, focused mental wellbeing application designed specifically for engineers. This app helps you maintain healthy work habits by reminding you to take regular breaks every 20 minutes.

## 🎯 Purpose

Engineers often get deeply focused on their work and forget to take breaks. This can lead to:
- Eye strain from continuous screen time
- Physical discomfort from prolonged sitting
- Mental fatigue and reduced productivity
- Stress and burnout

This app implements the **Pomodoro Technique** adapted for engineer wellbeing with a 20-minute timer that reminds you to:
- 🚶 Take a short walk
- 👀 Look away from the screen (following the 20-20-20 rule)
- 💧 Stay hydrated
- 🧘 Stretch and reset

## ✨ Features

- **20-Minute Timer**: Countdown timer set to 20 minutes for optimal focus periods
- **Break Reminders**: Visual and audio notifications when it's time for a break
- **Daily Statistics**: Track your breaks taken and total minutes worked
- **Break Suggestions**: Helpful tips for making the most of your break time
- **Browser Notifications**: Get notified even when the tab is not active
- **Keyboard Shortcuts**: Quick controls for power users
- **Persistent Stats**: Your daily stats are saved and automatically reset each day
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 How to Use

### Simple Setup (No Installation Required)

1. **Open the app**: Simply open `index.html` in your web browser
   - Double-click the file, or
   - Right-click and select "Open with" your preferred browser

2. **Start the timer**: Click the "Start Timer" button

3. **Work focused**: Focus on your work for the next 20 minutes

4. **Take a break**: When the timer completes, you'll see a modal with break suggestions

5. **Repeat**: Start another 20-minute session when you're ready

### Using a Local Server (Optional)

If you prefer to run it on a local server:

```bash
# Navigate to the wellbeing-app directory
cd wellbeing-app

# Using Python 3
python3 -m http.server 8080

# Or using Node.js (if you have npx installed)
npx http-server -p 8080

# Or using PHP
php -S localhost:8080
```

Then open your browser and navigate to `http://localhost:8080`

## ⌨️ Keyboard Shortcuts

- **Space**: Start/Pause timer
- **Ctrl + R**: Reset timer
- **Esc**: Close break reminder modal

## 📊 Statistics

The app tracks your daily progress:
- **Breaks Taken**: Number of 20-minute sessions completed today
- **Minutes Worked**: Total focused work time today

Stats automatically reset at midnight each day.

## 🎨 Customization

You can easily customize the app by editing:

- **Timer Duration**: Modify `timeLeft = 20 * 60` in `app.js` (value is in seconds)
- **Colors**: Update CSS variables in `styles.css` under `:root`
- **Break Suggestions**: Edit the tips list in `index.html`

### Example: Change to 25-minute Pomodoro

```javascript
// In app.js, change both occurrences:
let timeLeft = 25 * 60; // Change from 20 to 25 minutes

// And in resetTimer() and timerComplete():
timeLeft = 25 * 60;
```

## 🌟 Best Practices

1. **Use Regularly**: Make it a habit to start the timer when you begin working
2. **Actually Take Breaks**: Don't skip the breaks - they're essential for your wellbeing
3. **Follow Suggestions**: Try different break activities to find what works best for you
4. **Enable Notifications**: Allow browser notifications so you don't miss break reminders
5. **Stand and Move**: Use breaks to stand up and move around
6. **20-20-20 Rule**: Every 20 minutes, look at something 20 feet away for 20 seconds

## 🏥 Health Benefits

Regular breaks provide:
- **Reduced Eye Strain**: Following the 20-20-20 rule helps prevent digital eye strain
- **Better Posture**: Movement breaks reduce the risk of musculoskeletal issues
- **Increased Focus**: Short breaks improve concentration and productivity
- **Mental Clarity**: Stepping away helps solve problems with fresh perspective
- **Stress Reduction**: Regular movement and breaks reduce stress and anxiety

## 🔧 Technical Details

- **No Dependencies**: Pure HTML, CSS, and JavaScript - no frameworks needed
- **Offline Support**: Works completely offline once loaded
- **Local Storage**: Uses browser's localStorage to persist daily stats
- **Responsive**: Mobile-friendly design
- **Accessible**: Keyboard navigation support

## 📝 License

This project is designed for personal and educational use. Feel free to modify and adapt it to your needs.

## 💡 Tips for Engineers

- Keep the app open in a pinned tab
- Use it alongside your other productivity tools
- Combine with other wellbeing practices (ergonomic setup, proper lighting, etc.)
- Share it with your team to promote a healthy work culture
- Use break time to disconnect from work thoughts completely

## 🤝 Contributing

This is a simple, standalone app designed for minimal complexity. If you have suggestions for improvements while keeping it simple, feel free to:
1. Suggest features that maintain simplicity
2. Report bugs
3. Share how you've customized it for your needs

---

**Remember**: Your health and wellbeing are more important than any deadline. Take care of yourself! 💚
