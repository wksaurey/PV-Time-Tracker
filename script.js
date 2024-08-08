// Element references
const buttons = {
	pinky: {
		start: document.getElementById('pinky-button'),
		stop: document.createElement('button'),
		restart: document.createElement('button'),
		continue: document.createElement('button')
	},
	brain: {
		start: document.getElementById('brain-button'),
		stop: document.createElement('button'),
		restart: document.createElement('button'),
		continue: document.createElement('button')
	},
	track: {
		start: document.getElementById('track-button'),
		stop: document.createElement('button'),
		restart: document.createElement('button'),
		continue: document.createElement('button')
	}
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

let pausedDurations = {
	pinky: 0,
	brain: 0,
	track: 0,
};

let intervals = {};

// Initialize buttons
Object.keys(buttons).forEach(key => {
	// Initialize stop button
	buttons[key].stop.innerHTML = 'Stop';
	buttons[key].stop.classList.add('stop');

	// Initialize restart button
	buttons[key].restart.innerHTML = 'Restart';
	buttons[key].restart.classList.add('restart');

	// Initialize continue button
	buttons[key].continue.innerHTML = 'Continue';
	buttons[key].continue.classList.add('continue');

	// Set initial visibility
	buttons[key].start.style.display = 'block';
	buttons[key].stop.style.display = 'none';
	buttons[key].restart.style.display = 'none';
	buttons[key].continue.style.display = 'none';

	// Append new buttons to the DOM
	// Append new buttons to the DOM
	document.getElementById(`${key}-buttons`).appendChild(buttons[key].stop);
	document.getElementById(`${key}-buttons`).appendChild(buttons[key].restart);
	document.getElementById(`${key}-buttons`).appendChild(buttons[key].continue);

	// Add event listeners
	buttons[key].start.addEventListener('click', () => startTimer(key));
	buttons[key].stop.addEventListener('click', () => stopTimer(key));
	buttons[key].restart.addEventListener('click', () => resetTimer(key));
	buttons[key].continue.addEventListener('click', () => continueTimer(key));
});

// Start timer
function startTimer(key) {
	startTimes[key] = new Date().getTime();
	intervals[key] = setInterval(() => updateTimer(key), 1000);

	buttons[key].start.style.display = 'none';
	buttons[key].stop.style.display = 'block';
	buttons[key].restart.style.display = 'none';
	buttons[key].continue.style.display = 'none';
}

// Stop timer
function stopTimer(key) {
	clearInterval(intervals[key]);
	pausedDurations[key] = new Date().getTime() - startTimes[key];

	buttons[key].start.style.display = 'none';
	buttons[key].stop.style.display = 'none';
	buttons[key].restart.style.display = 'block';
	buttons[key].continue.style.display = 'block';
}

// Reset timer
function resetTimer(key) {
	clearInterval(intervals[key]);
	startTimes[key] = null;
	pausedDurations[key] = 0;
	times[key].innerHTML = '00:00:00';

	buttons[key].start.style.display = 'block';
	buttons[key].stop.style.display = 'none';
	buttons[key].restart.style.display = 'none';
	buttons[key].continue.style.display = 'none';
}

// Continue timer
function continueTimer(key) {
	startTimes[key] = new Date().getTime() - pausedDurations[key];
	intervals[key] = setInterval(() => updateTimer(key), 1000);

	buttons[key].start.style.display = 'none';
	buttons[key].stop.style.display = 'block';
	buttons[key].restart.style.display = 'none';
	buttons[key].continue.style.display = 'none';
}

// Update timer display
function updateTimer(key) {
	const timeElapsed = getElapsedTime(key);
	const timeInfo = getTimeInfo(timeElapsed);

	times[key].innerHTML = formatTime(timeInfo);
}

// Get elapsed time
function getElapsedTime(key) {
	return new Date().getTime() - startTimes[key];
}

// Get time info
function getTimeInfo(time) {
	const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((time % (1000 * 60)) / 1000);

	return { hours, minutes, seconds };
}

// Format time for display
function formatTime({ hours, minutes, seconds }) {
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}