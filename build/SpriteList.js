(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SpriteList"] = factory();
	else
		root["Pentagine"] = root["Pentagine"] || {}, root["Pentagine"]["SpriteList"] = factory();
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

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpriteList = function () {
	  function SpriteList() {
	    _classCallCheck(this, SpriteList);

	    this.sprites = [];
	  }

	  _createClass(SpriteList, [{
	    key: "draw",
	    value: function draw() {
	      for (var i = 0; i < this.sprites.length; i++) {
	        if (this.sprites[i]) {
	          this.sprites[i].draw();
	        }
	      }
	    }
	  }, {
	    key: "push",
	    value: function push(newSprite) {
	      this.sprites.push(newSprite);
	    }
	  }, {
	    key: "remove",
	    value: function remove(sprite) {
	      var index = this.sprites.indexOf(sprite);
	      this.sprites.splice(index, 1);
	    }
	  }, {
	    key: "getLength",
	    value: function getLength() {
	      return this.sprites.length;
	    }
	  }]);

	  return SpriteList;
	}();

	module.exports = SpriteList;

/***/ }
/******/ ])
});
;