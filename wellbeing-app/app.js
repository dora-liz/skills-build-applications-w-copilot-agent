// Timer state
let timerInterval = null;
let timeLeft = 20 * 60; // 20 minutes in seconds
let isRunning = false;
let isPaused = false;

// Stats
let breaksCompleted = 0;
let totalMinutesWorked = 0;

// DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const breakModal = document.getElementById('breakModal');
const closeModalBtn = document.getElementById('closeModal');
const notificationSound = document.getElementById('notificationSound');
const breaksCompletedDisplay = document.getElementById('breaksCompleted');
const totalTimeDisplay = document.getElementById('totalTime');

// Load saved stats from localStorage
function loadStats() {
    const savedBreaks = localStorage.getItem('breaksCompleted');
    const savedTime = localStorage.getItem('totalMinutesWorked');
    const savedDate = localStorage.getItem('statsDate');
    const today = new Date().toDateString();

    // Reset stats if it's a new day
    if (savedDate !== today) {
        localStorage.setItem('statsDate', today);
        localStorage.setItem('breaksCompleted', '0');
        localStorage.setItem('totalMinutesWorked', '0');
        breaksCompleted = 0;
        totalMinutesWorked = 0;
    } else {
        breaksCompleted = parseInt(savedBreaks) || 0;
        totalMinutesWorked = parseInt(savedTime) || 0;
    }

    updateStatsDisplay();
}

// Save stats to localStorage
function saveStats() {
    localStorage.setItem('breaksCompleted', breaksCompleted.toString());
    localStorage.setItem('totalMinutesWorked', totalMinutesWorked.toString());
}

// Update stats display
function updateStatsDisplay() {
    breaksCompletedDisplay.textContent = breaksCompleted;
    totalTimeDisplay.textContent = totalMinutesWorked;
}

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Start timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        isPaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                timerComplete();
            }
        }, 1000);
    }
}

// Pause timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        startBtn.textContent = 'Resume';
    }
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    timeLeft = 20 * 60;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.textContent = 'Start Timer';
}

// Timer complete - show break reminder
function timerComplete() {
    clearInterval(timerInterval);
    isRunning = false;

    // Update stats
    breaksCompleted++;
    totalMinutesWorked += 20;
    updateStatsDisplay();
    saveStats();

    // Play notification sound
    playNotificationSound();

    // Show modal
    showBreakModal();

    // Reset timer for next session
    timeLeft = 20 * 60;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.textContent = 'Start Timer';

    // Request browser notification permission
    requestNotificationPermission();
}

// Play notification sound
function playNotificationSound() {
    notificationSound.play().catch(err => {
        console.log('Could not play notification sound:', err);
    });
}

// Show break modal
function showBreakModal() {
    breakModal.classList.add('active');
}

// Close break modal
function closeBreakModal() {
    breakModal.classList.remove('active');
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Show browser notification
function showBrowserNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('Time for a Break! 🧘', {
            body: 'You\'ve been working for 20 minutes. Time to walk around and look away from the screen!',
            icon: '🧘',
            badge: '⏰',
            vibrate: [200, 100, 200],
            requireInteraction: true
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
closeModalBtn.addEventListener('click', closeBreakModal);

// Close modal when clicking outside
breakModal.addEventListener('click', (e) => {
    if (e.target === breakModal) {
        closeBreakModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isRunning) {
        e.preventDefault();
        startTimer();
    } else if (e.code === 'Space' && isRunning) {
        e.preventDefault();
        pauseTimer();
    } else if (e.code === 'KeyR' && e.ctrlKey) {
        e.preventDefault();
        resetTimer();
    } else if (e.code === 'Escape') {
        closeBreakModal();
    }
});

// Request notification permission on load
window.addEventListener('load', () => {
    requestNotificationPermission();
});

// Initialize
loadStats();
updateDisplay();

// Add visibility change handler to pause timer when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning) {
        // Optionally pause when tab is hidden
        // pauseTimer();
    }
});

// Show browser notification when timer completes
const originalTimerComplete = timerComplete;
timerComplete = function() {
    originalTimerComplete();
    showBrowserNotification();
};
