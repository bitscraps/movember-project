var video = document.querySelector('video');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var tache = document.querySelector('#mostacheimage');
var localMediaStream = null;

function hasGetUserMedia() {
  // Note: Opera is unprefixed.
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var onFailSoHard = function(e) {
  console.log('Reeeejected!', e);
};

if (hasGetUserMedia()) {
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

const constraints = {
  audio: false,
  video: true
};

  if (navigator.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

  } else {
    console.log('fallback fail');
  }
} else {
  alert('getUserMedia() is not supported in your browser');
}

function toCanvas() {
  console.log("toCanvas");

  
  ctx.drawImage(video, -640, 0); 
  ctx.drawImage(tache, -480, 200);

}

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;

  ctx.scale(-1, 1);
      setInterval(function(){toCanvas();}, 50);
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function saveImage() {
	document.querySelector('#capture').src = canvas.toDataURL('image/webp');
	document.querySelector('#capture').className = "popup show";
}