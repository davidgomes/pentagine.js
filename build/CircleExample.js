(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CircleExample"] = factory();
	else
		root["CircleExample"] = factory();
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

	var PlayState = function () {
	  function PlayState() {
	    _classCallCheck(this, PlayState);
	  }

	  _createClass(PlayState, [{
	    key: 'setup',
	    value: function setup() {
	      this.ball = new Pentagine.Sprite(penta, 'ball.png', 100, 50);
	      this.ball.speed = 400;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (penta.isDown('up')) {
	        this.ball.y -= this.ball.speed * this.dt;
	      }

	      if (penta.isDown('down')) {
	        this.ball.y += this.ball.speed * this.dt;
	      }

	      if (penta.isDown('left')) {
	        this.ball.x -= this.ball.speed * this.dt;
	      }

	      if (penta.isDown('right')) {
	        this.ball.x += this.ball.speed * this.dt;
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      penta.clearCanvas('#333');

	      this.ball.draw();
	    }
	  }]);

	  return PlayState;
	}();

	var penta = new Pentagine.Game();

	/*
	   If penta.desiredFPS is not declared, the game will run as fast as
	   possible, and on any State, you can use 'this.dt' to get the
	   delta time between two ticks and use it to make movement
	   smooth. However, if desiredFPS is declared, the game will try to run
	   with the given amount of FPS and this.dt also works.
	*/

	penta.setup({ desiredFPS: 60,
	  preventedKeys: ['down', 'right', 'left', 'up', 'space'],
	  firstState: new PlayState(),
	  width: 400,
	  height: 400 });

/***/ }
/******/ ])
});
;