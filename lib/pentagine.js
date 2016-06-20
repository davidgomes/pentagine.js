var _ = require('underscore');

export default class Pentagine {
  tick() {
    window.requestAnimationFrame(this.tick.bind(this));

    var currentTime = Date.now();
    var elapsed = currentTime - this.lastUpdate;

    if (this.desiredFPS) {
      if (elapsed > this.desiredInterval) {
        this.lastUpdate = currentTime - (elapsed % this.desiredInterval);

        this.currentState.dt = elapsed * 0.001;
        this.currentState.update();
        this.currentState.draw();
      }
    } else {
      this.lastUpdate = currentTime;

      this.currentState.dt = elapsed * 0.001;
      this.currentState.update();
      this.currentState.draw();
    }
  }

  init() {
    this.lastUpdate = Date.now();

    if (this.desiredFPS) {
      this.desiredInterval = 1000 / this.desiredFPS;
    }

    var myInterval = window.requestAnimationFrame(this.tick.bind(this));
  }

  handleKeyDown(e) {
    var event = (e) ? e : window.event;
    var name = this.keyCodeToString[event.keyCode];
    this.pressedKeys[name] = true;

    if (preventedKeys.indexOf(name) > -1) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    var event = (e) ? e : window.event;
    var name = this.keyCodeToString[event.keyCode];
    this.pressedKeys[name] = false;

    if (preventedKeys.indexOf(name) > -1) {
      e.preventDefault();
    }
  }

  handleTouchStart(e) {
    var event = (e) ? e : window.event;

    mouse.x = event.targetTouches[0].pageX;
    mouse.y = event.targetTouches[0].pageY;

    this.pressedButtons['left'] = true;
  }

  handleTouchEnd(e) {
    var event = (e) ? e : window.event;

    this.pressedButtons['left'] = false;
  }

  handleMouseDown(e) {
    var event = (e) ? e : window.event;
    var humanName = this.convertMouseButtonToString[event.button];

    this.pressedButtons[humanName] = true;
  }

  handleMouseUp(e) {
    var event = (e) ? e : window.event;
    var humanName = this.convertMouseButtonToString[event.button];

    this.pressedButtons[humanName] = false;
  }

  handleMouseMove(e) {
    if (e.offsetX) {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    } else if (e.layerX) {
      this.mouse.x = e.layerX;
      this.mouse.y = e.layerY;
    }

    if (this.currentState !== null) {
      this.mouse.x += this.currentState.camera.x;
      this.mouse.y += this.currentState.camera.y;
    }
  }

  handleTouchMove(e) {
    var event = (e) ? e : window.event;
    e.stopPropagation();
    e.preventDefault();

    /* Tanslate to mouse event */
    var clickEvent = document.createEvent('MouseEvent');
    clickEvent.initMouseEvent('mousemove', true, true, window, e.detail,
                              e.touches[0].screenX, e.touches[0].screenY,
                              e.touches[0].clientX, e.touches[0].clientY,
                              false, false, false, false, 0, null);

    window.dispatchEvent(clickEvent);
  }

  constructor () {
    this.desiredFPS = null;
    this.desiredInterval = null;
    this.lastUpdate = null;
    this.currentState = null;

    this.pressedKeys = [ ];
    this.preventedKeys = [ ];

    this.degToRad = Math.PI / 180;
    this.keyCodeToString = [ ];
    this.keyCodeToString[8] = 'backspace';
    this.keyCodeToString[9] = 'tab';
    this.keyCodeToString[13] = 'return';
    this.keyCodeToString[16] = 'shift';
    this.keyCodeToString[17] = 'ctrl';
    this.keyCodeToString[18] = 'alt';
    this.keyCodeToString[19] = 'pause';
    this.keyCodeToString[20] = 'capslock';
    this.keyCodeToString[27] = 'escape';
    this.keyCodeToString[32] = 'space';
    this.keyCodeToString[33] = 'pageup';
    this.keyCodeToString[34] = 'pagedown';
    this.keyCodeToString[35] = 'end';
    this.keyCodeToString[36] = 'home';
    this.keyCodeToString[37] = 'left';
    this.keyCodeToString[38] = 'up';
    this.keyCodeToString[39] = 'right';
    this.keyCodeToString[40] = 'down';
    this.keyCodeToString[45] = 'insert';
    this.keyCodeToString[46] = 'delete';

    this.keyCodeToString[91] = 'leftwindowkey';
    this.keyCodeToString[92] = 'rightwindowkey';
    this.keyCodeToString[93] = 'selectkey';
    this.keyCodeToString[106] = 'multiply';
    this.keyCodeToString[107] = 'add';
    this.keyCodeToString[109] = 'subtract';
    this.keyCodeToString[110] = 'decimalpoint';
    this.keyCodeToString[111] = 'divide';

    this.keyCodeToString[144] = 'numlock';
    this.keyCodeToString[145] = 'scrollock';
    this.keyCodeToString[186] = 'semicolon';
    this.keyCodeToString[187] = 'equalsign';
    this.keyCodeToString[188] = 'comma';
    this.keyCodeToString[189] = 'dash';
    this.keyCodeToString[190] = 'period';
    this.keyCodeToString[191] = 'forwardslash';
    this.keyCodeToString[192] = 'graveaccent';
    this.keyCodeToString[219] = 'openbracket';
    this.keyCodeToString[220] = 'backslash';
    this.keyCodeToString[221] = 'closebracket';
    this.keyCodeToString[222] = 'singlequote';

    var numpadKeys = ['numpad1', 'numpad2', 'numpad3', 'numpad4', 'numpad5',
                      'numpad6', 'numpad7', 'numpad8', 'numpad9'];

    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                   'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                   'u', 'v', 'w', 'x', 'y', 'z'];

    _.each(numbers, (el, index) => this.keyCodeToString[48 + index] = el);
    _.each(letters, (el, index) => this.keyCodeToString[65 + index] = el);
    _.each(numpadKeys, (el, index) => this.keyCodeToString[48 + index] = el);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    window.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    window.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
    window.addEventListener('mousemove', this.handleMouseMove.bind(this), false);

    window.addEventListener('touchstart', this.handleTouchStart, false);
    window.addEventListener('touchmove', this.handleTouchMove, false);
    window.addEventListener('touchend', this.handleTouchEnd, false);

    this.pressedButtons = [ ];
    this.mouse = { };

    this.convertMouseButtonToString = [ ];
    this.convertMouseButtonToString[0] = 'left';
    this.convertMouseButtonToString[1] = 'center';
    this.convertMouseButtonToString[2] = 'right';

    this.pauseKey = 'p';
    this.canPauseOrResume = true;
    this.gamePaused = false;

    this.currentFont = '10px serif';
  }

  setup(options) {
    console.log('setup');
    /* Load the canvas */
    this.canvas = document.getElementById('canvas');

    if (options.desiredFPS) {
      this.desiredFPS = options.desiredFPS;
    }

    if (options.preventedKeys) {
      this.preventedKeys = options.preventedKeys;
    }

    if (typeof this.canvas !== 'undefined') {
      this.canvas.width = options.width;
      this.canvas.height = options.height;

      this.context = this.canvas.getContext('2d');

      this.context.width = options.width;
      this.context.height = options.height;
    }

    this.switchState(options.firstState);

    return this;
  }

  drawCircle(x, y, radius, color) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fill();
  }

  drawRectangle(x, y, width, height, color) {
    if (color) {
      this.context.fillStyle = color;
    }

    this.context.fillRect(x, y, width, height);
  }

  drawLine(x1, y1, x2, y2, color) {
    if (color) {
      this.context.strokeStyle = color;
    }

    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  drawString(text, x, y, color, alignment) {
    if (!alignment) {
      this.context.textAlign = 'left';
    } else {
      this.context.textAlign = alignment;
    }

    this.context.textBaseline = 'top';
    this.context.font = this.currentFont;
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
  }

  clearCanvas(backgroundColor) {
    this.context.clearRect(0, 0, this.context.width, this.context.height);

    if (backgroundColor) {
      this.drawRectangle(0, 0, this.context.width, this.context.height, backgroundColor);
    }
  }

  isOutsideOfScreen(x, y) {
    return x < 0 || x > this.context.width || y < 0 || y > this.context.height;
  }

  getpressedKeys() {
    return this.pressedKeys;
  }

  getPressedButtons() {
    return this.pressedButtons;
  }

  isDown(name) {
    if (this.pressedKeys[name]) {
      return true;
    }

    return false;
  }

  isMouseDown(name) {
    if (this.pressedButtons[name]) {
      return true;
    }

    return false;
  }

  switchState(newState) {
    console.log('beginning of switchstate');

    if (!this.currentState) {
      this.currentState = newState;
      console.log(this.currentState);
      this.init();
    }

    if (!newState.camera) {
      newState.camera = new Camera(0, 0, this.context.width, this.context.height);
    }

    console.log('middle of switchstate');

    newState.setup();

    console.log('middle of switchstate 2');

    this.currentState = newState;

    console.log(this.currentState);

    return this.currentState;
  }
}

class SpriteList {
  constructor() {
    this.sprites = [];
  }

  draw() {
    for (var i = 0; i < this.sprites.length; i++) {
      if (this.sprites[i]) {
        this.sprites[i].draw();
      }
    }
  }

  push(newSprite) {
    this.sprites.push(newSprite);
  }

  remove(sprite) {
    var index = this.sprites.indexOf(sprite);
    this.sprites.splice(index, 1);
  }

  getLength() {
    return this.sprites.length;
  }
}

class Camera {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  follow() { }
}

export class Sprite {
  constructor(state, image, x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.angle = 0;
    this.path = image;
    this.currentState = state;
    this.offset = { x: 0, y: 0 };
    this.context = { };
    this.sharedCanvases = { };

    if (!image) {
      this.shared = true;
      this.loaded = true;
      console.log('Error: Attempted to load null image.');
      return;
    }

    /* Try to retrieve a shared canvas instead of generating a new one */
    this.shared = true;
    if (this.path in this.sharedCanvases) {
      var shared = this.sharedCanvases[this.path];
      this.internal = shared[0];
      this.internalctx = shared[1];
      this.loaded = shared[2].loaded;

      if (!this.loaded) {
        this.pending = [ ];
        shared[3].push(this);
      }
    } else {
      this.image = new Image();
      this.image.src = image;
      this.image.owner = this;
      this.loaded = false;
      this.pending = [ ];

      /* Cache image modifications to an internal canvas for performance and flexibility */
      this.internal = document.createElement('canvas');
      this.internalctx = this.internal.getContext('2d');

      /* Save the canvas to the global shared canvas map */
      this.sharedCanvases[this.path] = [this.internal, this.internalctx, this, [ ]];

      /* Asynchronous image loading and caching */
      var sharedCanvasesCopy = this.sharedCanvases;
      this.image.onload = function () {
        this.owner.internal.width = this.width.toString();
        this.owner.internal.height = this.height.toString();
        this.owner.internalctx.drawImage(this, 0, 0);

        /* Dump image reference, we no longer need it */
        delete this.owner.image;
        this.owner.loaded = true;
        this.owner.dispatchPending();

        /* Set all dependencies to loaded */
        var deps = sharedCanvasesCopy[this.owner.path][3];
        for (var i = 0; i < deps.length; i++) {
          deps[i].loaded = true;
          deps[i].dispatchPending();
        }
      };
    }
  }

  draw() {
    // TODO: how about caching rotated sprites on their internal canvas?

    if (this.angle) {
      this.context.save();
      this.context.translate(this.x + this.offset.x - this.currentState.camera.x,
                             this.y + this.offset.y - this.currentState.camera.y);

      this.context.rotate(this.angle * degToRad);

      this.context.translate(-(this.x + this.offset.x - this.currentState.camera.x),
                             -(this.y + this.offset.y - this.currentState.camera.y));
    }

    if (this.alpha != 1) {
      this.context.globalAlpha = this.alpha;
    }

    this.context.drawImage(this.internal, this.x - this.currentState.camera.x,
                           this.y - this.currentState.camera.y);

    if (this.alpha != 1) {
      this.context.globalAlpha = 1;
    }

    if (this.angle) {
      this.context.restore();
    }
  }

  makeGraphic(width, height, color) {
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
  }

  makeLabel(text, size, font, color) {
    if (this.shared) {
      this.releaseShared();
    }

    this.internalctx.font = size + 'px ' + font;
    var metrics = this.internalctx.measureText(text);
    // TODO: figure out actual height instead of 2 * size (see stampText TODO)
    this.makeGraphic(metrics.width, size * 2, 'rgba(0, 0, 0, 0)');
    this.stampText(0, 0, text, size, font, color);
  }

  stampText(x, y, text, size, font, color) {
    // TODO: write small function to extract and cache ACTUAL font height
    if (!this.loaded) {
      this.pending.push([this.stampText, x, y, text, font, size, color]);
    } else {
      if (this.shared) {
        this.releaseShared();
      }

      this.internalctx.font = size + 'px ' + font;
      this.internalctx.textAlign = 'left';
      this.internalctx.fillStyle = color;
      this.internalctx.fillText(text, x, y + size);
    }
  }

  stampRect(x, y, width, height, color) {
    if (!this.loaded) {
      this.pending.push([ this.stampRect, x, y, width, height, color ]);
    } else {
      if (this.shared) {
        this.releaseShared();
      }

      this.internalctx.fillStyle = color;
      this.internalctx.fillRect(x, y, width, height);
    }
  }

  stampImage(x, y, path) {
    if (!this.loaded) {
      this.pending.push([ this.stampImage, x, y, path ]);
    } else {
      if (this.shared) {
        this.releaseShared();
      }

      var image = new Image();
      image.src = path;
      image.sprite = this;
      image.target = { x: x, y: y };

      image.onload = function () {
        this.sprite.internalctx.drawImage(this, this.target.x, this.target.y);
      };
    }
  }

  dispatchPending() {
    /* Dispatch all pending sprite modifications */
    var pending = this.pending;
    for (var i = 0; i < pending.length; i++) {
      pending[i][0].apply(this, Array.prototype.slice.call(pending[i], 1));
    }

    delete this.pending;
  }

  releaseShared() {
    /* Stop using the shared version of the internal canvas, we probably
     * need a dinamically modified sprite */
    var newInternal = document.createElement('canvas');
    this.internalctx = newInternal.getContext('2d');

    if (this.path) {
      newInternal.width = this.internal.width.toString();
      newInternal.height = this.internal.height.toString();
      this.internalctx.drawImage(sharedCanvases[this.path][0], 0, 0);
    }

    this.internal = newInternal;
    this.shared = false;
  }
}