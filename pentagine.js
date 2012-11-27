var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.width = canvas.width;
ctx.height = canvas.height;
ctx.globalCompositeOperation = "destination-over";

var currentState = switchState(gameState);

function init() {
  setInterval(tick, 60);
}

function tick() {
  currentState.update();
  currentState.draw();
}

function switchState(newState) {
  newState.setup();
  return currentState = newState;
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
}

/************* SPRITE CLASS *************/
function Sprite(image, x, y) {
  this.image = new Image();
  this.image.src = image;
  this.x = x;
  this.y = y;
  
  this.draw = function() {
    ctx.drawImage(this.image, this.x, this.y);
  }
}
