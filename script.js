// Element references
const buttons = {
  pinky: document.getElementById('pinky-button'),
  brain: document.getElementById('brain-button'),
  track: document.getElementById('track-button'),
};

const times = {
  pinky: document.getElementById('pinky-time'),
  brain: document.getElementById('brain-time'),
  track: document.getElementById('track-time'),
};

let startTimes = {
  pinky: null,
  brain: null,
  track: null,
};

// Event listener setup
Object.keys(buttons).forEach(key => {
  buttons[key].addEventListener('click', () => {
    toggleTimer(key);
  });
});

// Toggle timer function
function toggleTimer(key) {
  if (startTimes[key]) {
    buttons[key].innerHTML = 'Restart';
    buttons[key].classList.remove('stop');
    startTimes[key] = null;
  } else {
    startTimes[key] = new Date().getTime();
  }
}

// Update timer intervals
setInterval(() => {
  const now = new Date().getTime();
  
  Object.keys(startTimes).forEach(key => {
    if (startTimes[key]) {
      buttons[key].innerHTML = "Stop";
      buttons[key].classList.add('stop');
      
      const timeElapsed = now - startTimes[key];
      const timeInfo = getTimeInfo(timeElapsed);
      
      times[key].innerHTML = formatTime(timeInfo);
    }
  });
}, 1000);

// Get time info
function getTimeInfo(time) {
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

// Format time for display
function formatTime({ hours, minutes, seconds }) {
  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  } else if (minutes) {
    return `${minutes}:${seconds}`;
  } else {
    return `${seconds}`;
  }
}