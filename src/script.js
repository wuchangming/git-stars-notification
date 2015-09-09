
var canvas;
var canvasContext;
var loggedInImage;
var requestFailureCount = 0;  // used for exponential backoff
var requestTimeout = 1000 * 2;  // 5 seconds

var unreadCount = "";
var loadingAnimation = new LoadingAnimation();
var icon_url = '';


// A "loading" animation displayed while we wait for the first response from
// Gmail. This animates the badge text with a dot that cycles from left to
// right.


function isInit() {
	if(typeof(localStorage.email)=="undefined" || localStorage.email.length<6)
	return false;

	if(typeof(localStorage.password)=="undefined" || localStorage.password.length<6)
	return false;

	return true;
}

function init() {
	canvas = document.getElementById('canvas');
	loggedInImage = document.getElementById('logged_in');
	canvasContext = canvas.getContext('2d');

	unreadCount = "";

	startRequest();
	scheduleRequest();
}

function scheduleRequest() {
	window.setTimeout(startRequest, 1000 * 60);
}

function startRequest() {

	githubStars("WQTeam/web-storage-cache", function(stars) {
	    updateUnreadCount(stars);
	});

}

function updateUnreadCount(count) {
	count = count + '';
	if (unreadCount != count) {
		unreadCount = count;
		animateFlip();
	}
}

document.addEventListener('DOMContentLoaded', function() {
	init();
});
