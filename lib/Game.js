import Camera from 'Camera';

class Game {
  desiredFPS;
  desiredInterval;
  lastUpdate;
  currentState;

  pressedKeys = [];
  preventedKeys = [];

  degToRad = Math.PI / 180;
  keyCodeToString = [];

  pressedButtons = [];
  mouse = {};

  convertMouseButtonToString = ['left', 'center', 'right'];

  pauseKey = 'p';
  canPauseOrResume = true;
  gamePaused = false;

  currentFont = '10px serif';

  windowFocused;

  constructor () {
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

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    window.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    window.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
    window.addEventListener('mousemove', this.handleMouseMove.bind(this), false);

    window.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    window.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

    this.windowFocused = true;
    window.addEventListener('focus', this.handleFocus.bind(this), false);
    window.addEventListener('blur', this.handleBlur.bind(this), false);
  }

  tick() {
    if (this.windowFocused) {
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
  }

  init() {
    this.lastUpdate = Date.now();

    if (this.desiredFPS) {
      this.desiredInterval = 1000 / this.desiredFPS;
    }

    window.requestAnimationFrame(this.tick.bind(this));
  }

  handleFocus(e) {
    this.windowFocused = true;
    window.requestAnimationFrame(this.tick.bind(this));
  }

  handleBlur(e) {
    this.windowFocused = false;
  }

  handleKeyDown(e) {
    var event = (e) ? e : window.event;
    var name = this.keyCodeToString[event.keyCode];
    this.pressedKeys[name] = true;

    if (this.preventedKeys.indexOf(name) > -1) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    var event = (e) ? e : window.event;
    var name = this.keyCodeToString[event.keyCode];
    this.pressedKeys[name] = false;

    if (this.preventedKeys.indexOf(name) > -1) {
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

  setup(options) {
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

  removeFontStyle(whichStyle) {
    var splittedFont = this.currentFont.split(' ');
    var newFont = '';

    _.each(splittedFont, ((el, index) => {
      if (el !== whichStyle) {
        newFont = newFont.concat(' ').concat(el);
      }
    }).bind(this));

    this.currentFont = newFont;
  }

  changeFontSize(newSize) {
    var splittedFont = this.currentFont.split(' ');
    var newFont = '';

    _.each(splittedFont, ((el, index) => {
      if (el.slice(el.length - 2, el.length) === 'px') {
        newFont = `${newFont} ${newSize}px`;
      } else {
        newFont = `${newFont} ${el}`;
      }
    }).bind(this));

    this.currentFont = newFont;
  }

  switchState(newState) {
    if (!this.currentState) {
      this.currentState = newState;
      this.init();
    }

    if (!newState.camera) {
      newState.camera = new Camera(0, 0, this.context.width, this.context.height);
    }

    newState.setup();

    this.currentState = newState;

    return this.currentState;
  }
}

module.exports = Game;
