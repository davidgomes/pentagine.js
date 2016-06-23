(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Sprite"] = factory();
	else
		root["Pentagine"] = root["Pentagine"] || {}, root["Pentagine"]["Sprite"] = factory();
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
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sprite = function () {
	  function Sprite(game, image, x, y) {
	    _classCallCheck(this, Sprite);

	    this.x = x;
	    this.y = y;
	    this.alpha = 1;
	    this.angle = 0;
	    this.path = image;
	    this.currentState = game.currentState;
	    this.offset = { x: 0, y: 0 };
	    this.context = game.context;
	    this.sharedCanvases = {};

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
	      this.internal = document.createElement('canvas');
	      this.internalctx = this.internal.getContext('2d');

	      /* Save the canvas to the global shared canvas map */
	      this.sharedCanvases[this.path] = [this.internal, this.internalctx, this, []];

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

	  _createClass(Sprite, [{
	    key: 'draw',
	    value: function draw() {
	      // TODO: how about caching rotated sprites on their internal canvas?

	      if (this.angle) {
	        this.context.save();
	        this.context.translate(this.x + this.offset.x - this.currentState.camera.x, this.y + this.offset.y - this.currentState.camera.y);

	        this.context.rotate(this.angle * degToRad);

	        this.context.translate(-(this.x + this.offset.x - this.currentState.camera.x), -(this.y + this.offset.y - this.currentState.camera.y));
	      }

	      if (this.alpha != 1) {
	        this.context.globalAlpha = this.alpha;
	      }

	      this.context.drawImage(this.internal, this.x - this.currentState.camera.x, this.y - this.currentState.camera.y);

	      if (this.alpha != 1) {
	        this.context.globalAlpha = 1;
	      }

	      if (this.angle) {
	        this.context.restore();
	      }
	    }
	  }, {
	    key: 'makeGraphic',
	    value: function makeGraphic(width, height, color) {
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
	  }, {
	    key: 'makeLabel',
	    value: function makeLabel(text, size, font, color) {
	      if (this.shared) {
	        this.releaseShared();
	      }

	      this.internalctx.font = size + 'px ' + font;
	      var metrics = this.internalctx.measureText(text);

	      // TODO: figure out actual height instead of 2 * size (see stampText TODO)
	      this.makeGraphic(metrics.width, size * 2, 'rgba(0, 0, 0, 0)');
	      this.stampText(0, 0, text, size, font, color);
	    }
	  }, {
	    key: 'stampText',
	    value: function stampText(x, y, text, size, font, color) {
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
	  }, {
	    key: 'stampRect',
	    value: function stampRect(x, y, width, height, color) {
	      if (!this.loaded) {
	        this.pending.push([this.stampRect, x, y, width, height, color]);
	      } else {
	        if (this.shared) {
	          this.releaseShared();
	        }

	        this.internalctx.fillStyle = color;
	        this.internalctx.fillRect(x, y, width, height);
	      }
	    }
	  }, {
	    key: 'stampImage',
	    value: function stampImage(x, y, path) {
	      var _this = this;

	      if (!this.loaded) {
	        this.pending.push([this.stampImage, x, y, path]);
	      } else {
	        if (this.shared) {
	          this.releaseShared();
	        }

	        var image = new Image();
	        image.src = path;
	        image.sprite = this;
	        image.target = { x: x, y: y };

	        image.onload = function () {
	          _this.sprite.internalctx.drawImage(_this, _this.target.x, _this.target.y);
	        };
	      }
	    }
	  }, {
	    key: 'dispatchPending',
	    value: function dispatchPending() {
	      /* Dispatch all pending sprite modifications */
	      var pending = this.pending;

	      for (var i = 0; i < pending.length; i++) {
	        pending[i][0].apply(this, Array.prototype.slice.call(pending[i], 1));
	      }

	      delete this.pending;
	    }
	  }, {
	    key: 'releaseShared',
	    value: function releaseShared() {
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
	  }]);

	  return Sprite;
	}();

	module.exports = Sprite;

/***/ }
/******/ ])
});
;