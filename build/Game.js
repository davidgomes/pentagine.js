(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Game"] = factory();
	else
		root["Pentagine"] = root["Pentagine"] || {}, root["Pentagine"]["Game"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Camera = __webpack_require__(1);

	var _Camera2 = _interopRequireDefault(_Camera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  _createClass(Game, [{
	    key: 'tick',
	    value: function tick() {
	      window.requestAnimationFrame(this.tick.bind(this));

	      var currentTime = Date.now();
	      var elapsed = currentTime - this.lastUpdate;

	      if (this.desiredFPS) {
	        if (elapsed > this.desiredInterval) {
	          this.lastUpdate = currentTime - elapsed % this.desiredInterval;

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
	  }, {
	    key: 'init',
	    value: function init() {
	      this.lastUpdate = Date.now();

	      if (this.desiredFPS) {
	        this.desiredInterval = 1000 / this.desiredFPS;
	      }

	      var myInterval = window.requestAnimationFrame(this.tick.bind(this));
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      var event = e ? e : window.event;
	      var name = this.keyCodeToString[event.keyCode];
	      this.pressedKeys[name] = true;

	      if (this.preventedKeys.indexOf(name) > -1) {
	        e.preventDefault();
	      }
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      var event = e ? e : window.event;
	      var name = this.keyCodeToString[event.keyCode];
	      this.pressedKeys[name] = false;

	      if (this.preventedKeys.indexOf(name) > -1) {
	        e.preventDefault();
	      }
	    }
	  }, {
	    key: 'handleTouchStart',
	    value: function handleTouchStart(e) {
	      var event = e ? e : window.event;

	      mouse.x = event.targetTouches[0].pageX;
	      mouse.y = event.targetTouches[0].pageY;

	      this.pressedButtons['left'] = true;
	    }
	  }, {
	    key: 'handleTouchEnd',
	    value: function handleTouchEnd(e) {
	      var event = e ? e : window.event;

	      this.pressedButtons['left'] = false;
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(e) {
	      var event = e ? e : window.event;
	      var humanName = this.convertMouseButtonToString[event.button];

	      this.pressedButtons[humanName] = true;
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp(e) {
	      var event = e ? e : window.event;
	      var humanName = this.convertMouseButtonToString[event.button];

	      this.pressedButtons[humanName] = false;
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
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
	  }, {
	    key: 'handleTouchMove',
	    value: function handleTouchMove(e) {
	      var event = e ? e : window.event;
	      e.stopPropagation();
	      e.preventDefault();

	      /* Tanslate to mouse event */
	      var clickEvent = document.createEvent('MouseEvent');
	      clickEvent.initMouseEvent('mousemove', true, true, window, e.detail, e.touches[0].screenX, e.touches[0].screenY, e.touches[0].clientX, e.touches[0].clientY, false, false, false, false, 0, null);

	      window.dispatchEvent(clickEvent);
	    }
	  }]);

	  function Game() {
	    var _this = this;

	    _classCallCheck(this, Game);

	    this.desiredFPS = null;
	    this.desiredInterval = null;
	    this.lastUpdate = null;
	    this.currentState = null;

	    this.pressedKeys = [];
	    this.preventedKeys = [];

	    this.degToRad = Math.PI / 180;
	    this.keyCodeToString = [];
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

	    var numpadKeys = ['numpad1', 'numpad2', 'numpad3', 'numpad4', 'numpad5', 'numpad6', 'numpad7', 'numpad8', 'numpad9'];

	    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

	    _.each(numbers, function (el, index) {
	      return _this.keyCodeToString[48 + index] = el;
	    });
	    _.each(letters, function (el, index) {
	      return _this.keyCodeToString[65 + index] = el;
	    });
	    _.each(numpadKeys, function (el, index) {
	      return _this.keyCodeToString[48 + index] = el;
	    });

	    window.addEventListener('keydown', this.handleKeyDown.bind(this));
	    window.addEventListener('keyup', this.handleKeyUp.bind(this));

	    window.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
	    window.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
	    window.addEventListener('mousemove', this.handleMouseMove.bind(this), false);

	    window.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
	    window.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
	    window.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

	    this.pressedButtons = [];
	    this.mouse = {};

	    this.convertMouseButtonToString = [];
	    this.convertMouseButtonToString[0] = 'left';
	    this.convertMouseButtonToString[1] = 'center';
	    this.convertMouseButtonToString[2] = 'right';

	    this.pauseKey = 'p';
	    this.canPauseOrResume = true;
	    this.gamePaused = false;

	    this.currentFont = '10px serif';
	  }

	  _createClass(Game, [{
	    key: 'setup',
	    value: function setup(options) {
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
	  }, {
	    key: 'drawCircle',
	    value: function drawCircle(x, y, radius, color) {
	      this.context.fillStyle = color;
	      this.context.beginPath();
	      this.context.arc(x, y, radius, 0, Math.PI * 2, false);
	      this.context.fill();
	    }
	  }, {
	    key: 'drawRectangle',
	    value: function drawRectangle(x, y, width, height, color) {
	      if (color) {
	        this.context.fillStyle = color;
	      }

	      this.context.fillRect(x, y, width, height);
	    }
	  }, {
	    key: 'drawLine',
	    value: function drawLine(x1, y1, x2, y2, color) {
	      if (color) {
	        this.context.strokeStyle = color;
	      }

	      this.context.beginPath();
	      this.context.moveTo(x1, y1);
	      this.context.lineTo(x2, y2);
	      this.context.stroke();
	    }
	  }, {
	    key: 'drawString',
	    value: function drawString(text, x, y, color, alignment) {
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
	  }, {
	    key: 'clearCanvas',
	    value: function clearCanvas(backgroundColor) {
	      this.context.clearRect(0, 0, this.context.width, this.context.height);

	      if (backgroundColor) {
	        this.drawRectangle(0, 0, this.context.width, this.context.height, backgroundColor);
	      }
	    }
	  }, {
	    key: 'isOutsideOfScreen',
	    value: function isOutsideOfScreen(x, y) {
	      return x < 0 || x > this.context.width || y < 0 || y > this.context.height;
	    }
	  }, {
	    key: 'getpressedKeys',
	    value: function getpressedKeys() {
	      return this.pressedKeys;
	    }
	  }, {
	    key: 'getPressedButtons',
	    value: function getPressedButtons() {
	      return this.pressedButtons;
	    }
	  }, {
	    key: 'isDown',
	    value: function isDown(name) {
	      if (this.pressedKeys[name]) {
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'isMouseDown',
	    value: function isMouseDown(name) {
	      if (this.pressedButtons[name]) {
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'switchState',
	    value: function switchState(newState) {
	      if (!this.currentState) {
	        this.currentState = newState;
	        this.init();
	      }

	      if (!newState.camera) {
	        newState.camera = new _Camera2.default(0, 0, this.context.width, this.context.height);
	      }

	      newState.setup();

	      this.currentState = newState;

	      return this.currentState;
	    }
	  }]);

	  return Game;
	}();

	module.exports = Game;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Camera = function () {
	  function Camera(x, y, width, height) {
	    _classCallCheck(this, Camera);

	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }

	  _createClass(Camera, [{
	    key: "follow",
	    value: function follow() {}
	  }]);

	  return Camera;
	}();

	module.exports = Camera;

/***/ }
/******/ ])
});
;