var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var localMediaStream = null;

var tache = document.querySelector('#mostacheimage');

function hasGetUserMedia() {
  // Note: Opera is unprefixed.
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var onFailSoHard = function(e) {
  console.log('Reeeejected!', e);
};

function snapshot() {

    
    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
    document.querySelector('img').src = canvas.toDataURL('image/webp');
  
}

if (hasGetUserMedia()) {
  window.URL = window.URL || window.webkitURL;
	navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	video = document.querySelector('video');
	console.log(video.className);

	if (navigator.getUserMedia) {

 		console.log('load media');
  	navigator.getUserMedia({audio: false, video: true}, function(stream) {
    	video.src = window.URL.createObjectURL(stream);

      
  ctx.drawImage(tache, 200, 200);

     //redraw the video image and then flip
     ctx.scale(1.998, 1.26);
     ctx.scale(-1, 1);

      setInterval(function(){toCanvas();}, 1);
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

  ctx.drawImage(video, -640, 20); 

  document.querySelector('#show').src = canvas.toDataURL('image/webp');
}


video.addEventListener('click', snapshot, false);

