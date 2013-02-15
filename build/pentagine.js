Animation = (function() {
  function constructor() {

  }

  constructor.prototype = {

  };

  return constructor;
})();

function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fill();
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

function drawString(text, x, y, color, alignment) {
  if (!alignment)
    context.textAlign = "left";
  else
    context.textAlign = alignment;

  context.font = currentFont;
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function clearCanvas() {
  context.clearRect(0, 0, context.width, context.height);
}

function isOutsideOfScreen(x, y) {
  return (x < 0 || x > context.width || y < 0 || y > context.height);
}

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
    },

    remove: function(sprite) {
      var index = this.sprites.indexOf(sprite);
      this.sprites.splice(index, 1);
    }
  };

  return constructor;
})();

Camera = (function () {
  function constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  constructor.prototype = {
    follow: function() {
    }
  };

  return constructor;
})();

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

Sprite = (function() {
  function constructor(image, x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.angle = 0;
    this.path = image;
    this.offset = {x: 0, y: 0};

    if (!image) {
      this.shared = true;
      this.loaded = true;
      console.log("Attempted to load null image.");
      return;
    }

    /* Try to retrieve a shared canvas instead of generating a new one */
    this.shared = true;
    if (this.path in sharedCanvases) {
      var shared = sharedCanvases[this.path];
      this.internal = shared[0];
      this.internalctx = shared[1];
      this.loaded = shared[2].loaded;

      if (!this.loaded) {
        this.pending = [];
        shared[3].push(this);
      }
    } else {
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
        context.translate(this.x + this.offset.x - currentState.camera.x,
                          this.y + this.offset.y - currentState.camera.y);
        context.rotate(this.angle * degToRad);
        context.translate(-(this.x + this.offset.x - currentState.camera.x),
                          -(this.y + this.offset.y - currentState.camera.y));
      }

      if (this.alpha != 1) {
        context.globalAlpha = this.alpha;
      }

      context.drawImage(this.internal, this.x - currentState.camera.x,
                                       this.y - currentState.camera.y);

      if (this.alpha != 1) {
        context.globalAlpha = 1;
      }

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

      if (ws != this.internal.width || hs != this.internal.height) {
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
        this.pending.push([this.stampText, x, y, text, font, size, color]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        this.internalctx.font = size + "px " + font;
        this.internalctx.textAlign = "left";
        this.internalctx.fillStyle = color;
        this.internalctx.fillText(text, x, y + size);
      }
    },

    stampRect: function(x, y, width, height, color) {
      if (!this.loaded) {
        this.pending.push([this.stampRect, x, y, width, height, color]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        this.internalctx.fillStyle = color;
        this.internalctx.fillRect(x, y, width, height);
      }
    },

    stampImage: function(x, y, path) {
      if (!this.loaded) {
        this.pending.push([this.stampImage, x, y, path]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        var image = new Image();
        image.src = path;
        image.sprite = this;
        image.target = {x: x, y: y};

        image.onload = function() {
          this.sprite.internalctx.drawImage(this, this.target.x, this.target.y);
        };
      }
    },

    dispatchPending: function() {
      /* Dispatch all pending sprite modifications */
      var pending = this.pending;
      for (var i = 0; i < pending.length; i++) {
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
    }
  };

  return constructor;
})();

/* stats.js - http://github.com/mrdoob/stats.js */
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};

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

    if (isDown(pauseKey))
      pauseOrResumeGame();

    // TODO Draw Pause/Play huge icon on top
  } else {
    if (isDown(pauseKey))
      pauseOrResumeGame();

    currentState.update();
    currentState.draw();
  }

  stats.end();
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
  if (!currentState) {
    init();
  }

  if (!newState.camera) {
    newState.camera = new Camera(0, 0, context.width, context.height);
  }

  newState.setup();
  return currentState = newState;
}

var canvas = document.getElementById("canvas");
var context = null;
if (canvas != undefined) {
  context = canvas.getContext("2d");
  context.width = canvas.width;
  context.height = canvas.height;
  context.globalCompositeOperation = "destination-over";
}

var sharedCanvases = {};

var currentState = null;
var lastUpdate = null;
var desiredFPS = null;

var currentFont = "10px serif";

var pauseKey = "p";
var canPauseOrResume = true;
var gamePaused = false;

var radToDeg = 180 / Math.PI;
var degToRad = Math.PI / 180;

/* Use stats.js for awesome stats */
var stats = new Stats();
stats.setMode(2);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "800px";
stats.domElement.style.top = "0px";

document.body.appendChild(stats.domElement);

