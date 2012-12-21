var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var sharedCanvases = {};
context.width = canvas.width;
context.height = canvas.height;
context.globalCompositeOperation = "destination-over";

var currentState = null;

var pauseKey = "p";
var canPauseOrResume = true;
var gamePaused = false;

var radToDeg = 180 / Math.PI;
var degToRad = Math.PI / 180;

function init() {
  setInterval(tick, 100);
  // var date = new Date();
  // var oldTime = date.getTime();
  // var time = oldTime + 60;

  // while (true) {
    // currentTime = date.getTime();
    // tick(currentTime - oldTime);
    // tick(1);
    // tick();
    // oldTime = currentTime;
  // }


}

function tick(dt) {
  if (gamePaused) {
    currentState.draw();

    if (isDown(pauseKey))
      pauseOrResumeGame();

    // TODO Draw Pause/Play huge icon on top
  } else {
    if (isDown(pauseKey))
      pauseOrResumeGame();

    currentState.update(dt);
    currentState.draw();
  }
}

function pauseOrResumeGame() {
  if (canPauseOrResume) {
    gamePaused = !gamePaused;

    setTimeout(function() {
      canPauseOrResume = true;
    }, 1000);

    canPauseOrResume = false;
  }
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

function drawRectangle(x, y, width, height, color) {
  if (color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.fillStyle = "#FFFFFF";
  } else {
    context.fillRect(x, y, width, height);
  }
}

function clearCanvas() {
  context.clearRect(0, 0, context.width, context.height);
}

/*************************************** SPRITE */
Sprite = (function() {
  function constructor(image, x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.path = image;

    if (!image) {
      this.shared = true;
      this.loaded = true;
      console.log("Attempted to load null image.");
      return;
    }

    /* Try to retrieve a shared canvas instead of generating a new one */
    this.shared = true;
    if (this.path in sharedCanvases) {
      console.log("Loaded shared canvas.");
      var shared = sharedCanvases[this.path];
      this.internal = shared[0];
      this.internalctx = shared[1];
      this.loaded = shared[2].loaded;

      if (!this.loaded) {
        this.pending = [];
        shared[3].push(this);
      }
    } else {
      console.log("Loaded fresh canvas.");
      this.image = new Image();
      this.image.src = image;
      this.image.owner = this;
      this.loaded = false;
      this.pending = [];

      /* Cache image modifications to an internal canvas for performance and flexibility */
      this.internal = document.createElement("canvas");
      this.internalctx = this.internal.getContext("2d");

      /* Save the canvas to the global shared canvas map */
      sharedCanvases[this.path] = [this.internal, this.internalctx, this, []];

      /* Asynchronous image loading and caching */
      this.image.onload = function() {
        this.owner.internal.width = this.width.toString();
        this.owner.internal.height = this.height.toString();
        this.owner.internalctx.drawImage(this, 0, 0);

        /* Dump image reference, we no longer need it */
        delete this.owner.image;
        this.owner.loaded = true;
        this.owner.dispatchPending();

        /* Set all dependencies to loaded */
        var deps = sharedCanvases[this.owner.path][3];
        for (var i = 0; i < deps.length; i++) {
          deps[i].loaded = true;
          deps[i].dispatchPending();
        }
      }
    }
  }

  constructor.prototype = {
    draw: function() {
      // TODO: how about caching rotated sprites on their internal canvas?
      if (this.angle) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle * degToRad);
        context.translate(-this.x, -this.y);
      }

      context.drawImage(this.internal, this.x, this.y);

      if (this.angle) {
        context.restore();
      }
    },

    makeGraphic: function(width, height, color) {
      if (this.shared) {
        this.releaseShared();
      }

      var ws = width.toString();
      var hs = height.toString();

      if (ws != this.internal.width && hs != this.internal.height) {
        this.internal.width = ws;
        this.internal.height = hs;
      }

      this.stampRect(0, 0, width, height, color);
    },

    makeLabel: function(text, size, font, color) {
      if (this.shared) {
        this.releaseShared();
      }

      this.internalctx.font = size + "px " + font;
      var metrics = this.internalctx.measureText(text);
      // TODO: figure out actual height instead of 2 * size (see stampText TODO)
      this.makeGraphic(metrics.width, size * 2, "rgba(0, 0, 0, 0)");
      this.stampText(0, 0, text, size, font, color);
    },

    stampText: function(x, y, text, size, font, color) {
      // TODO: write small function to extract and cache ACTUAL font height
      if (!this.loaded) {
        console.log("Queued text.");
        this.pending.push([this.stampText, x, y, text, font, size, color]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        console.log("Drawing text.");
        this.internalctx.font = size + "px " + font
        this.internalctx.textAlign = "left";
        this.internalctx.fillStyle = color;
        this.internalctx.fillText(text, x, y + size);
      }
    },

    stampRect: function(x, y, width, height, color) {
      if (!this.loaded) {
        console.log("Queued rect.");
        this.pending.push([this.stampRect, x, y, width, height, color]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        this.internalctx.fillStyle = color;
        this.internalctx.fillRect(x, y, width, height);
      }
    },

    dispatchPending: function() {
      /* Dispatch all pending sprite modifications */
      var pending = this.pending;
      for (var i = 0; i < pending.length; i++) {
        console.log("Dispatched pending.");
        pending[i][0].apply(this, Array.prototype.slice.call(pending[i], 1));
      }

      delete this.pending;
    },

    releaseShared: function() {
      /* Stop using the shared version of the internal canvas, we probably
       * need a dinamically modified sprite */
      var newInternal = document.createElement("canvas");
      this.internalctx = newInternal.getContext("2d");

      if (this.path) {
        newInternal.width = this.internal.width.toString();
        newInternal.height = this.internal.height.toString();
        this.internalctx.drawImage(sharedCanvases[this.path][0], 0, 0);
      }

      this.internal = newInternal;
      this.shared = false;
      console.log("Released shared canvas.");
    }
  }

  return constructor;
})();

SpriteList = (function() {
  function constructor() {
    this.sprites = [];
  }

  constructor.prototype = {
    draw: function() {
      for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].draw();
      }
    },

    push: function(newSprite) {
      this.sprites.push(newSprite);
    }
  }

  return constructor;
})();

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
}

function isMouseDown(name) {
  if (pressedButtons[name])
    return true;

  return false;
}
