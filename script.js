let pinky_button = document.getElementById('pinky-button')
let brain_button = document.getElementById('brain-button')
let track_button = document.getElementById('track-button')
let pinky_time = document.getElementById('pinky-time');
let brain_time = document.getElementById('brain-time');
let track_time = document.getElementById('track-time');

let pinky_start, 
	brain_start, 
	track_start;

pinky_button.addEventListener('click', () => {
	if (pinky_start) {
		pinky_button.innerHTML = 'Start'
		pinky_button.classList.remove('stop');
		pinky_start = null;
		pinky_time.innerHTML = 0;
	} else {
		pinky_start = new Date().getTime();
	}
})

brain_button.addEventListener('click', () => {
	brain_start = new Date().getTime();
})

track_button.addEventListener('click', () => {
	track_start = new Date().getTime();
})

var update_time_interval = setInterval(() => {
	let now = new Date().getTime();
	if (pinky_start) {
		//update buttons
		pinky_button.innerHTML = "Stop"
		pinky_button.classList.add('stop')

		// update time
		let time = now - pinky_start;
		let time_info = get_time(time);
		let hours = time_info.get('hours')
		let minutes = time_info.get('minutes')
		let seconds = time_info.get('seconds')
		if (hours) {
			pinky_time.innerHTML = `${hours}:${minutes}:${seconds}`;
		} else if (minutes) {
			pinky_time.innerHTML = `${minutes}:${seconds}`;
		} else {
			pinky_time.innerHTML = `${seconds}`;
		}
	}
	
	if (brain_start) {
		// update buttons
		brain_button.innerHTML = "Stop"

		// update time
		let time = now - brain_start;
		let time_info = get_time(time);
		let hours = time_info.get('hours')
		let minutes = time_info.get('minutes')
		let seconds = time_info.get('seconds')
		if (hours) {
			brain_time.innerHTML = `${hours}:${minutes}:${seconds}`;
		} else if (minutes) {
			brain_time.innerHTML = `${minutes}:${seconds}`;
		} else {
			brain_time.innerHTML = `${seconds}`;
		}
	}

	if (track_start) {
		// update buttons
		track_button.innerHTML = "Stop"


		// update time
		let time = now - track_start;
		let time_info = get_time(time);
		let hours = time_info.get('hours')
		let minutes = time_info.get('minutes')
		let seconds = time_info.get('seconds')
		if (hours) {
			track_time.innerHTML = `${hours}:${minutes}:${seconds}`;
		} else if (minutes) {
			track_time.innerHTML = `${minutes}:${seconds}`;
		} else {
			track_time.innerHTML = `${seconds}`;
		}
	}
}, 1000);

function get_time(time) {

	let hours = Math.floor(
	(time % (1000 * 60 * 60 * 24)) /
	(1000 * 60 * 60)
	);
	let minutes = Math.floor(
	(time % (1000 * 60 * 60)) / (1000 * 60)
	);
	let seconds = Math.floor(
	(time % (1000 * 60)) / 1000
	);
	const time_info = new Map([
	['hours', hours],
	['minutes', minutes],
	['seconds', seconds]
	])
	return time_info;
}
