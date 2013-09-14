window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

var keyCodeToString = [];
keyCodeToString[8] = "backspace";
keyCodeToString[9] = "tab";
keyCodeToString[13] = "return";
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

var numpadKeys = ["numpad1", "numpad2", "numpad3", "numpad4", "numpad5",
                  "numpad6", "numpad7", "numpad8", "numpad9"];

var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
               "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
               "u", "v", "w", "x", "y", "z"];

for (var i = 0; numbers[i]; i++) { keyCodeToString[48 + i] = numbers[i]; }
for (var i = 0; letters[i]; i++) { keyCodeToString[65 + i] = letters[i]; }
for (var i = 0; numpadKeys[i]; i++) { keyCodeToString[96 + i] = numpadKeys[i]; }

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

  return false;
}

window.addEventListener("mousedown", handleMouseDown, false);
window.addEventListener("mouseup", handleMouseUp, false);
window.addEventListener("mousemove", handleMouseMove);

var pressedButtons = [];
var mouseX = null;
var mouseY = null;

var convertMouseButtonToString = [];
convertMouseButtonToString[0] = "left";
convertMouseButtonToString[1] = "center";
convertMouseButtonToString[2] = "right";

function handleMouseDown(e) {
  var event = (e) ? e : window.event;
  var humanName = convertMouseButtonToString[event.button];

  /*if (navigator.appName == "Microsoft Internet Explorer") {
    human_name = ie_mousebuttoncode_to_string[event.button];
    }*/

  pressedButtons[humanName] = true;

  /*if (on_keydown_callbacks[human_name]) {
    on_keydown_callbacks[human_name](human_name);
    e.preventDefault();
    }*/
}

function handleMouseUp(e) {
  var event = (e) ? e : window.event;
  var humanName = convertMouseButtonToString[event.button];

  pressedButtons[humanName] = false;
}

function handleMouseMove(e) {
  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }

  if (typeof currentState != "undefined") {
    mouseX += currentState.camera.x;
    mouseY += currentState.camera.y;
  }
}

function isMouseDown(name) {
  if (pressedButtons[name])
    return true;

  return false;
}

window.addEventListener("touchstart", handleTouchStart, false);
window.addEventListener("touchend", handleTouchEnd, false);

function handleTouchStart(e) {
  var event = (e) ? e : window.event;
  pressedButtons["left"] = true;

  mouseX = e.touches[0].pageX - canvas.offsetLeft;
  mouseY = e.touches[0].pageY - canvas.offsetTop;

  if (typeof currentState != "undefined") {
    mouseX += currentState.camera.x;
    mouseY += currentState.camera.y;
  }
}

function handleTouchEnd(e) {
  var event = (e) ? e : window.event;
  pressedButtons["left"] = false;
}
function handleTouchMove(e) {
  var event = (e) ? e window.event;
  e.stopPropagation();
  e.preventDefault();

  /* Tanslate to mouse event */
  var clickEvent = document.createEvent("MouseEvent");
  clickEvent.initMouseEvent("mousemove", true, true, window, e.detail,
                            e.touches[0].screenX, e.touches[0].screenY,
                            e.touches[0].clientX, e.touches[0].clientY,
                            false, false, false, false,
                            0, null);

  window.dispatchEvent(clickEvent);

}