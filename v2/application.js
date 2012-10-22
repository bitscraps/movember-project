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

  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: false, video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.width = 640;
      video.height = 480
      ctx.scale(-1, 1);
      setInterval(function(){toCanvas();}, 50);
      localMediaStream = stream;
    }, onFailSoHard);
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

function saveImage() {
	document.querySelector('#capture').src = canvas.toDataURL('image/webp');
	document.querySelector('#capture').className = "popup show";
}