(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Streader"] = factory();
	else
		root["Streader"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _StringReader = __webpack_require__(1);

	var _StringReader2 = _interopRequireDefault(_StringReader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _StringReader2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Convenient way to read through strings
	 * @class StringReader
	 */
	var StringReader = function () {
	  /**
	   * Creates a new instance of StringReader
	   * @constructor
	   * @param text
	   */
	  function StringReader(text) {
	    _classCallCheck(this, StringReader);

	    if (text && typeof text !== "string") throw new TypeError("Text should be a String");
	    this._source = text;
	    this._index = 0;
	  }

	  /**
	   * Loads the new text source to StringReader.
	   * Note: method resets current cursor data.
	   * @param text
	   */


	  _createClass(StringReader, [{
	    key: "setSource",
	    value: function setSource(text) {
	      if (typeof text === "undefined") throw new Error("Text is missing");
	      if (typeof text !== "string") throw new TypeError("Text should be a String");
	      this._source = text;
	      this.reset();
	    }

	    /**
	     * Gets the current index of the cursor.
	     * @returns {number}
	     */

	  }, {
	    key: "getIndex",
	    value: function getIndex() {
	      return this._index;
	    }

	    /**
	     * Gets the current reader's source string
	     * @return {*}
	     */

	  }, {
	    key: "getSource",
	    value: function getSource() {
	      return this._source;
	    }

	    /**
	     * Reads the next character without advancing the cursor
	     * @param offset — optional offset to start read at
	     * @param count — optional count of characters to read
	     * @returns {string|null}
	     */

	  }, {
	    key: "peek",
	    value: function peek() {
	      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      // If we're at the end of the source
	      if (offset > 0 && this.eof()) return null;

	      var peekIndex = this._index + offset - 1;

	      // Return null if peekIndex is larger than source length
	      if (peekIndex >= this._source.length) return null;
	      // Or try to return a single character
	      if (count <= 1) return this._source.charAt(peekIndex);
	      // Otherwise return sequence
	      return this._source.substr(peekIndex, count);
	    }

	    /**
	     * Reads characters that match either string or regexp pattern without advancing the cursor.
	     * @param offset — optional offset to start read at
	     * @param pattern — string of regexp to get matched
	     * @throws TypeError — if {pattern} is not a string or regexp
	     * @return {string|null}
	     */

	  }, {
	    key: "peekPattern",
	    value: function peekPattern(pattern) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      // If we're at the end of the source
	      if (this.eof()) return null;

	      var sourceTrail = this._source.substring(this._index + offset - 1);

	      // Try to read a string pattern
	      if (typeof pattern === "string") {
	        for (var i = 0; i < pattern.length; i++) {
	          if (pattern[i] !== sourceTrail[i]) return null;
	        }
	        return this.peek(pattern.length, offset);
	      }
	      // Or, read a RegExp pattern
	      else if (pattern instanceof RegExp) {
	          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
	          return RegExp.lastMatch;
	        }
	        // Otherwise, throw an Error
	        else throw new TypeError("Pattern must be a String or RegExp");
	    }

	    /**
	     * Reads the next character
	     * @param count — optional count of character to read
	     * @returns {string|null}
	     */

	  }, {
	    key: "read",
	    value: function read() {
	      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	      // If we're at the end of the source
	      if (this.eof()) return null;
	      var str = void 0;

	      // Try to get a single character
	      if (count <= 1) str = this._source.charAt(this._index);
	      // Otherwise, get a sequence
	      else str = this._source.substr(this._index, count);

	      // Increment cursor position
	      this._index = this._index + count;

	      return str;
	    }

	    /**
	     * Reads characters that match either string or regexp pattern.
	     * @param pattern — string of regexp to get matched
	     * @throws TypeError — if {pattern} is not a string or regexp
	     * @return {string|null}
	     */

	  }, {
	    key: "readPattern",
	    value: function readPattern(pattern) {
	      // If we're at the end of the source
	      if (this.eof()) return null;

	      var sourceTrail = this._source.substring(this._index);

	      // Try to read a string pattern
	      if (typeof pattern === "string") {
	        for (var i = 0; i < pattern.length; i++) {
	          if (pattern[i] !== sourceTrail[i]) return null;
	        }
	        return this.read(pattern.length);
	      }
	      // Or, read a RegExp pattern
	      else if (pattern instanceof RegExp) {
	          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
	          return this.read(RegExp.lastMatch.length);
	        }
	        // Otherwise, throw an Error
	        else throw new TypeError("Pattern must be a String or RegExp");
	    }

	    /**
	     * Skips the next character
	     * @param count — optional count of character to skip
	     * @return {number} — count of actually skipped characters
	     */

	  }, {
	    key: "skip",
	    value: function skip() {
	      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	      // If we're at the end of the source
	      if (this.eof()) return 0;
	      var skipped = void 0;

	      // Try to skip available count
	      if (this._index + count > this._source.length) {
	        skipped = this._source.length - this._index;
	        this._index = this._source.length;
	        return skipped;
	      }
	      // Otherwise, skip specified count
	      this._index = this._index + count;
	      return count;
	    }

	    /**
	     * Skips characters that match either string or regexp
	     * @param pattern — string or regexp to get matched
	     * @throws TypeError — if {pattern} is not a string or regexp
	     * @return {number} — count of skipped characters
	     */

	  }, {
	    key: "skipPattern",
	    value: function skipPattern(pattern) {
	      // If we're at the end of the source
	      if (this.eof()) return 0;

	      var sourceTrail = this._source.substring(this._index);

	      // Try to read a string pattern
	      if (typeof pattern === "string") {
	        for (var i = 0; i < pattern.length; i++) {
	          if (pattern[i] !== sourceTrail[i]) return 0;
	        }
	        return this.skip(pattern.length);
	      }
	      // Or, read a RegExp pattern
	      else if (pattern instanceof RegExp) {
	          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return 0;
	          return this.skip(RegExp.lastMatch.length);
	        }
	        // Otherwise, throw an Error
	        else throw new TypeError("Pattern must be a String or RegExp");
	    }

	    /**
	     * Checks if we're at the end of the source
	     * @returns {boolean}
	     */

	  }, {
	    key: "eof",
	    value: function eof() {
	      return this._index >= this._source.length;
	    }

	    /**
	     * Resets current cursor position
	     */

	  }, {
	    key: "reset",
	    value: function reset() {
	      this._index = 0;
	    }

	    /**
	     * Normalizes target RegExp to be matched with the start of the source
	     * @param regexp
	     * @return {RegExp}
	     * @private
	     */

	  }, {
	    key: "_normalizeRegExp",
	    value: function _normalizeRegExp(regexp) {
	      if (regexp.source.indexOf("^") > -1) return regexp;
	      return new RegExp("^" + regexp.source, regexp.flags);
	    }
	  }]);

	  return StringReader;
	}();

	exports.default = StringReader;

/***/ })
/******/ ])
});
;