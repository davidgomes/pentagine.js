var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.width = canvas.width;
context.height = canvas.height;
context.globalCompositeOperation = "destination-over";

var currentState = switchState(playState);

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
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.stroke();
}

function clearCanvas() {
  context.clearRect(0, 0, context.width, context.height);
}

/*************************************** SPRITE */
function Sprite(image, x, y) {
  this.image = new Image();
  this.image.src = image;
  this.x = x;
  this.y = y;

  this.draw = function() {
    context.drawImage(this.image, this.x, this.y);
  }
}

/*************************************** INPUT */
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

var keyCodeToString = [];
keyCodeToString[8] = "backspace";
keyCodeToString[9] = "tab";
keyCodeToString[13] = "enter";
keyCodeToString[16] = "shift";
keyCodeToString[17] = "ctrl";
keyCodeToString[18] = "alt";
keyCodeToString[19] = "pause";
keyCodeToString[20] = "capslock";
keyCodeToString[27] = "esc";
keyCodeToString[32] = "space";
keyCodeToString[33] = "pageup";
keyCodeToString[34] = "pagedown";
keyCodeToString[35] = "end";
keyCodeToString[36] = "home";
keyCodeToString[37] = "left";
keyCodeToString[38] = "up";
keyCodeToString[39] = "right";
keyCodeToString[40] = "down";
keyCodeToString[45] = "insert";
keyCodeToString[46] = "delete";

keyCodeToString[91] = "leftwindowkey";
keyCodeToString[92] = "rightwindowkey";
keyCodeToString[93] = "selectkey";
keyCodeToString[106] = "multiply";
keyCodeToString[107] = "add";
keyCodeToString[109] = "subtract";
keyCodeToString[110] = "decimalpoint";
keyCodeToString[111] = "divide";

keyCodeToString[144] = "numlock";
keyCodeToString[145] = "scrollock";
keyCodeToString[186] = "semicolon";
keyCodeToString[187] = "equalsign";
keyCodeToString[188] = "comma";
keyCodeToString[189] = "dash";
keyCodeToString[190] = "period";
keyCodeToString[191] = "forwardslash";
keyCodeToString[192] = "graveaccent";
keyCodeToString[219] = "openbracket";
keyCodeToString[220] = "backslash";
keyCodeToString[221] = "closebracket";
keyCodeToString[222] = "singlequote";

var numpadkeys = ["numpad1", "numpad2", "numpad3", "numpad4", "numpad5", "numpad6", "numpad7", "numpad8", "numpad9"];
var fkeys = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

for (var i = 0; numbers[i]; i++) { keyCodeToString[48 + i] = numbers[i]; }
for (var i = 0; letters[i]; i++) { keyCodeToString[65 + i] = letters[i]; }
for (var i = 0; numpadkeys[i]; i++) { keyCodeToString[96 + i] = numpadkeys[i]; }
for (var i = 0; fkeys[i]; i++) { keyCodeToString[112 + i] = fkeys[i]; }

var pressedKeys = [];
var preventedKeys = [];

function preventKeys(keys) {
  preventedKeys = keys;
}

function handleKeyDown(e) {
  var event = (e) ? e : window.event;
  var name = keyCodeToString[event.keyCode];
  pressedKeys[name] = true;

  if (preventedKeys[name])
    e.preventDefault();
}

function handleKeyUp(e) {
  var event = (e) ? e : window.event;
  var name = keyCodeToString[event.keyCode];
  pressedKeys[name] = false;

  if (preventedKeys[name])
    e.preventDefault();
}

function isDown(name) {
  if (pressedKeys[name])
    return true;
}
