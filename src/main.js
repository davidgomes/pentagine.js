function init() {
  lastUpdate = Date.now();

  if (desiredFPS) {
    var myInterval = setInterval(tick, 1 / desiredFPS * 1000);
  } else {
    setInterval(tick, 0);
  }
}

function tick() {
  var currentTime = Date.now();
  var dt = currentTime - lastUpdate;
  lastUpdate = currentTime;
  currentState.dt = dt * 0.001;
  stats.begin();

  if (gamePaused) {
    currentState.draw();

    if (isDown(pauseKey)) {
      pauseOrResumeGame();
    }

    // TODO Draw Pause/Play huge icon over the game
  } else {
    if (isDown(pauseKey)) {
      pauseOrResumeGame();
    }

    currentState.update();
    currentState.draw();
  }

  stats.end();
}

pauseOrResumeGame = function() {
  if (canPauseOrResume) {
    gamePaused = !gamePaused;

    setTimeout(function() {
      canPauseOrResume = true;
    }, 1000);

    canPauseOrResume = false;
  }
}

switchState = function(newState) {
  if (!currentState) {
    init();
  }

  if (!newState.camera) {
    newState.camera = new Camera(0, 0, context.width, context.height);
  }

  newState.setup();
  return currentState = newState;
};

var sharedCanvases = {};

var currentState = null;
var lastUpdate = null;
var desiredFPS = null;

var currentFont = "10px serif";

var pauseKey = "p";
var canPauseOrResume = true;
var gamePaused = false;

var stats;
var canvas, context;

window.onload = function() {
  /* Load the canvas */
  canvas = document.getElementById("canvas");
  context = null;
  if (typeof canvas != "undefined") {
    context = canvas.getContext("2d");
    context.width = canvas.width;
    context.height = canvas.height;
  }

  /* Use stats.js for awesome stats */
  stats = new Stats();
  stats.setMode(2);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "800px";
  stats.domElement.style.top = "0px";

  document.body.appendChild(stats.domElement);
};
