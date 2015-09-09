
var canvas;
var canvasContext;
var loggedInImage;
var requestFailureCount = 0;  // used for exponential backoff

var unreadCount = "";
var loadingAnimation = new LoadingAnimation();
var icon_url = '';


// A "loading" animation displayed while we wait for the first response from
// Gmail. This animates the badge text with a dot that cycles from left to
// right.


function init() {
	canvas = document.getElementById('canvas');
	loggedInImage = document.getElementById('logged_in');
	canvasContext = canvas.getContext('2d');

	unreadCount = "";

	startRequest();
	scheduleRequest();
}

function scheduleRequest() {
	window.setInterval(startRequest, 1000 * 60);
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

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	startRequest();
});

document.addEventListener('DOMContentLoaded', function() {
	init();
});
