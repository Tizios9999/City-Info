/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign);
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/js/secondary.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ testConsole)
/* harmony export */ });
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
function testConsole() {
    console.log("Good day, this is a newer x2 test.");    
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vjb25kYXJ5LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYix3QkFBd0IsMkVBQTJFLGtDQUFrQyx3QkFBd0IsT0FBTyxrQ0FBa0MsbUlBQW1JOztBQUV6VSxrREFBa0QsMENBQTBDOztBQUU1RixlQUFlLG1CQUFPLENBQUMseUVBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsbUJBQU8sQ0FBQyx5R0FBbUM7O0FBRWhFLGdCQUFnQixtQkFBTyxDQUFDLDBDQUFPO0FBQy9COztBQUVBLHFCQUFxQix1RUFBc0I7QUFDM0M7QUFDQTs7QUFFQSxtREFBbUQsa0dBQW1DO0FBQ3RGLHVDQUF1QyxtQkFBTyxDQUFDLG9EQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBTyxDQUFDLDZGQUE2Qjs7QUFFeEQ7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTyxlQUFlLE9BQU8sZUFBZSxPQUFPLFdBQVcsT0FBTztBQUN0RjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9COztBQUVwQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQSxzRUFBc0UsYUFBYTtBQUNuRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCOztBQUVoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRDs7QUFFMUQ7QUFDQTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7O0FBRUEsU0FBUyxrQkFBa0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esb0NBQW9DLE9BQU87QUFDM0M7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7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cUIsbUJBQU8sQ0FBQyxzRUFBdUI7O0FBRXBELDRDQUE0QyxxQkFBTTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsOERBQWdCOztBQUUzQztBQUNBLDZCQUE2QjtBQUM3QiwwREFBMEQ7QUFDMUQ7QUFDQTs7Ozs7Ozs7Ozs7O0FDdERhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxxQkFBTTs7QUFFbEQ7QUFDQTtBQUNBLGlCQUFpQiwwQkFBMEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmU7QUFDZixJQUFJLE9BQU87QUFDWCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2NhbGxCb3VuZC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2RlZmluZS1wcm9wZXJ0aWVzL2luZGV4LmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9lczYtb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2dvcGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9oYXMtdG9zdHJpbmd0YWcvc2hhbXMuanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2lzLWFyZ3VtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvaXMtY2FsbGFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2lzLWdlbmVyYXRvci1mdW5jdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvaXMtbmFuL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9pcy1uYW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvaXMtbmFuL3NoaW0uanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2lzLXR5cGVkLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvc2hpbS5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2luZGV4LmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwid2VicGFjazovL2NpdHktaW5mby8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9jaXR5LWluZm8vLi9ub2RlX21vZHVsZXMvd2hpY2gtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vbm9kZV9tb2R1bGVzL2F2YWlsYWJsZS10eXBlZC1hcnJheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NpdHktaW5mby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2l0eS1pbmZvLy4vc3JjL2pzL3NlY29uZGFyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2Fzc2VydC5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8yYTUxYWU0MjRhNTEzZWM5YTZhYTM0NjZiYWEwY2MxZDU1ZGQ0ZjNiXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvZXJyb3JzJyksXG4gICAgX3JlcXVpcmUkY29kZXMgPSBfcmVxdWlyZS5jb2RlcyxcbiAgICBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UID0gX3JlcXVpcmUkY29kZXMuRVJSX0FNQklHVU9VU19BUkdVTUVOVCxcbiAgICBFUlJfSU5WQUxJRF9BUkdfVFlQRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFLFxuICAgIEVSUl9JTlZBTElEX0FSR19WQUxVRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX0FSR19WQUxVRSxcbiAgICBFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUsXG4gICAgRVJSX01JU1NJTkdfQVJHUyA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NSVNTSU5HX0FSR1M7XG5cbnZhciBBc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvYXNzZXJ0L2Fzc2VydGlvbl9lcnJvcicpO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgndXRpbC8nKSxcbiAgICBpbnNwZWN0ID0gX3JlcXVpcmUyLmluc3BlY3Q7XG5cbnZhciBfcmVxdWlyZSR0eXBlcyA9IHJlcXVpcmUoJ3V0aWwvJykudHlwZXMsXG4gICAgaXNQcm9taXNlID0gX3JlcXVpcmUkdHlwZXMuaXNQcm9taXNlLFxuICAgIGlzUmVnRXhwID0gX3JlcXVpcmUkdHlwZXMuaXNSZWdFeHA7XG5cbnZhciBvYmplY3RBc3NpZ24gPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbiA6IHJlcXVpcmUoJ2VzNi1vYmplY3QtYXNzaWduJykuYXNzaWduO1xudmFyIG9iamVjdElzID0gT2JqZWN0LmlzID8gT2JqZWN0LmlzIDogcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgZXJyb3JDYWNoZSA9IG5ldyBNYXAoKTtcbnZhciBpc0RlZXBFcXVhbDtcbnZhciBpc0RlZXBTdHJpY3RFcXVhbDtcbnZhciBwYXJzZUV4cHJlc3Npb25BdDtcbnZhciBmaW5kTm9kZUFyb3VuZDtcbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBsYXp5TG9hZENvbXBhcmlzb24oKSB7XG4gIHZhciBjb21wYXJpc29uID0gcmVxdWlyZSgnLi9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zJyk7XG5cbiAgaXNEZWVwRXF1YWwgPSBjb21wYXJpc29uLmlzRGVlcEVxdWFsO1xuICBpc0RlZXBTdHJpY3RFcXVhbCA9IGNvbXBhcmlzb24uaXNEZWVwU3RyaWN0RXF1YWw7XG59IC8vIEVzY2FwZSBjb250cm9sIGNoYXJhY3RlcnMgYnV0IG5vdCBcXG4gYW5kIFxcdCB0byBrZWVwIHRoZSBsaW5lIGJyZWFrcyBhbmRcbi8vIGluZGVudGF0aW9uIGludGFjdC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG5cblxudmFyIGVzY2FwZVNlcXVlbmNlc1JlZ0V4cCA9IC9bXFx4MDAtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZdL2c7XG52YXIgbWV0YSA9IFtcIlxcXFx1MDAwMFwiLCBcIlxcXFx1MDAwMVwiLCBcIlxcXFx1MDAwMlwiLCBcIlxcXFx1MDAwM1wiLCBcIlxcXFx1MDAwNFwiLCBcIlxcXFx1MDAwNVwiLCBcIlxcXFx1MDAwNlwiLCBcIlxcXFx1MDAwN1wiLCAnXFxcXGInLCAnJywgJycsIFwiXFxcXHUwMDBiXCIsICdcXFxcZicsICcnLCBcIlxcXFx1MDAwZVwiLCBcIlxcXFx1MDAwZlwiLCBcIlxcXFx1MDAxMFwiLCBcIlxcXFx1MDAxMVwiLCBcIlxcXFx1MDAxMlwiLCBcIlxcXFx1MDAxM1wiLCBcIlxcXFx1MDAxNFwiLCBcIlxcXFx1MDAxNVwiLCBcIlxcXFx1MDAxNlwiLCBcIlxcXFx1MDAxN1wiLCBcIlxcXFx1MDAxOFwiLCBcIlxcXFx1MDAxOVwiLCBcIlxcXFx1MDAxYVwiLCBcIlxcXFx1MDAxYlwiLCBcIlxcXFx1MDAxY1wiLCBcIlxcXFx1MDAxZFwiLCBcIlxcXFx1MDAxZVwiLCBcIlxcXFx1MDAxZlwiXTtcblxudmFyIGVzY2FwZUZuID0gZnVuY3Rpb24gZXNjYXBlRm4oc3RyKSB7XG4gIHJldHVybiBtZXRhW3N0ci5jaGFyQ29kZUF0KDApXTtcbn07XG5cbnZhciB3YXJuZWQgPSBmYWxzZTsgLy8gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xudmFyIE5PX0VYQ0VQVElPTl9TRU5USU5FTCA9IHt9OyAvLyBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiBBbGwgYXNzZXJ0aW9uIG1ldGhvZHMgcHJvdmlkZVxuLy8gYm90aCB0aGUgYWN0dWFsIGFuZCBleHBlY3RlZCB2YWx1ZXMgdG8gdGhlIGFzc2VydGlvbiBlcnJvciBmb3Jcbi8vIGRpc3BsYXkgcHVycG9zZXMuXG5cbmZ1bmN0aW9uIGlubmVyRmFpbChvYmopIHtcbiAgaWYgKG9iai5tZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHRocm93IG9iai5tZXNzYWdlO1xuICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3Iob2JqKTtcbn1cblxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZuKSB7XG4gIHZhciBhcmdzTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGludGVybmFsTWVzc2FnZTtcblxuICBpZiAoYXJnc0xlbiA9PT0gMCkge1xuICAgIGludGVybmFsTWVzc2FnZSA9ICdGYWlsZWQnO1xuICB9IGVsc2UgaWYgKGFyZ3NMZW4gPT09IDEpIHtcbiAgICBtZXNzYWdlID0gYWN0dWFsO1xuICAgIGFjdHVhbCA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAod2FybmVkID09PSBmYWxzZSkge1xuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICAgIHZhciB3YXJuID0gcHJvY2Vzcy5lbWl0V2FybmluZyA/IHByb2Nlc3MuZW1pdFdhcm5pbmcgOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbiAgICAgIHdhcm4oJ2Fzc2VydC5mYWlsKCkgd2l0aCBtb3JlIHRoYW4gb25lIGFyZ3VtZW50IGlzIGRlcHJlY2F0ZWQuICcgKyAnUGxlYXNlIHVzZSBhc3NlcnQuc3RyaWN0RXF1YWwoKSBpbnN0ZWFkIG9yIG9ubHkgcGFzcyBhIG1lc3NhZ2UuJywgJ0RlcHJlY2F0aW9uV2FybmluZycsICdERVAwMDk0Jyk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3NMZW4gPT09IDIpIG9wZXJhdG9yID0gJyE9JztcbiAgfVxuXG4gIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHRocm93IG1lc3NhZ2U7XG4gIHZhciBlcnJBcmdzID0ge1xuICAgIGFjdHVhbDogYWN0dWFsLFxuICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICBvcGVyYXRvcjogb3BlcmF0b3IgPT09IHVuZGVmaW5lZCA/ICdmYWlsJyA6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuIHx8IGZhaWxcbiAgfTtcblxuICBpZiAobWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZXJyQXJncy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuXG4gIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyQXJncyk7XG5cbiAgaWYgKGludGVybmFsTWVzc2FnZSkge1xuICAgIGVyci5tZXNzYWdlID0gaW50ZXJuYWxNZXNzYWdlO1xuICAgIGVyci5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuXG4gIHRocm93IGVycjtcbn1cblxuYXNzZXJ0LmZhaWwgPSBmYWlsOyAvLyBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBpbnRlcm5hbC9lcnJvci5cblxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gQXNzZXJ0aW9uRXJyb3I7XG5cbmZ1bmN0aW9uIGlubmVyT2soZm4sIGFyZ0xlbiwgdmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHZhciBnZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG5cbiAgICBpZiAoYXJnTGVuID09PSAwKSB7XG4gICAgICBnZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2UgPSAnTm8gdmFsdWUgYXJndW1lbnQgcGFzc2VkIHRvIGBhc3NlcnQub2soKWAnO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBtZXNzYWdlO1xuICAgIH1cblxuICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiB2YWx1ZSxcbiAgICAgIGV4cGVjdGVkOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnPT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgIH0pO1xuICAgIGVyci5nZW5lcmF0ZWRNZXNzYWdlID0gZ2VuZXJhdGVkTWVzc2FnZTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn0gLy8gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISF2YWx1ZS5cblxuXG5mdW5jdGlvbiBvaygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlubmVyT2suYXBwbHkodm9pZCAwLCBbb2ssIGFyZ3MubGVuZ3RoXS5jb25jYXQoYXJncykpO1xufVxuXG5hc3NlcnQub2sgPSBvazsgLy8gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoID09LlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXMgKi9cblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXG5cbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJz09JyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZXF1YWxcbiAgICB9KTtcbiAgfVxufTsgLy8gVGhlIG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHdoZXRoZXIgdHdvIG9iamVjdHMgYXJlIG5vdFxuLy8gZXF1YWwgd2l0aCAhPS5cblxuXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cblxuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnIT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3RFcXVhbFxuICAgIH0pO1xuICB9XG59OyAvLyBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cblxuXG5hc3NlcnQuZGVlcEVxdWFsID0gZnVuY3Rpb24gZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmICghaXNEZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdkZWVwRXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBkZWVwRXF1YWxcbiAgICB9KTtcbiAgfVxufTsgLy8gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG5cblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoaXNEZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3REZWVwRXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3REZWVwRXF1YWxcbiAgICB9KTtcbiAgfVxufTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxuXG5hc3NlcnQuZGVlcFN0cmljdEVxdWFsID0gZnVuY3Rpb24gZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmICghaXNEZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdkZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBkZWVwU3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufTtcblxuYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbCA9IG5vdERlZXBTdHJpY3RFcXVhbDtcblxuZnVuY3Rpb24gbm90RGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmIChpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ25vdERlZXBTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdERlZXBTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59XG5cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKCFvYmplY3RJcyhhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ3N0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogc3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufTtcblxuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAob2JqZWN0SXMoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3RTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbnZhciBDb21wYXJpc29uID0gZnVuY3Rpb24gQ29tcGFyaXNvbihvYmosIGtleXMsIGFjdHVhbCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb21wYXJpc29uKTtcblxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoYWN0dWFsICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFjdHVhbFtrZXldID09PSAnc3RyaW5nJyAmJiBpc1JlZ0V4cChvYmpba2V5XSkgJiYgb2JqW2tleV0udGVzdChhY3R1YWxba2V5XSkpIHtcbiAgICAgICAgX3RoaXNba2V5XSA9IGFjdHVhbFtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXNba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlRXhjZXB0aW9uS2V5KGFjdHVhbCwgZXhwZWN0ZWQsIGtleSwgbWVzc2FnZSwga2V5cywgZm4pIHtcbiAgaWYgKCEoa2V5IGluIGFjdHVhbCkgfHwgIWlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbFtrZXldLCBleHBlY3RlZFtrZXldKSkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgLy8gQ3JlYXRlIHBsYWNlaG9sZGVyIG9iamVjdHMgdG8gY3JlYXRlIGEgbmljZSBvdXRwdXQuXG4gICAgICB2YXIgYSA9IG5ldyBDb21wYXJpc29uKGFjdHVhbCwga2V5cyk7XG4gICAgICB2YXIgYiA9IG5ldyBDb21wYXJpc29uKGV4cGVjdGVkLCBrZXlzLCBhY3R1YWwpO1xuICAgICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICAgIGFjdHVhbDogYSxcbiAgICAgICAgZXhwZWN0ZWQ6IGIsXG4gICAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgICAgfSk7XG4gICAgICBlcnIuYWN0dWFsID0gYWN0dWFsO1xuICAgICAgZXJyLmV4cGVjdGVkID0gZXhwZWN0ZWQ7XG4gICAgICBlcnIub3BlcmF0b3IgPSBmbi5uYW1lO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogZm4ubmFtZSxcbiAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtc2csIGZuKSB7XG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaXNSZWdFeHAoZXhwZWN0ZWQpKSByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpOyAvLyBhc3NlcnQuZG9lc05vdFRocm93IGRvZXMgbm90IGFjY2VwdCBvYmplY3RzLlxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZXhwZWN0ZWQnLCBbJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBleHBlY3RlZCk7XG4gICAgfSAvLyBIYW5kbGUgcHJpbWl0aXZlcyBwcm9wZXJseS5cblxuXG4gICAgaWYgKF90eXBlb2YoYWN0dWFsKSAhPT0gJ29iamVjdCcgfHwgYWN0dWFsID09PSBudWxsKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICAgIH0pO1xuICAgICAgZXJyLm9wZXJhdG9yID0gZm4ubmFtZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkKTsgLy8gU3BlY2lhbCBoYW5kbGUgZXJyb3JzIHRvIG1ha2Ugc3VyZSB0aGUgbmFtZSBhbmQgdGhlIG1lc3NhZ2UgYXJlIGNvbXBhcmVkXG4gICAgLy8gYXMgd2VsbC5cblxuICAgIGlmIChleHBlY3RlZCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBrZXlzLnB1c2goJ25hbWUnLCAnbWVzc2FnZScpO1xuICAgIH0gZWxzZSBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVkFMVUUoJ2Vycm9yJywgZXhwZWN0ZWQsICdtYXkgbm90IGJlIGFuIGVtcHR5IG9iamVjdCcpO1xuICAgIH1cblxuICAgIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBhY3R1YWxba2V5XSA9PT0gJ3N0cmluZycgJiYgaXNSZWdFeHAoZXhwZWN0ZWRba2V5XSkgJiYgZXhwZWN0ZWRba2V5XS50ZXN0KGFjdHVhbFtrZXldKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbXBhcmVFeGNlcHRpb25LZXkoYWN0dWFsLCBleHBlY3RlZCwga2V5LCBtc2csIGtleXMsIGZuKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBHdWFyZCBpbnN0YW5jZW9mIGFnYWluc3QgYXJyb3cgZnVuY3Rpb25zIGFzIHRoZXkgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZS5cblxuXG4gIGlmIChleHBlY3RlZC5wcm90b3R5cGUgIT09IHVuZGVmaW5lZCAmJiBhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKEVycm9yLmlzUHJvdG90eXBlT2YoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldEFjdHVhbChmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdmbicsICdGdW5jdGlvbicsIGZuKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgZm4oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG5cbiAgcmV0dXJuIE5PX0VYQ0VQVElPTl9TRU5USU5FTDtcbn1cblxuZnVuY3Rpb24gY2hlY2tJc1Byb21pc2Uob2JqKSB7XG4gIC8vIEFjY2VwdCBuYXRpdmUgRVM2IHByb21pc2VzIGFuZCBwcm9taXNlcyB0aGF0IGFyZSBpbXBsZW1lbnRlZCBpbiBhIHNpbWlsYXJcbiAgLy8gd2F5LiBEbyBub3QgYWNjZXB0IHRoZW5hYmxlcyB0aGF0IHVzZSBhIGZ1bmN0aW9uIGFzIGBvYmpgIGFuZCB0aGF0IGhhdmUgbm9cbiAgLy8gYGNhdGNoYCBoYW5kbGVyLlxuICAvLyBUT0RPOiB0aGVuYWJsZXMgYXJlIGNoZWNrZWQgdXAgdW50aWwgdGhleSBoYXZlIHRoZSBjb3JyZWN0IG1ldGhvZHMsXG4gIC8vIGJ1dCBhY2NvcmRpbmcgdG8gZG9jdW1lbnRhdGlvbiwgdGhlIGB0aGVuYCBtZXRob2Qgc2hvdWxkIHJlY2VpdmVcbiAgLy8gdGhlIGBmdWxmaWxsYCBhbmQgYHJlamVjdGAgYXJndW1lbnRzIGFzIHdlbGwgb3IgaXQgbWF5IGJlIG5ldmVyIHJlc29sdmVkLlxuICByZXR1cm4gaXNQcm9taXNlKG9iaikgfHwgb2JqICE9PSBudWxsICYmIF90eXBlb2Yob2JqKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY2F0Y2ggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JBY3R1YWwocHJvbWlzZUZuKSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0UHJvbWlzZTtcblxuICAgIGlmICh0eXBlb2YgcHJvbWlzZUZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBSZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIGlmIGBwcm9taXNlRm5gIHRocm93cyBzeW5jaHJvbm91c2x5LlxuICAgICAgcmVzdWx0UHJvbWlzZSA9IHByb21pc2VGbigpOyAvLyBGYWlsIGluIGNhc2Ugbm8gcHJvbWlzZSBpcyByZXR1cm5lZC5cblxuICAgICAgaWYgKCFjaGVja0lzUHJvbWlzZShyZXN1bHRQcm9taXNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFKCdpbnN0YW5jZSBvZiBQcm9taXNlJywgJ3Byb21pc2VGbicsIHJlc3VsdFByb21pc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hlY2tJc1Byb21pc2UocHJvbWlzZUZuKSkge1xuICAgICAgcmVzdWx0UHJvbWlzZSA9IHByb21pc2VGbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdwcm9taXNlRm4nLCBbJ0Z1bmN0aW9uJywgJ1Byb21pc2UnXSwgcHJvbWlzZUZuKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT19FWENFUFRJT05fU0VOVElORUw7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXhwZWN0c0Vycm9yKHN0YWNrU3RhcnRGbiwgYWN0dWFsLCBlcnJvciwgbWVzc2FnZSkge1xuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2Vycm9yJywgWydPYmplY3QnLCAnRXJyb3InLCAnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGVycm9yKTtcbiAgICB9XG5cbiAgICBpZiAoX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwpIHtcbiAgICAgIGlmIChhY3R1YWwubWVzc2FnZSA9PT0gZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVSUl9BTUJJR1VPVVNfQVJHVU1FTlQoJ2Vycm9yL21lc3NhZ2UnLCBcIlRoZSBlcnJvciBtZXNzYWdlIFxcXCJcIi5jb25jYXQoYWN0dWFsLm1lc3NhZ2UsIFwiXFxcIiBpcyBpZGVudGljYWwgdG8gdGhlIG1lc3NhZ2UuXCIpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjdHVhbCA9PT0gZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UKCdlcnJvci9tZXNzYWdlJywgXCJUaGUgZXJyb3IgXFxcIlwiLmNvbmNhdChhY3R1YWwsIFwiXFxcIiBpcyBpZGVudGljYWwgdG8gdGhlIG1lc3NhZ2UuXCIpKTtcbiAgICB9XG5cbiAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgZXJyb3IgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZXJyb3IgIT0gbnVsbCAmJiBfdHlwZW9mKGVycm9yKSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdlcnJvcicsIFsnT2JqZWN0JywgJ0Vycm9yJywgJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBlcnJvcik7XG4gIH1cblxuICBpZiAoYWN0dWFsID09PSBOT19FWENFUFRJT05fU0VOVElORUwpIHtcbiAgICB2YXIgZGV0YWlscyA9ICcnO1xuXG4gICAgaWYgKGVycm9yICYmIGVycm9yLm5hbWUpIHtcbiAgICAgIGRldGFpbHMgKz0gXCIgKFwiLmNvbmNhdChlcnJvci5uYW1lLCBcIilcIik7XG4gICAgfVxuXG4gICAgZGV0YWlscyArPSBtZXNzYWdlID8gXCI6IFwiLmNvbmNhdChtZXNzYWdlKSA6ICcuJztcbiAgICB2YXIgZm5UeXBlID0gc3RhY2tTdGFydEZuLm5hbWUgPT09ICdyZWplY3RzJyA/ICdyZWplY3Rpb24nIDogJ2V4Y2VwdGlvbic7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogdW5kZWZpbmVkLFxuICAgICAgZXhwZWN0ZWQ6IGVycm9yLFxuICAgICAgb3BlcmF0b3I6IHN0YWNrU3RhcnRGbi5uYW1lLFxuICAgICAgbWVzc2FnZTogXCJNaXNzaW5nIGV4cGVjdGVkIFwiLmNvbmNhdChmblR5cGUpLmNvbmNhdChkZXRhaWxzKSxcbiAgICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuXG4gICAgfSk7XG4gIH1cblxuICBpZiAoZXJyb3IgJiYgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UsIHN0YWNrU3RhcnRGbikpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwZWN0c05vRXJyb3Ioc3RhY2tTdGFydEZuLCBhY3R1YWwsIGVycm9yLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IE5PX0VYQ0VQVElPTl9TRU5USU5FTCkgcmV0dXJuO1xuXG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgbWVzc2FnZSA9IGVycm9yO1xuICAgIGVycm9yID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFlcnJvciB8fCBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGVycm9yKSkge1xuICAgIHZhciBkZXRhaWxzID0gbWVzc2FnZSA/IFwiOiBcIi5jb25jYXQobWVzc2FnZSkgOiAnLic7XG4gICAgdmFyIGZuVHlwZSA9IHN0YWNrU3RhcnRGbi5uYW1lID09PSAnZG9lc05vdFJlamVjdCcgPyAncmVqZWN0aW9uJyA6ICdleGNlcHRpb24nO1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBlcnJvcixcbiAgICAgIG9wZXJhdG9yOiBzdGFja1N0YXJ0Rm4ubmFtZSxcbiAgICAgIG1lc3NhZ2U6IFwiR290IHVud2FudGVkIFwiLmNvbmNhdChmblR5cGUpLmNvbmNhdChkZXRhaWxzLCBcIlxcblwiKSArIFwiQWN0dWFsIG1lc3NhZ2U6IFxcXCJcIi5jb25jYXQoYWN0dWFsICYmIGFjdHVhbC5tZXNzYWdlLCBcIlxcXCJcIiksXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGblxuICAgIH0pO1xuICB9XG5cbiAgdGhyb3cgYWN0dWFsO1xufVxuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24gdGhyb3dzKHByb21pc2VGbikge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cblxuICBleHBlY3RzRXJyb3IuYXBwbHkodm9pZCAwLCBbdGhyb3dzLCBnZXRBY3R1YWwocHJvbWlzZUZuKV0uY29uY2F0KGFyZ3MpKTtcbn07XG5cbmFzc2VydC5yZWplY3RzID0gZnVuY3Rpb24gcmVqZWN0cyhwcm9taXNlRm4pIHtcbiAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICBhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgcmV0dXJuIHdhaXRGb3JBY3R1YWwocHJvbWlzZUZuKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gZXhwZWN0c0Vycm9yLmFwcGx5KHZvaWQgMCwgW3JlamVjdHMsIHJlc3VsdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSk7XG59O1xuXG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24gZG9lc05vdFRocm93KGZuKSB7XG4gIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCA+IDEgPyBfbGVuNCAtIDEgOiAwKSwgX2tleTQgPSAxOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgYXJnc1tfa2V5NCAtIDFdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgfVxuXG4gIGV4cGVjdHNOb0Vycm9yLmFwcGx5KHZvaWQgMCwgW2RvZXNOb3RUaHJvdywgZ2V0QWN0dWFsKGZuKV0uY29uY2F0KGFyZ3MpKTtcbn07XG5cbmFzc2VydC5kb2VzTm90UmVqZWN0ID0gZnVuY3Rpb24gZG9lc05vdFJlamVjdChmbikge1xuICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUgPiAxID8gX2xlbjUgLSAxIDogMCksIF9rZXk1ID0gMTsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgIGFyZ3NbX2tleTUgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gIH1cblxuICByZXR1cm4gd2FpdEZvckFjdHVhbChmbikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIGV4cGVjdHNOb0Vycm9yLmFwcGx5KHZvaWQgMCwgW2RvZXNOb3RSZWplY3QsIHJlc3VsdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uIGlmRXJyb3IoZXJyKSB7XG4gIGlmIChlcnIgIT09IG51bGwgJiYgZXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdpZkVycm9yIGdvdCB1bndhbnRlZCBleGNlcHRpb246ICc7XG5cbiAgICBpZiAoX3R5cGVvZihlcnIpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXJyLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZXJyLm1lc3NhZ2UubGVuZ3RoID09PSAwICYmIGVyci5jb25zdHJ1Y3Rvcikge1xuICAgICAgICBtZXNzYWdlICs9IGVyci5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSArPSBlcnIubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPSBpbnNwZWN0KGVycik7XG4gICAgfVxuXG4gICAgdmFyIG5ld0VyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICBhY3R1YWw6IGVycixcbiAgICAgIGV4cGVjdGVkOiBudWxsLFxuICAgICAgb3BlcmF0b3I6ICdpZkVycm9yJyxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBzdGFja1N0YXJ0Rm46IGlmRXJyb3JcbiAgICB9KTsgLy8gTWFrZSBzdXJlIHdlIGFjdHVhbGx5IGhhdmUgYSBzdGFjayB0cmFjZSFcblxuICAgIHZhciBvcmlnU3RhY2sgPSBlcnIuc3RhY2s7XG5cbiAgICBpZiAodHlwZW9mIG9yaWdTdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCByZW1vdmUgYW55IGR1cGxpY2F0ZWQgZnJhbWVzIGZyb20gdGhlIGVycm9yIGZyYW1lcyB0YWtlblxuICAgICAgLy8gZnJvbSB3aXRoaW4gYGlmRXJyb3JgIGFuZCBhZGQgdGhlIG9yaWdpbmFsIGVycm9yIGZyYW1lcyB0byB0aGUgbmV3bHlcbiAgICAgIC8vIGNyZWF0ZWQgb25lcy5cbiAgICAgIHZhciB0bXAyID0gb3JpZ1N0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIHRtcDIuc2hpZnQoKTsgLy8gRmlsdGVyIGFsbCBmcmFtZXMgZXhpc3RpbmcgaW4gZXJyLnN0YWNrLlxuXG4gICAgICB2YXIgdG1wMSA9IG5ld0Vyci5zdGFjay5zcGxpdCgnXFxuJyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG1wMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBGaW5kIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBmcmFtZS5cbiAgICAgICAgdmFyIHBvcyA9IHRtcDEuaW5kZXhPZih0bXAyW2ldKTtcblxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgICAgIC8vIE9ubHkga2VlcCBuZXcgZnJhbWVzLlxuICAgICAgICAgIHRtcDEgPSB0bXAxLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3RXJyLnN0YWNrID0gXCJcIi5jb25jYXQodG1wMS5qb2luKCdcXG4nKSwgXCJcXG5cIikuY29uY2F0KHRtcDIuam9pbignXFxuJykpO1xuICAgIH1cblxuICAgIHRocm93IG5ld0VycjtcbiAgfVxufTsgLy8gRXhwb3NlIGEgc3RyaWN0IG9ubHkgdmFyaWFudCBvZiBhc3NlcnRcblxuXG5mdW5jdGlvbiBzdHJpY3QoKSB7XG4gIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiksIF9rZXk2ID0gMDsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgIGFyZ3NbX2tleTZdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgfVxuXG4gIGlubmVyT2suYXBwbHkodm9pZCAwLCBbc3RyaWN0LCBhcmdzLmxlbmd0aF0uY29uY2F0KGFyZ3MpKTtcbn1cblxuYXNzZXJ0LnN0cmljdCA9IG9iamVjdEFzc2lnbihzdHJpY3QsIGFzc2VydCwge1xuICBlcXVhbDogYXNzZXJ0LnN0cmljdEVxdWFsLFxuICBkZWVwRXF1YWw6IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwsXG4gIG5vdEVxdWFsOiBhc3NlcnQubm90U3RyaWN0RXF1YWwsXG4gIG5vdERlZXBFcXVhbDogYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbFxufSk7XG5hc3NlcnQuc3RyaWN0LnN0cmljdCA9IGFzc2VydC5zdHJpY3Q7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzA4MTc4NDBmNzc1MDMyMTY5ZGRkNzBjODVhYzA1OWYxOGZmY2M4MWNcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTsgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7IG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7IH0pKTsgfSBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgdmFyIF9jYWNoZSA9IHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiA/IG5ldyBNYXAoKSA6IHVuZGVmaW5lZDsgX3dyYXBOYXRpdmVTdXBlciA9IGZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgaWYgKENsYXNzID09PSBudWxsIHx8ICFfaXNOYXRpdmVGdW5jdGlvbihDbGFzcykpIHJldHVybiBDbGFzczsgaWYgKHR5cGVvZiBDbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBpZiAodHlwZW9mIF9jYWNoZSAhPT0gXCJ1bmRlZmluZWRcIikgeyBpZiAoX2NhY2hlLmhhcyhDbGFzcykpIHJldHVybiBfY2FjaGUuZ2V0KENsYXNzKTsgX2NhY2hlLnNldChDbGFzcywgV3JhcHBlcik7IH0gZnVuY3Rpb24gV3JhcHBlcigpIHsgcmV0dXJuIF9jb25zdHJ1Y3QoQ2xhc3MsIGFyZ3VtZW50cywgX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yKTsgfSBXcmFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBXcmFwcGVyLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyByZXR1cm4gX3NldFByb3RvdHlwZU9mKFdyYXBwZXIsIENsYXNzKTsgfTsgcmV0dXJuIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDsgfSBlbHNlIHsgX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykgeyB2YXIgYSA9IFtudWxsXTsgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpOyB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7IHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpOyBpZiAoQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTsgcmV0dXJuIGluc3RhbmNlOyB9OyB9IHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlRnVuY3Rpb24oZm4pIHsgcmV0dXJuIEZ1bmN0aW9uLnRvU3RyaW5nLmNhbGwoZm4pLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpICE9PSAtMTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ3V0aWwvJyksXG4gICAgaW5zcGVjdCA9IF9yZXF1aXJlLmluc3BlY3Q7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuLi9lcnJvcnMnKSxcbiAgICBFUlJfSU5WQUxJRF9BUkdfVFlQRSA9IF9yZXF1aXJlMi5jb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRTsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2VuZHNXaXRoXG5cblxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2gsIHRoaXNfbGVuKSB7XG4gIGlmICh0aGlzX2xlbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXNfbGVuID4gc3RyLmxlbmd0aCkge1xuICAgIHRoaXNfbGVuID0gc3RyLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXNfbGVuIC0gc2VhcmNoLmxlbmd0aCwgdGhpc19sZW4pID09PSBzZWFyY2g7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9yZXBlYXRcblxuXG5mdW5jdGlvbiByZXBlYXQoc3RyLCBjb3VudCkge1xuICBjb3VudCA9IE1hdGguZmxvb3IoY291bnQpO1xuICBpZiAoc3RyLmxlbmd0aCA9PSAwIHx8IGNvdW50ID09IDApIHJldHVybiAnJztcbiAgdmFyIG1heENvdW50ID0gc3RyLmxlbmd0aCAqIGNvdW50O1xuICBjb3VudCA9IE1hdGguZmxvb3IoTWF0aC5sb2coY291bnQpIC8gTWF0aC5sb2coMikpO1xuXG4gIHdoaWxlIChjb3VudCkge1xuICAgIHN0ciArPSBzdHI7XG4gICAgY291bnQtLTtcbiAgfVxuXG4gIHN0ciArPSBzdHIuc3Vic3RyaW5nKDAsIG1heENvdW50IC0gc3RyLmxlbmd0aCk7XG4gIHJldHVybiBzdHI7XG59XG5cbnZhciBibHVlID0gJyc7XG52YXIgZ3JlZW4gPSAnJztcbnZhciByZWQgPSAnJztcbnZhciB3aGl0ZSA9ICcnO1xudmFyIGtSZWFkYWJsZU9wZXJhdG9yID0ge1xuICBkZWVwU3RyaWN0RXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgc3RyaWN0bHkgZGVlcC1lcXVhbDonLFxuICBzdHJpY3RFcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBzdHJpY3RseSBlcXVhbDonLFxuICBzdHJpY3RFcXVhbE9iamVjdDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgcmVmZXJlbmNlLWVxdWFsIHRvIFwiZXhwZWN0ZWRcIjonLFxuICBkZWVwRXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgbG9vc2VseSBkZWVwLWVxdWFsOicsXG4gIGVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIGxvb3NlbHkgZXF1YWw6JyxcbiAgbm90RGVlcFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiBub3QgdG8gYmUgc3RyaWN0bHkgZGVlcC1lcXVhbCB0bzonLFxuICBub3RTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgc3RyaWN0bHkgdW5lcXVhbCB0bzonLFxuICBub3RTdHJpY3RFcXVhbE9iamVjdDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIHJlZmVyZW5jZS1lcXVhbCB0byBcImV4cGVjdGVkXCI6JyxcbiAgbm90RGVlcEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiBub3QgdG8gYmUgbG9vc2VseSBkZWVwLWVxdWFsIHRvOicsXG4gIG5vdEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiB0byBiZSBsb29zZWx5IHVuZXF1YWwgdG86JyxcbiAgbm90SWRlbnRpY2FsOiAnVmFsdWVzIGlkZW50aWNhbCBidXQgbm90IHJlZmVyZW5jZS1lcXVhbDonXG59OyAvLyBDb21wYXJpbmcgc2hvcnQgcHJpbWl0aXZlcyBzaG91bGQganVzdCBzaG93ID09PSAvICE9PSBpbnN0ZWFkIG9mIHVzaW5nIHRoZVxuLy8gZGlmZi5cblxudmFyIGtNYXhTaG9ydExlbmd0aCA9IDEwO1xuXG5mdW5jdGlvbiBjb3B5RXJyb3Ioc291cmNlKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIHRhcmdldCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkpO1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCAnbWVzc2FnZScsIHtcbiAgICB2YWx1ZTogc291cmNlLm1lc3NhZ2VcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3RWYWx1ZSh2YWwpIHtcbiAgLy8gVGhlIHV0aWwuaW5zcGVjdCBkZWZhdWx0IHZhbHVlcyBjb3VsZCBiZSBjaGFuZ2VkLiBUaGlzIG1ha2VzIHN1cmUgdGhlXG4gIC8vIGVycm9yIG1lc3NhZ2VzIGNvbnRhaW4gdGhlIG5lY2Vzc2FyeSBpbmZvcm1hdGlvbiBuZXZlcnRoZWxlc3MuXG4gIHJldHVybiBpbnNwZWN0KHZhbCwge1xuICAgIGNvbXBhY3Q6IGZhbHNlLFxuICAgIGN1c3RvbUluc3BlY3Q6IGZhbHNlLFxuICAgIGRlcHRoOiAxMDAwLFxuICAgIG1heEFycmF5TGVuZ3RoOiBJbmZpbml0eSxcbiAgICAvLyBBc3NlcnQgY29tcGFyZXMgb25seSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgKHdpdGggYSBmZXcgZXhjZXB0aW9ucykuXG4gICAgc2hvd0hpZGRlbjogZmFsc2UsXG4gICAgLy8gSGF2aW5nIGEgbG9uZyBsaW5lIGFzIGVycm9yIGlzIGJldHRlciB0aGFuIHdyYXBwaW5nIHRoZSBsaW5lIGZvclxuICAgIC8vIGNvbXBhcmlzb24gZm9yIG5vdy5cbiAgICAvLyBUT0RPKEJyaWRnZUFSKTogYGJyZWFrTGVuZ3RoYCBzaG91bGQgYmUgbGltaXRlZCBhcyBzb29uIGFzIHNvb24gYXMgd2VcbiAgICAvLyBoYXZlIG1ldGEgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGluc3BlY3RlZCBwcm9wZXJ0aWVzIChpLmUuLCBrbm93IHdoZXJlXG4gICAgLy8gaW4gd2hhdCBsaW5lIHRoZSBwcm9wZXJ0eSBzdGFydHMgYW5kIGVuZHMpLlxuICAgIGJyZWFrTGVuZ3RoOiBJbmZpbml0eSxcbiAgICAvLyBBc3NlcnQgZG9lcyBub3QgZGV0ZWN0IHByb3hpZXMgY3VycmVudGx5LlxuICAgIHNob3dQcm94eTogZmFsc2UsXG4gICAgc29ydGVkOiB0cnVlLFxuICAgIC8vIEluc3BlY3QgZ2V0dGVycyBhcyB3ZSBhbHNvIGNoZWNrIHRoZW0gd2hlbiBjb21wYXJpbmcgZW50cmllcy5cbiAgICBnZXR0ZXJzOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFcnJEaWZmKGFjdHVhbCwgZXhwZWN0ZWQsIG9wZXJhdG9yKSB7XG4gIHZhciBvdGhlciA9ICcnO1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciBsYXN0UG9zID0gMDtcbiAgdmFyIGVuZCA9ICcnO1xuICB2YXIgc2tpcHBlZCA9IGZhbHNlO1xuICB2YXIgYWN0dWFsSW5zcGVjdGVkID0gaW5zcGVjdFZhbHVlKGFjdHVhbCk7XG4gIHZhciBhY3R1YWxMaW5lcyA9IGFjdHVhbEluc3BlY3RlZC5zcGxpdCgnXFxuJyk7XG4gIHZhciBleHBlY3RlZExpbmVzID0gaW5zcGVjdFZhbHVlKGV4cGVjdGVkKS5zcGxpdCgnXFxuJyk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGluZGljYXRvciA9ICcnOyAvLyBJbiBjYXNlIGJvdGggdmFsdWVzIGFyZSBvYmplY3RzIGV4cGxpY2l0bHkgbWFyayB0aGVtIGFzIG5vdCByZWZlcmVuY2UgZXF1YWxcbiAgLy8gZm9yIHRoZSBgc3RyaWN0RXF1YWxgIG9wZXJhdG9yLlxuXG4gIGlmIChvcGVyYXRvciA9PT0gJ3N0cmljdEVxdWFsJyAmJiBfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIF90eXBlb2YoZXhwZWN0ZWQpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwgJiYgZXhwZWN0ZWQgIT09IG51bGwpIHtcbiAgICBvcGVyYXRvciA9ICdzdHJpY3RFcXVhbE9iamVjdCc7XG4gIH0gLy8gSWYgXCJhY3R1YWxcIiBhbmQgXCJleHBlY3RlZFwiIGZpdCBvbiBhIHNpbmdsZSBsaW5lIGFuZCB0aGV5IGFyZSBub3Qgc3RyaWN0bHlcbiAgLy8gZXF1YWwsIGNoZWNrIGZ1cnRoZXIgc3BlY2lhbCBoYW5kbGluZy5cblxuXG4gIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPT09IDEgJiYgZXhwZWN0ZWRMaW5lcy5sZW5ndGggPT09IDEgJiYgYWN0dWFsTGluZXNbMF0gIT09IGV4cGVjdGVkTGluZXNbMF0pIHtcbiAgICB2YXIgaW5wdXRMZW5ndGggPSBhY3R1YWxMaW5lc1swXS5sZW5ndGggKyBleHBlY3RlZExpbmVzWzBdLmxlbmd0aDsgLy8gSWYgdGhlIGNoYXJhY3RlciBsZW5ndGggb2YgXCJhY3R1YWxcIiBhbmQgXCJleHBlY3RlZFwiIHRvZ2V0aGVyIGlzIGxlc3MgdGhhblxuICAgIC8vIGtNYXhTaG9ydExlbmd0aCBhbmQgaWYgbmVpdGhlciBpcyBhbiBvYmplY3QgYW5kIGF0IGxlYXN0IG9uZSBvZiB0aGVtIGlzXG4gICAgLy8gbm90IGB6ZXJvYCwgdXNlIHRoZSBzdHJpY3QgZXF1YWwgY29tcGFyaXNvbiB0byB2aXN1YWxpemUgdGhlIG91dHB1dC5cblxuICAgIGlmIChpbnB1dExlbmd0aCA8PSBrTWF4U2hvcnRMZW5ndGgpIHtcbiAgICAgIGlmICgoX3R5cGVvZihhY3R1YWwpICE9PSAnb2JqZWN0JyB8fCBhY3R1YWwgPT09IG51bGwpICYmIChfdHlwZW9mKGV4cGVjdGVkKSAhPT0gJ29iamVjdCcgfHwgZXhwZWN0ZWQgPT09IG51bGwpICYmIChhY3R1YWwgIT09IDAgfHwgZXhwZWN0ZWQgIT09IDApKSB7XG4gICAgICAgIC8vIC0wID09PSArMFxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdLCBcIlxcblxcblwiKSArIFwiXCIuY29uY2F0KGFjdHVhbExpbmVzWzBdLCBcIiAhPT0gXCIpLmNvbmNhdChleHBlY3RlZExpbmVzWzBdLCBcIlxcblwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yICE9PSAnc3RyaWN0RXF1YWxPYmplY3QnKSB7XG4gICAgICAvLyBJZiB0aGUgc3RkZXJyIGlzIGEgdHR5IGFuZCB0aGUgaW5wdXQgbGVuZ3RoIGlzIGxvd2VyIHRoYW4gdGhlIGN1cnJlbnRcbiAgICAgIC8vIGNvbHVtbnMgcGVyIGxpbmUsIGFkZCBhIG1pc21hdGNoIGluZGljYXRvciBiZWxvdyB0aGUgb3V0cHV0LiBJZiBpdCBpc1xuICAgICAgLy8gbm90IGEgdHR5LCB1c2UgYSBkZWZhdWx0IHZhbHVlIG9mIDgwIGNoYXJhY3RlcnMuXG4gICAgICB2YXIgbWF4TGVuZ3RoID0gcHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkgPyBwcm9jZXNzLnN0ZGVyci5jb2x1bW5zIDogODA7XG5cbiAgICAgIGlmIChpbnB1dExlbmd0aCA8IG1heExlbmd0aCkge1xuICAgICAgICB3aGlsZSAoYWN0dWFsTGluZXNbMF1baV0gPT09IGV4cGVjdGVkTGluZXNbMF1baV0pIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH0gLy8gSWdub3JlIHRoZSBmaXJzdCBjaGFyYWN0ZXJzLlxuXG5cbiAgICAgICAgaWYgKGkgPiAyKSB7XG4gICAgICAgICAgLy8gQWRkIHBvc2l0aW9uIGluZGljYXRvciBmb3IgdGhlIGZpcnN0IG1pc21hdGNoIGluIGNhc2UgaXQgaXMgYVxuICAgICAgICAgIC8vIHNpbmdsZSBsaW5lIGFuZCB0aGUgaW5wdXQgbGVuZ3RoIGlzIGxlc3MgdGhhbiB0aGUgY29sdW1uIGxlbmd0aC5cbiAgICAgICAgICBpbmRpY2F0b3IgPSBcIlxcbiAgXCIuY29uY2F0KHJlcGVhdCgnICcsIGkpLCBcIl5cIik7XG4gICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gUmVtb3ZlIGFsbCBlbmRpbmcgbGluZXMgdGhhdCBtYXRjaCAodGhpcyBvcHRpbWl6ZXMgdGhlIG91dHB1dCBmb3JcbiAgLy8gcmVhZGFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIG51bWJlciBvZiB0b3RhbCBjaGFuZ2VkIGxpbmVzKS5cblxuXG4gIHZhciBhID0gYWN0dWFsTGluZXNbYWN0dWFsTGluZXMubGVuZ3RoIC0gMV07XG4gIHZhciBiID0gZXhwZWN0ZWRMaW5lc1tleHBlY3RlZExpbmVzLmxlbmd0aCAtIDFdO1xuXG4gIHdoaWxlIChhID09PSBiKSB7XG4gICAgaWYgKGkrKyA8IDIpIHtcbiAgICAgIGVuZCA9IFwiXFxuICBcIi5jb25jYXQoYSkuY29uY2F0KGVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG90aGVyID0gYTtcbiAgICB9XG5cbiAgICBhY3R1YWxMaW5lcy5wb3AoKTtcbiAgICBleHBlY3RlZExpbmVzLnBvcCgpO1xuICAgIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPT09IDAgfHwgZXhwZWN0ZWRMaW5lcy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgIGEgPSBhY3R1YWxMaW5lc1thY3R1YWxMaW5lcy5sZW5ndGggLSAxXTtcbiAgICBiID0gZXhwZWN0ZWRMaW5lc1tleHBlY3RlZExpbmVzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgdmFyIG1heExpbmVzID0gTWF0aC5tYXgoYWN0dWFsTGluZXMubGVuZ3RoLCBleHBlY3RlZExpbmVzLmxlbmd0aCk7IC8vIFN0cmljdCBlcXVhbCB3aXRoIGlkZW50aWNhbCBvYmplY3RzIHRoYXQgYXJlIG5vdCBpZGVudGljYWwgYnkgcmVmZXJlbmNlLlxuICAvLyBFLmcuLCBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHsgYTogU3ltYm9sKCkgfSwgeyBhOiBTeW1ib2woKSB9KVxuXG4gIGlmIChtYXhMaW5lcyA9PT0gMCkge1xuICAgIC8vIFdlIGhhdmUgdG8gZ2V0IHRoZSByZXN1bHQgYWdhaW4uIFRoZSBsaW5lcyB3ZXJlIGFsbCByZW1vdmVkIGJlZm9yZS5cbiAgICB2YXIgX2FjdHVhbExpbmVzID0gYWN0dWFsSW5zcGVjdGVkLnNwbGl0KCdcXG4nKTsgLy8gT25seSByZW1vdmUgbGluZXMgaW4gY2FzZSBpdCBtYWtlcyBzZW5zZSB0byBjb2xsYXBzZSB0aG9zZS5cbiAgICAvLyBUT0RPOiBBY2NlcHQgZW52IHRvIGFsd2F5cyBzaG93IHRoZSBmdWxsIGVycm9yLlxuXG5cbiAgICBpZiAoX2FjdHVhbExpbmVzLmxlbmd0aCA+IDMwKSB7XG4gICAgICBfYWN0dWFsTGluZXNbMjZdID0gXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcblxuICAgICAgd2hpbGUgKF9hY3R1YWxMaW5lcy5sZW5ndGggPiAyNykge1xuICAgICAgICBfYWN0dWFsTGluZXMucG9wKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGtSZWFkYWJsZU9wZXJhdG9yLm5vdElkZW50aWNhbCwgXCJcXG5cXG5cIikuY29uY2F0KF9hY3R1YWxMaW5lcy5qb2luKCdcXG4nKSwgXCJcXG5cIik7XG4gIH1cblxuICBpZiAoaSA+IDMpIHtcbiAgICBlbmQgPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpLmNvbmNhdChlbmQpO1xuICAgIHNraXBwZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKG90aGVyICE9PSAnJykge1xuICAgIGVuZCA9IFwiXFxuICBcIi5jb25jYXQob3RoZXIpLmNvbmNhdChlbmQpO1xuICAgIG90aGVyID0gJyc7XG4gIH1cblxuICB2YXIgcHJpbnRlZExpbmVzID0gMDtcbiAgdmFyIG1zZyA9IGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXSArIFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIisgYWN0dWFsXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChyZWQsIFwiLSBleHBlY3RlZFwiKS5jb25jYXQod2hpdGUpO1xuICB2YXIgc2tpcHBlZE1zZyA9IFwiIFwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUsIFwiIExpbmVzIHNraXBwZWRcIik7XG5cbiAgZm9yIChpID0gMDsgaSA8IG1heExpbmVzOyBpKyspIHtcbiAgICAvLyBPbmx5IGV4dHJhIGV4cGVjdGVkIGxpbmVzIGV4aXN0XG4gICAgdmFyIGN1ciA9IGkgLSBsYXN0UG9zO1xuXG4gICAgaWYgKGFjdHVhbExpbmVzLmxlbmd0aCA8IGkgKyAxKSB7XG4gICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGV4cGVjdGVkTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGV4cGVjdGVkTGluZXNbaSAtIDFdKTtcbiAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICB9IC8vIE1hcmsgdGhlIGN1cnJlbnQgbGluZSBhcyB0aGUgbGFzdCBkaXZlcmdpbmcgb25lLlxuXG5cbiAgICAgIGxhc3RQb3MgPSBpOyAvLyBBZGQgdGhlIGV4cGVjdGVkIGxpbmUgdG8gdGhlIGNhY2hlLlxuXG4gICAgICBvdGhlciArPSBcIlxcblwiLmNvbmNhdChyZWQsIFwiLVwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lc1tpXSk7XG4gICAgICBwcmludGVkTGluZXMrKzsgLy8gT25seSBleHRyYSBhY3R1YWwgbGluZXMgZXhpc3RcbiAgICB9IGVsc2UgaWYgKGV4cGVjdGVkTGluZXMubGVuZ3RoIDwgaSArIDEpIHtcbiAgICAgIC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIG1vcmUgdGhhbiBvbmUgbGluZSBhYm92ZSBhbmQgdGhlXG4gICAgICAvLyBjdXJyZW50IGxpbmUgaXMgYXQgbGVhc3QgbGluZSB0aHJlZSwgYWRkIHNvbWUgb2YgdGhlIGZvcm1lciBsaW5lcyBhbmRcbiAgICAgIC8vIGFsc28gYWRkIGRvdHMgdG8gaW5kaWNhdGUgc2tpcHBlZCBlbnRyaWVzLlxuICAgICAgaWYgKGN1ciA+IDEgJiYgaSA+IDIpIHtcbiAgICAgICAgaWYgKGN1ciA+IDQpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgICAgICBza2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXIgPiAzKSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAxXSk7XG4gICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgfSAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cblxuXG4gICAgICBsYXN0UG9zID0gaTsgLy8gQWRkIHRoZSBhY3R1YWwgbGluZSB0byB0aGUgcmVzdWx0LlxuXG4gICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoZ3JlZW4sIFwiK1wiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoYWN0dWFsTGluZXNbaV0pO1xuICAgICAgcHJpbnRlZExpbmVzKys7IC8vIExpbmVzIGRpdmVyZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV4cGVjdGVkTGluZSA9IGV4cGVjdGVkTGluZXNbaV07XG4gICAgICB2YXIgYWN0dWFsTGluZSA9IGFjdHVhbExpbmVzW2ldOyAvLyBJZiB0aGUgbGluZXMgZGl2ZXJnZSwgc3BlY2lmaWNhbGx5IGNoZWNrIGZvciBsaW5lcyB0aGF0IG9ubHkgZGl2ZXJnZSBieVxuICAgICAgLy8gYSB0cmFpbGluZyBjb21tYS4gSW4gdGhhdCBjYXNlIGl0IGlzIGFjdHVhbGx5IGlkZW50aWNhbCBhbmQgd2Ugc2hvdWxkXG4gICAgICAvLyBtYXJrIGl0IGFzIHN1Y2guXG5cbiAgICAgIHZhciBkaXZlcmdpbmdMaW5lcyA9IGFjdHVhbExpbmUgIT09IGV4cGVjdGVkTGluZSAmJiAoIWVuZHNXaXRoKGFjdHVhbExpbmUsICcsJykgfHwgYWN0dWFsTGluZS5zbGljZSgwLCAtMSkgIT09IGV4cGVjdGVkTGluZSk7IC8vIElmIHRoZSBleHBlY3RlZCBsaW5lIGhhcyBhIHRyYWlsaW5nIGNvbW1hIGJ1dCBpcyBvdGhlcndpc2UgaWRlbnRpY2FsLFxuICAgICAgLy8gYWRkIGEgY29tbWEgYXQgdGhlIGVuZCBvZiB0aGUgYWN0dWFsIGxpbmUuIE90aGVyd2lzZSB0aGUgb3V0cHV0IGNvdWxkXG4gICAgICAvLyBsb29rIHdlaXJkIGFzIGluOlxuICAgICAgLy9cbiAgICAgIC8vICAgW1xuICAgICAgLy8gICAgIDEgICAgICAgICAvLyBObyBjb21tYSBhdCB0aGUgZW5kIVxuICAgICAgLy8gKyAgIDJcbiAgICAgIC8vICAgXVxuICAgICAgLy9cblxuICAgICAgaWYgKGRpdmVyZ2luZ0xpbmVzICYmIGVuZHNXaXRoKGV4cGVjdGVkTGluZSwgJywnKSAmJiBleHBlY3RlZExpbmUuc2xpY2UoMCwgLTEpID09PSBhY3R1YWxMaW5lKSB7XG4gICAgICAgIGRpdmVyZ2luZ0xpbmVzID0gZmFsc2U7XG4gICAgICAgIGFjdHVhbExpbmUgKz0gJywnO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGl2ZXJnaW5nTGluZXMpIHtcbiAgICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAgIC8vIGFsc28gYWRkIGRvdHMgdG8gaW5kaWNhdGUgc2tpcHBlZCBlbnRyaWVzLlxuICAgICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAxXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH0gLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG5cblxuICAgICAgICBsYXN0UG9zID0gaTsgLy8gQWRkIHRoZSBhY3R1YWwgbGluZSB0byB0aGUgcmVzdWx0IGFuZCBjYWNoZSB0aGUgZXhwZWN0ZWQgZGl2ZXJnaW5nXG4gICAgICAgIC8vIGxpbmUgc28gY29uc2VjdXRpdmUgZGl2ZXJnaW5nIGxpbmVzIHNob3cgdXAgYXMgKysrLS0tIGFuZCBub3QgKy0rLSstLlxuXG4gICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChhY3R1YWxMaW5lKTtcbiAgICAgICAgb3RoZXIgKz0gXCJcXG5cIi5jb25jYXQocmVkLCBcIi1cIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkTGluZSk7XG4gICAgICAgIHByaW50ZWRMaW5lcyArPSAyOyAvLyBMaW5lcyBhcmUgaWRlbnRpY2FsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgYWxsIGNhY2hlZCBpbmZvcm1hdGlvbiB0byB0aGUgcmVzdWx0IGJlZm9yZSBhZGRpbmcgb3RoZXIgdGhpbmdzXG4gICAgICAgIC8vIGFuZCByZXNldCB0aGUgY2FjaGUuXG4gICAgICAgIHJlcyArPSBvdGhlcjtcbiAgICAgICAgb3RoZXIgPSAnJzsgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgZXhhY3RseSBvbmUgbGluZSBhYm92ZSBvciBpZiBpdCBpcyB0aGVcbiAgICAgICAgLy8gdmVyeSBmaXJzdCBsaW5lLCBhZGQgdGhlIGxpbmUgdG8gdGhlIHJlc3VsdC5cblxuICAgICAgICBpZiAoY3VyID09PSAxIHx8IGkgPT09IDApIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gSW5zcGVjdGVkIG9iamVjdCB0byBiaWcgKFNob3cgfjIwIHJvd3MgbWF4KVxuXG5cbiAgICBpZiAocHJpbnRlZExpbmVzID4gMjAgJiYgaSA8IG1heExpbmVzIC0gMikge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KG1zZykuY29uY2F0KHNraXBwZWRNc2csIFwiXFxuXCIpLmNvbmNhdChyZXMsIFwiXFxuXCIpLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpLmNvbmNhdChvdGhlciwgXCJcXG5cIikgKyBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBcIlwiLmNvbmNhdChtc2cpLmNvbmNhdChza2lwcGVkID8gc2tpcHBlZE1zZyA6ICcnLCBcIlxcblwiKS5jb25jYXQocmVzKS5jb25jYXQob3RoZXIpLmNvbmNhdChlbmQpLmNvbmNhdChpbmRpY2F0b3IpO1xufVxuXG52YXIgQXNzZXJ0aW9uRXJyb3IgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9FcnJvcikge1xuICBfaW5oZXJpdHMoQXNzZXJ0aW9uRXJyb3IsIF9FcnJvcik7XG5cbiAgZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBc3NlcnRpb25FcnJvcik7XG5cbiAgICBpZiAoX3R5cGVvZihvcHRpb25zKSAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdvcHRpb25zJywgJ09iamVjdCcsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlLFxuICAgICAgICBvcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3IsXG4gICAgICAgIHN0YWNrU3RhcnRGbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZuO1xuICAgIHZhciBhY3R1YWwgPSBvcHRpb25zLmFjdHVhbCxcbiAgICAgICAgZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuICAgIHZhciBsaW1pdCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdDtcbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAwO1xuXG4gICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkge1xuICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgU3RyaW5nKG1lc3NhZ2UpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5pc1RUWSkge1xuICAgICAgICAvLyBSZXNldCBvbiBlYWNoIGNhbGwgdG8gbWFrZSBzdXJlIHdlIGhhbmRsZSBkeW5hbWljYWxseSBzZXQgZW52aXJvbm1lbnRcbiAgICAgICAgLy8gdmFyaWFibGVzIGNvcnJlY3QuXG4gICAgICAgIGlmIChwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5nZXRDb2xvckRlcHRoICYmIHByb2Nlc3Muc3RkZXJyLmdldENvbG9yRGVwdGgoKSAhPT0gMSkge1xuICAgICAgICAgIGJsdWUgPSBcIlxceDFCWzM0bVwiO1xuICAgICAgICAgIGdyZWVuID0gXCJcXHgxQlszMm1cIjtcbiAgICAgICAgICB3aGl0ZSA9IFwiXFx4MUJbMzltXCI7XG4gICAgICAgICAgcmVkID0gXCJcXHgxQlszMW1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBibHVlID0gJyc7XG4gICAgICAgICAgZ3JlZW4gPSAnJztcbiAgICAgICAgICB3aGl0ZSA9ICcnO1xuICAgICAgICAgIHJlZCA9ICcnO1xuICAgICAgICB9XG4gICAgICB9IC8vIFByZXZlbnQgdGhlIGVycm9yIHN0YWNrIGZyb20gYmVpbmcgdmlzaWJsZSBieSBkdXBsaWNhdGluZyB0aGUgZXJyb3JcbiAgICAgIC8vIGluIGEgdmVyeSBjbG9zZSB3YXkgdG8gdGhlIG9yaWdpbmFsIGluIGNhc2UgYm90aCBzaWRlcyBhcmUgYWN0dWFsbHlcbiAgICAgIC8vIGluc3RhbmNlcyBvZiBFcnJvci5cblxuXG4gICAgICBpZiAoX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwgJiYgX3R5cGVvZihleHBlY3RlZCkgPT09ICdvYmplY3QnICYmIGV4cGVjdGVkICE9PSBudWxsICYmICdzdGFjaycgaW4gYWN0dWFsICYmIGFjdHVhbCBpbnN0YW5jZW9mIEVycm9yICYmICdzdGFjaycgaW4gZXhwZWN0ZWQgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBhY3R1YWwgPSBjb3B5RXJyb3IoYWN0dWFsKTtcbiAgICAgICAgZXhwZWN0ZWQgPSBjb3B5RXJyb3IoZXhwZWN0ZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3BlcmF0b3IgPT09ICdkZWVwU3RyaWN0RXF1YWwnIHx8IG9wZXJhdG9yID09PSAnc3RyaWN0RXF1YWwnKSB7XG4gICAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIGNyZWF0ZUVyckRpZmYoYWN0dWFsLCBleHBlY3RlZCwgb3BlcmF0b3IpKSk7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSAnbm90RGVlcFN0cmljdEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ25vdFN0cmljdEVxdWFsJykge1xuICAgICAgICAvLyBJbiBjYXNlIHRoZSBvYmplY3RzIGFyZSBlcXVhbCBidXQgdGhlIG9wZXJhdG9yIHJlcXVpcmVzIHVuZXF1YWwsIHNob3dcbiAgICAgICAgLy8gdGhlIGZpcnN0IG9iamVjdCBhbmQgc2F5IEEgZXF1YWxzIEJcbiAgICAgICAgdmFyIGJhc2UgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl07XG4gICAgICAgIHZhciByZXMgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKS5zcGxpdCgnXFxuJyk7IC8vIEluIGNhc2UgXCJhY3R1YWxcIiBpcyBhbiBvYmplY3QsIGl0IHNob3VsZCBub3QgYmUgcmVmZXJlbmNlIGVxdWFsLlxuXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ25vdFN0cmljdEVxdWFsJyAmJiBfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGJhc2UgPSBrUmVhZGFibGVPcGVyYXRvci5ub3RTdHJpY3RFcXVhbE9iamVjdDtcbiAgICAgICAgfSAvLyBPbmx5IHJlbW92ZSBsaW5lcyBpbiBjYXNlIGl0IG1ha2VzIHNlbnNlIHRvIGNvbGxhcHNlIHRob3NlLlxuICAgICAgICAvLyBUT0RPOiBBY2NlcHQgZW52IHRvIGFsd2F5cyBzaG93IHRoZSBmdWxsIGVycm9yLlxuXG5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAzMCkge1xuICAgICAgICAgIHJlc1syNl0gPSBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuXG4gICAgICAgICAgd2hpbGUgKHJlcy5sZW5ndGggPiAyNykge1xuICAgICAgICAgICAgcmVzLnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBPbmx5IHByaW50IGEgc2luZ2xlIGlucHV0LlxuXG5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChiYXNlLCBcIiBcIikuY29uY2F0KHJlc1swXSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChiYXNlLCBcIlxcblxcblwiKS5jb25jYXQocmVzLmpvaW4oJ1xcbicpLCBcIlxcblwiKSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3JlcyA9IGluc3BlY3RWYWx1ZShhY3R1YWwpO1xuXG4gICAgICAgIHZhciBvdGhlciA9ICcnO1xuICAgICAgICB2YXIga25vd25PcGVyYXRvcnMgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl07XG5cbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnbm90RGVlcEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ25vdEVxdWFsJykge1xuICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0sIFwiXFxuXFxuXCIpLmNvbmNhdChfcmVzKTtcblxuICAgICAgICAgIGlmIChfcmVzLmxlbmd0aCA+IDEwMjQpIHtcbiAgICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChfcmVzLnNsaWNlKDAsIDEwMjEpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3RoZXIgPSBcIlwiLmNvbmNhdChpbnNwZWN0VmFsdWUoZXhwZWN0ZWQpKTtcblxuICAgICAgICAgIGlmIChfcmVzLmxlbmd0aCA+IDUxMikge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KF9yZXMuc2xpY2UoMCwgNTA5KSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG90aGVyLmxlbmd0aCA+IDUxMikge1xuICAgICAgICAgICAgb3RoZXIgPSBcIlwiLmNvbmNhdChvdGhlci5zbGljZSgwLCA1MDkpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdkZWVwRXF1YWwnIHx8IG9wZXJhdG9yID09PSAnZXF1YWwnKSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoa25vd25PcGVyYXRvcnMsIFwiXFxuXFxuXCIpLmNvbmNhdChfcmVzLCBcIlxcblxcbnNob3VsZCBlcXVhbFxcblxcblwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3RoZXIgPSBcIiBcIi5jb25jYXQob3BlcmF0b3IsIFwiIFwiKS5jb25jYXQob3RoZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIFwiXCIuY29uY2F0KF9yZXMpLmNvbmNhdChvdGhlcikpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBsaW1pdDtcbiAgICBfdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gIW1lc3NhZ2U7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCAnbmFtZScsIHtcbiAgICAgIHZhbHVlOiAnQXNzZXJ0aW9uRXJyb3IgW0VSUl9BU1NFUlRJT05dJyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfdGhpcy5jb2RlID0gJ0VSUl9BU1NFUlRJT04nO1xuICAgIF90aGlzLmFjdHVhbCA9IGFjdHVhbDtcbiAgICBfdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICAgIF90aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHN0YWNrU3RhcnRGbik7XG4gICAgfSAvLyBDcmVhdGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGUgaW4gdGhlIG5hbWUuXG5cblxuICAgIF90aGlzLnN0YWNrOyAvLyBSZXNldCB0aGUgbmFtZS5cblxuICAgIF90aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXNzZXJ0aW9uRXJyb3IsIFt7XG4gICAga2V5OiBcInRvU3RyaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHRoaXMubmFtZSwgXCIgW1wiKS5jb25jYXQodGhpcy5jb2RlLCBcIl06IFwiKS5jb25jYXQodGhpcy5tZXNzYWdlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IGluc3BlY3QuY3VzdG9tLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShyZWN1cnNlVGltZXMsIGN0eCkge1xuICAgICAgLy8gVGhpcyBsaW1pdHMgdGhlIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgIHByb3BlcnR5IGRlZmF1bHQgaW5zcGVjdGlvbiB0b1xuICAgICAgLy8gdGhlIG1pbmltdW0gZGVwdGguIE90aGVyd2lzZSB0aG9zZSB2YWx1ZXMgd291bGQgYmUgdG9vIHZlcmJvc2UgY29tcGFyZWRcbiAgICAgIC8vIHRvIHRoZSBhY3R1YWwgZXJyb3IgbWVzc2FnZSB3aGljaCBjb250YWlucyBhIGNvbWJpbmVkIHZpZXcgb2YgdGhlc2UgdHdvXG4gICAgICAvLyBpbnB1dCB2YWx1ZXMuXG4gICAgICByZXR1cm4gaW5zcGVjdCh0aGlzLCBfb2JqZWN0U3ByZWFkKHt9LCBjdHgsIHtcbiAgICAgICAgY3VzdG9tSW5zcGVjdDogZmFsc2UsXG4gICAgICAgIGRlcHRoOiAwXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFzc2VydGlvbkVycm9yO1xufShfd3JhcE5hdGl2ZVN1cGVyKEVycm9yKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXJ0aW9uRXJyb3I7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC9lcnJvcnMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvM2IwNDQ5NjJjNDhmZTMxMzkwNTg3N2E5NmI1ZDA4OTRhNTQwNGY2ZlxuXG4vKiBlc2xpbnQgbm9kZS1jb3JlL2RvY3VtZW50ZWQtZXJyb3JzOiBcImVycm9yXCIgKi9cblxuLyogZXNsaW50IG5vZGUtY29yZS9hbHBoYWJldGl6ZS1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuXG4vKiBlc2xpbnQgbm9kZS1jb3JlL3ByZWZlci11dGlsLWZvcm1hdC1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuJ3VzZSBzdHJpY3QnOyAvLyBUaGUgd2hvbGUgcG9pbnQgYmVoaW5kIHRoaXMgaW50ZXJuYWwgbW9kdWxlIGlzIHRvIGFsbG93IE5vZGUuanMgdG8gbm9cbi8vIGxvbmdlciBiZSBmb3JjZWQgdG8gdHJlYXQgZXZlcnkgZXJyb3IgbWVzc2FnZSBjaGFuZ2UgYXMgYSBzZW12ZXItbWFqb3Jcbi8vIGNoYW5nZS4gVGhlIE5vZGVFcnJvciBjbGFzc2VzIGhlcmUgYWxsIGV4cG9zZSBhIGBjb2RlYCBwcm9wZXJ0eSB3aG9zZVxuLy8gdmFsdWUgc3RhdGljYWxseSBhbmQgcGVybWFuZW50bHkgaWRlbnRpZmllcyB0aGUgZXJyb3IuIFdoaWxlIHRoZSBlcnJvclxuLy8gbWVzc2FnZSBtYXkgY2hhbmdlLCB0aGUgY29kZSBzaG91bGQgbm90LlxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbnZhciBjb2RlcyA9IHt9OyAvLyBMYXp5IGxvYWRlZFxuXG52YXIgYXNzZXJ0O1xudmFyIHV0aWw7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVycm9yVHlwZShjb2RlLCBtZXNzYWdlLCBCYXNlKSB7XG4gIGlmICghQmFzZSkge1xuICAgIEJhc2UgPSBFcnJvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKTtcbiAgICB9XG4gIH1cblxuICB2YXIgTm9kZUVycm9yID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHMoTm9kZUVycm9yLCBfQmFzZSk7XG5cbiAgICBmdW5jdGlvbiBOb2RlRXJyb3IoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm9kZUVycm9yKTtcblxuICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoTm9kZUVycm9yKS5jYWxsKHRoaXMsIGdldE1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMykpKTtcbiAgICAgIF90aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHJldHVybiBOb2RlRXJyb3I7XG4gIH0oQmFzZSk7XG5cbiAgY29kZXNbY29kZV0gPSBOb2RlRXJyb3I7XG59IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL3YxMC44LjAvbGliL2ludGVybmFsL2Vycm9ycy5qc1xuXG5cbmZ1bmN0aW9uIG9uZU9mKGV4cGVjdGVkLCB0aGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheShleHBlY3RlZCkpIHtcbiAgICB2YXIgbGVuID0gZXhwZWN0ZWQubGVuZ3RoO1xuICAgIGV4cGVjdGVkID0gZXhwZWN0ZWQubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKGkpO1xuICAgIH0pO1xuXG4gICAgaWYgKGxlbiA+IDIpIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWQuc2xpY2UoMCwgbGVuIC0gMSkuam9pbignLCAnKSwgXCIsIG9yIFwiKSArIGV4cGVjdGVkW2xlbiAtIDFdO1xuICAgIH0gZWxzZSBpZiAobGVuID09PSAyKSB7XG4gICAgICByZXR1cm4gXCJvbmUgb2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkWzBdLCBcIiBvciBcIikuY29uY2F0KGV4cGVjdGVkWzFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwib2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkWzBdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwib2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KFN0cmluZyhleHBlY3RlZCkpO1xuICB9XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9zdGFydHNXaXRoXG5cblxuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHNlYXJjaCwgcG9zKSB7XG4gIHJldHVybiBzdHIuc3Vic3RyKCFwb3MgfHwgcG9zIDwgMCA/IDAgOiArcG9zLCBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcblxuXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCwgdGhpc19sZW4pIHtcbiAgaWYgKHRoaXNfbGVuID09PSB1bmRlZmluZWQgfHwgdGhpc19sZW4gPiBzdHIubGVuZ3RoKSB7XG4gICAgdGhpc19sZW4gPSBzdHIubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcodGhpc19sZW4gLSBzZWFyY2gubGVuZ3RoLCB0aGlzX2xlbikgPT09IHNlYXJjaDtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2luY2x1ZGVzXG5cblxuZnVuY3Rpb24gaW5jbHVkZXMoc3RyLCBzZWFyY2gsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgc3RhcnQgPSAwO1xuICB9XG5cbiAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHN0ci5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHNlYXJjaCwgc3RhcnQpICE9PSAtMTtcbiAgfVxufVxuXG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9BTUJJR1VPVVNfQVJHVU1FTlQnLCAnVGhlIFwiJXNcIiBhcmd1bWVudCBpcyBhbWJpZ3VvdXMuICVzJywgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfQVJHX1RZUEUnLCBmdW5jdGlvbiAobmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCkge1xuICBpZiAoYXNzZXJ0ID09PSB1bmRlZmluZWQpIGFzc2VydCA9IHJlcXVpcmUoJy4uL2Fzc2VydCcpO1xuICBhc3NlcnQodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnLCBcIiduYW1lJyBtdXN0IGJlIGEgc3RyaW5nXCIpOyAvLyBkZXRlcm1pbmVyOiAnbXVzdCBiZScgb3IgJ211c3Qgbm90IGJlJ1xuXG4gIHZhciBkZXRlcm1pbmVyO1xuXG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnICYmIHN0YXJ0c1dpdGgoZXhwZWN0ZWQsICdub3QgJykpIHtcbiAgICBkZXRlcm1pbmVyID0gJ211c3Qgbm90IGJlJztcbiAgICBleHBlY3RlZCA9IGV4cGVjdGVkLnJlcGxhY2UoL15ub3QgLywgJycpO1xuICB9IGVsc2Uge1xuICAgIGRldGVybWluZXIgPSAnbXVzdCBiZSc7XG4gIH1cblxuICB2YXIgbXNnO1xuXG4gIGlmIChlbmRzV2l0aChuYW1lLCAnIGFyZ3VtZW50JykpIHtcbiAgICAvLyBGb3IgY2FzZXMgbGlrZSAnZmlyc3QgYXJndW1lbnQnXG4gICAgbXNnID0gXCJUaGUgXCIuY29uY2F0KG5hbWUsIFwiIFwiKS5jb25jYXQoZGV0ZXJtaW5lciwgXCIgXCIpLmNvbmNhdChvbmVPZihleHBlY3RlZCwgJ3R5cGUnKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHR5cGUgPSBpbmNsdWRlcyhuYW1lLCAnLicpID8gJ3Byb3BlcnR5JyA6ICdhcmd1bWVudCc7XG4gICAgbXNnID0gXCJUaGUgXFxcIlwiLmNvbmNhdChuYW1lLCBcIlxcXCIgXCIpLmNvbmNhdCh0eXBlLCBcIiBcIikuY29uY2F0KGRldGVybWluZXIsIFwiIFwiKS5jb25jYXQob25lT2YoZXhwZWN0ZWQsICd0eXBlJykpO1xuICB9IC8vIFRPRE8oQnJpZGdlQVIpOiBJbXByb3ZlIHRoZSBvdXRwdXQgYnkgc2hvd2luZyBgbnVsbGAgYW5kIHNpbWlsYXIuXG5cblxuICBtc2cgKz0gXCIuIFJlY2VpdmVkIHR5cGUgXCIuY29uY2F0KF90eXBlb2YoYWN0dWFsKSk7XG4gIHJldHVybiBtc2c7XG59LCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9BUkdfVkFMVUUnLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgdmFyIHJlYXNvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ2lzIGludmFsaWQnO1xuICBpZiAodXRpbCA9PT0gdW5kZWZpbmVkKSB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcbiAgdmFyIGluc3BlY3RlZCA9IHV0aWwuaW5zcGVjdCh2YWx1ZSk7XG5cbiAgaWYgKGluc3BlY3RlZC5sZW5ndGggPiAxMjgpIHtcbiAgICBpbnNwZWN0ZWQgPSBcIlwiLmNvbmNhdChpbnNwZWN0ZWQuc2xpY2UoMCwgMTI4KSwgXCIuLi5cIik7XG4gIH1cblxuICByZXR1cm4gXCJUaGUgYXJndW1lbnQgJ1wiLmNvbmNhdChuYW1lLCBcIicgXCIpLmNvbmNhdChyZWFzb24sIFwiLiBSZWNlaXZlZCBcIikuY29uY2F0KGluc3BlY3RlZCk7XG59LCBUeXBlRXJyb3IsIFJhbmdlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUnLCBmdW5jdGlvbiAoaW5wdXQsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0eXBlO1xuXG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgdHlwZSA9IFwiaW5zdGFuY2Ugb2YgXCIuY29uY2F0KHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBcInR5cGUgXCIuY29uY2F0KF90eXBlb2YodmFsdWUpKTtcbiAgfVxuXG4gIHJldHVybiBcIkV4cGVjdGVkIFwiLmNvbmNhdChpbnB1dCwgXCIgdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgXFxcIlwiKS5jb25jYXQobmFtZSwgXCJcXFwiXCIpICsgXCIgZnVuY3Rpb24gYnV0IGdvdCBcIi5jb25jYXQodHlwZSwgXCIuXCIpO1xufSwgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX01JU1NJTkdfQVJHUycsIGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChhc3NlcnQgPT09IHVuZGVmaW5lZCkgYXNzZXJ0ID0gcmVxdWlyZSgnLi4vYXNzZXJ0Jyk7XG4gIGFzc2VydChhcmdzLmxlbmd0aCA+IDAsICdBdCBsZWFzdCBvbmUgYXJnIG5lZWRzIHRvIGJlIHNwZWNpZmllZCcpO1xuICB2YXIgbXNnID0gJ1RoZSAnO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIGFyZ3MgPSBhcmdzLm1hcChmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQoYSwgXCJcXFwiXCIpO1xuICB9KTtcblxuICBzd2l0Y2ggKGxlbikge1xuICAgIGNhc2UgMTpcbiAgICAgIG1zZyArPSBcIlwiLmNvbmNhdChhcmdzWzBdLCBcIiBhcmd1bWVudFwiKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgbXNnICs9IFwiXCIuY29uY2F0KGFyZ3NbMF0sIFwiIGFuZCBcIikuY29uY2F0KGFyZ3NbMV0sIFwiIGFyZ3VtZW50c1wiKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG1zZyArPSBhcmdzLnNsaWNlKDAsIGxlbiAtIDEpLmpvaW4oJywgJyk7XG4gICAgICBtc2cgKz0gXCIsIGFuZCBcIi5jb25jYXQoYXJnc1tsZW4gLSAxXSwgXCIgYXJndW1lbnRzXCIpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQobXNnLCBcIiBtdXN0IGJlIHNwZWNpZmllZFwiKTtcbn0sIFR5cGVFcnJvcik7XG5tb2R1bGUuZXhwb3J0cy5jb2RlcyA9IGNvZGVzOyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8xMTJjYzdjMjc1NTEyNTRhYTJiMTcwOThmYjc3NDg2N2YwNWVkMGQ5XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgcmVnZXhGbGFnc1N1cHBvcnRlZCA9IC9hL2cuZmxhZ3MgIT09IHVuZGVmaW5lZDtcblxudmFyIGFycmF5RnJvbVNldCA9IGZ1bmN0aW9uIGFycmF5RnJvbVNldChzZXQpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBhcnJheS5wdXNoKHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiBhcnJheTtcbn07XG5cbnZhciBhcnJheUZyb21NYXAgPSBmdW5jdGlvbiBhcnJheUZyb21NYXAobWFwKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIHJldHVybiBhcnJheS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG52YXIgb2JqZWN0SXMgPSBPYmplY3QuaXMgPyBPYmplY3QuaXMgOiByZXF1aXJlKCdvYmplY3QtaXMnKTtcbnZhciBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtdO1xufTtcbnZhciBudW1iZXJJc05hTiA9IE51bWJlci5pc05hTiA/IE51bWJlci5pc05hTiA6IHJlcXVpcmUoJ2lzLW5hbicpO1xuXG5mdW5jdGlvbiB1bmN1cnJ5VGhpcyhmKSB7XG4gIHJldHVybiBmLmNhbGwuYmluZChmKTtcbn1cblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlKTtcbnZhciBvYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgX3JlcXVpcmUkdHlwZXMgPSByZXF1aXJlKCd1dGlsLycpLnR5cGVzLFxuICAgIGlzQW55QXJyYXlCdWZmZXIgPSBfcmVxdWlyZSR0eXBlcy5pc0FueUFycmF5QnVmZmVyLFxuICAgIGlzQXJyYXlCdWZmZXJWaWV3ID0gX3JlcXVpcmUkdHlwZXMuaXNBcnJheUJ1ZmZlclZpZXcsXG4gICAgaXNEYXRlID0gX3JlcXVpcmUkdHlwZXMuaXNEYXRlLFxuICAgIGlzTWFwID0gX3JlcXVpcmUkdHlwZXMuaXNNYXAsXG4gICAgaXNSZWdFeHAgPSBfcmVxdWlyZSR0eXBlcy5pc1JlZ0V4cCxcbiAgICBpc1NldCA9IF9yZXF1aXJlJHR5cGVzLmlzU2V0LFxuICAgIGlzTmF0aXZlRXJyb3IgPSBfcmVxdWlyZSR0eXBlcy5pc05hdGl2ZUVycm9yLFxuICAgIGlzQm94ZWRQcmltaXRpdmUgPSBfcmVxdWlyZSR0eXBlcy5pc0JveGVkUHJpbWl0aXZlLFxuICAgIGlzTnVtYmVyT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNOdW1iZXJPYmplY3QsXG4gICAgaXNTdHJpbmdPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc1N0cmluZ09iamVjdCxcbiAgICBpc0Jvb2xlYW5PYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc0Jvb2xlYW5PYmplY3QsXG4gICAgaXNCaWdJbnRPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc0JpZ0ludE9iamVjdCxcbiAgICBpc1N5bWJvbE9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzU3ltYm9sT2JqZWN0LFxuICAgIGlzRmxvYXQzMkFycmF5ID0gX3JlcXVpcmUkdHlwZXMuaXNGbG9hdDMyQXJyYXksXG4gICAgaXNGbG9hdDY0QXJyYXkgPSBfcmVxdWlyZSR0eXBlcy5pc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNOb25JbmRleChrZXkpIHtcbiAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwga2V5Lmxlbmd0aCA+IDEwKSByZXR1cm4gdHJ1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjb2RlID0ga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gNTcpIHJldHVybiB0cnVlO1xuICB9IC8vIFRoZSBtYXhpbXVtIHNpemUgZm9yIGFuIGFycmF5IGlzIDIgKiogMzIgLTEuXG5cblxuICByZXR1cm4ga2V5Lmxlbmd0aCA9PT0gMTAgJiYga2V5ID49IE1hdGgucG93KDIsIDMyKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkuZmlsdGVyKGlzTm9uSW5kZXgpLmNvbmNhdChvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsdWUpLmZpbHRlcihPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmJpbmQodmFsdWUpKSk7XG59IC8vIFRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvYmxvYi82ODBlOWU1ZTQ4OGYyMmFhYzI3NTk5YTU3ZGM4NDRhNjMxNTkyOGRkL2luZGV4LmpzXG4vLyBvcmlnaW5hbCBub3RpY2U6XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciB4ID0gYS5sZW5ndGg7XG4gIHZhciB5ID0gYi5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV07XG4gICAgICB5ID0gYltpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGlmICh5IDwgeCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbnZhciBPTkxZX0VOVU1FUkFCTEUgPSB1bmRlZmluZWQ7XG52YXIga1N0cmljdCA9IHRydWU7XG52YXIga0xvb3NlID0gZmFsc2U7XG52YXIga05vSXRlcmF0b3IgPSAwO1xudmFyIGtJc0FycmF5ID0gMTtcbnZhciBrSXNTZXQgPSAyO1xudmFyIGtJc01hcCA9IDM7IC8vIENoZWNrIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBzb3VyY2UgYW5kIGZsYWdzXG5cbmZ1bmN0aW9uIGFyZVNpbWlsYXJSZWdFeHBzKGEsIGIpIHtcbiAgcmV0dXJuIHJlZ2V4RmxhZ3NTdXBwb3J0ZWQgPyBhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5mbGFncyA9PT0gYi5mbGFncyA6IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSA9PT0gUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGIpO1xufVxuXG5mdW5jdGlvbiBhcmVTaW1pbGFyRmxvYXRBcnJheXMoYSwgYikge1xuICBpZiAoYS5ieXRlTGVuZ3RoICE9PSBiLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBhLmJ5dGVMZW5ndGg7IG9mZnNldCsrKSB7XG4gICAgaWYgKGFbb2Zmc2V0XSAhPT0gYltvZmZzZXRdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGFyZVNpbWlsYXJUeXBlZEFycmF5cyhhLCBiKSB7XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGEuYnVmZmVyLCBhLmJ5dGVPZmZzZXQsIGEuYnl0ZUxlbmd0aCksIG5ldyBVaW50OEFycmF5KGIuYnVmZmVyLCBiLmJ5dGVPZmZzZXQsIGIuYnl0ZUxlbmd0aCkpID09PSAwO1xufVxuXG5mdW5jdGlvbiBhcmVFcXVhbEFycmF5QnVmZmVycyhidWYxLCBidWYyKSB7XG4gIHJldHVybiBidWYxLmJ5dGVMZW5ndGggPT09IGJ1ZjIuYnl0ZUxlbmd0aCAmJiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGJ1ZjEpLCBuZXcgVWludDhBcnJheShidWYyKSkgPT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzRXF1YWxCb3hlZFByaW1pdGl2ZSh2YWwxLCB2YWwyKSB7XG4gIGlmIChpc051bWJlck9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc051bWJlck9iamVjdCh2YWwyKSAmJiBvYmplY3RJcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSwgTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMikpO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5nT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nT2JqZWN0KHZhbDIpICYmIFN0cmluZy5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuXG4gIGlmIChpc0Jvb2xlYW5PYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNCb29sZWFuT2JqZWN0KHZhbDIpICYmIEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xuICB9XG5cbiAgaWYgKGlzQmlnSW50T2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzQmlnSW50T2JqZWN0KHZhbDIpICYmIEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuXG4gIHJldHVybiBpc1N5bWJvbE9iamVjdCh2YWwyKSAmJiBTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG59IC8vIE5vdGVzOiBUeXBlIHRhZ3MgYXJlIGhpc3RvcmljYWwgW1tDbGFzc11dIHByb3BlcnRpZXMgdGhhdCBjYW4gYmUgc2V0IGJ5XG4vLyBGdW5jdGlvblRlbXBsYXRlOjpTZXRDbGFzc05hbWUoKSBpbiBDKysgb3IgU3ltYm9sLnRvU3RyaW5nVGFnIGluIEpTXG4vLyBhbmQgcmV0cmlldmVkIHVzaW5nIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopIGluIEpTXG4vLyBTZWUgaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuLy8gZm9yIGEgbGlzdCBvZiB0YWdzIHByZS1kZWZpbmVkIGluIHRoZSBzcGVjLlxuLy8gVGhlcmUgYXJlIHNvbWUgdW5zcGVjaWZpZWQgdGFncyBpbiB0aGUgd2lsZCB0b28gKGUuZy4gdHlwZWQgYXJyYXkgdGFncykuXG4vLyBTaW5jZSB0YWdzIGNhbiBiZSBhbHRlcmVkLCB0aGV5IG9ubHkgc2VydmUgZmFzdCBmYWlsdXJlc1xuLy9cbi8vIFR5cGVkIGFycmF5cyBhbmQgYnVmZmVycyBhcmUgY2hlY2tlZCBieSBjb21wYXJpbmcgdGhlIGNvbnRlbnQgaW4gdGhlaXJcbi8vIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIuIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoYXQgaXQnc1xuLy8gcmVhc29uYWJsZSB0byBpbnRlcnByZXQgdGhlaXIgdW5kZXJseWluZyBtZW1vcnkgaW4gdGhlIHNhbWUgd2F5LFxuLy8gd2hpY2ggaXMgY2hlY2tlZCBieSBjb21wYXJpbmcgdGhlaXIgdHlwZSB0YWdzLlxuLy8gKGUuZy4gYSBVaW50OEFycmF5IGFuZCBhIFVpbnQxNkFycmF5IHdpdGggdGhlIHNhbWUgbWVtb3J5IGNvbnRlbnRcbi8vIGNvdWxkIHN0aWxsIGJlIGRpZmZlcmVudCBiZWNhdXNlIHRoZXkgd2lsbCBiZSBpbnRlcnByZXRlZCBkaWZmZXJlbnRseSkuXG4vL1xuLy8gRm9yIHN0cmljdCBjb21wYXJpc29uLCBvYmplY3RzIHNob3VsZCBoYXZlXG4vLyBhKSBUaGUgc2FtZSBidWlsdC1pbiB0eXBlIHRhZ3Ncbi8vIGIpIFRoZSBzYW1lIHByb3RvdHlwZXMuXG5cblxuZnVuY3Rpb24gaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcykge1xuICAvLyBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmICh2YWwxID09PSB2YWwyKSB7XG4gICAgaWYgKHZhbDEgIT09IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBzdHJpY3QgPyBvYmplY3RJcyh2YWwxLCB2YWwyKSA6IHRydWU7XG4gIH0gLy8gQ2hlY2sgbW9yZSBjbG9zZWx5IGlmIHZhbDEgYW5kIHZhbDIgYXJlIGVxdWFsLlxuXG5cbiAgaWYgKHN0cmljdCkge1xuICAgIGlmIChfdHlwZW9mKHZhbDEpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwxID09PSAnbnVtYmVyJyAmJiBudW1iZXJJc05hTih2YWwxKSAmJiBudW1iZXJJc05hTih2YWwyKTtcbiAgICB9XG5cbiAgICBpZiAoX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcgfHwgdmFsMSA9PT0gbnVsbCB8fCB2YWwyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwxKSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh2YWwxID09PSBudWxsIHx8IF90eXBlb2YodmFsMSkgIT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodmFsMiA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDIpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG4gICAgICAgIHJldHVybiB2YWwxID09IHZhbDI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsMiA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDIpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhciB2YWwxVGFnID0gb2JqZWN0VG9TdHJpbmcodmFsMSk7XG4gIHZhciB2YWwyVGFnID0gb2JqZWN0VG9TdHJpbmcodmFsMik7XG5cbiAgaWYgKHZhbDFUYWcgIT09IHZhbDJUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwxKSkge1xuICAgIC8vIENoZWNrIGZvciBzcGFyc2UgYXJyYXlzIGFuZCBnZW5lcmFsIGZhc3QgcGF0aFxuICAgIGlmICh2YWwxLmxlbmd0aCAhPT0gdmFsMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIga2V5czEgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMSwgT05MWV9FTlVNRVJBQkxFKTtcbiAgICB2YXIga2V5czIgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMiwgT05MWV9FTlVNRVJBQkxFKTtcblxuICAgIGlmIChrZXlzMS5sZW5ndGggIT09IGtleXMyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNBcnJheSwga2V5czEpO1xuICB9IC8vIFticm93c2VyaWZ5XSBUaGlzIHRyaWdnZXJzIG9uIGNlcnRhaW4gdHlwZXMgaW4gSUUgKE1hcC9TZXQpIHNvIHdlIGRvbid0XG4gIC8vIHdhbid0IHRvIGVhcmx5IHJldHVybiBvdXQgb2YgdGhlIHJlc3Qgb2YgdGhlIGNoZWNrcy4gSG93ZXZlciB3ZSBjYW4gY2hlY2tcbiAgLy8gaWYgdGhlIHNlY29uZCB2YWx1ZSBpcyBvbmUgb2YgdGhlc2UgdmFsdWVzIGFuZCB0aGUgZmlyc3QgaXNuJ3QuXG5cblxuICBpZiAodmFsMVRhZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IpO1xuICAgIGlmICghaXNNYXAodmFsMSkgJiYgaXNNYXAodmFsMikgfHwgIWlzU2V0KHZhbDEpICYmIGlzU2V0KHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzRGF0ZSh2YWwxKSkge1xuICAgIGlmICghaXNEYXRlKHZhbDIpIHx8IERhdGUucHJvdG90eXBlLmdldFRpbWUuY2FsbCh2YWwxKSAhPT0gRGF0ZS5wcm90b3R5cGUuZ2V0VGltZS5jYWxsKHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUmVnRXhwKHZhbDEpKSB7XG4gICAgaWYgKCFpc1JlZ0V4cCh2YWwyKSB8fCAhYXJlU2ltaWxhclJlZ0V4cHModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNOYXRpdmVFcnJvcih2YWwxKSB8fCB2YWwxIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAvLyBEbyBub3QgY29tcGFyZSB0aGUgc3RhY2sgYXMgaXQgbWlnaHQgZGlmZmVyIGV2ZW4gdGhvdWdoIHRoZSBlcnJvciBpdHNlbGZcbiAgICAvLyBpcyBvdGhlcndpc2UgaWRlbnRpY2FsLlxuICAgIGlmICh2YWwxLm1lc3NhZ2UgIT09IHZhbDIubWVzc2FnZSB8fCB2YWwxLm5hbWUgIT09IHZhbDIubmFtZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0FycmF5QnVmZmVyVmlldyh2YWwxKSkge1xuICAgIGlmICghc3RyaWN0ICYmIChpc0Zsb2F0MzJBcnJheSh2YWwxKSB8fCBpc0Zsb2F0NjRBcnJheSh2YWwxKSkpIHtcbiAgICAgIGlmICghYXJlU2ltaWxhckZsb2F0QXJyYXlzKHZhbDEsIHZhbDIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFhcmVTaW1pbGFyVHlwZWRBcnJheXModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIEJ1ZmZlci5jb21wYXJlIHJldHVybnMgdHJ1ZSwgc28gdmFsMS5sZW5ndGggPT09IHZhbDIubGVuZ3RoLiBJZiB0aGV5IGJvdGhcbiAgICAvLyBvbmx5IGNvbnRhaW4gbnVtZXJpYyBrZXlzLCB3ZSBkb24ndCBuZWVkIHRvIGV4YW0gZnVydGhlciB0aGFuIGNoZWNraW5nXG4gICAgLy8gdGhlIHN5bWJvbHMuXG5cblxuICAgIHZhciBfa2V5cyA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwxLCBPTkxZX0VOVU1FUkFCTEUpO1xuXG4gICAgdmFyIF9rZXlzMiA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwyLCBPTkxZX0VOVU1FUkFCTEUpO1xuXG4gICAgaWYgKF9rZXlzLmxlbmd0aCAhPT0gX2tleXMyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrTm9JdGVyYXRvciwgX2tleXMpO1xuICB9IGVsc2UgaWYgKGlzU2V0KHZhbDEpKSB7XG4gICAgaWYgKCFpc1NldCh2YWwyKSB8fCB2YWwxLnNpemUgIT09IHZhbDIuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNTZXQpO1xuICB9IGVsc2UgaWYgKGlzTWFwKHZhbDEpKSB7XG4gICAgaWYgKCFpc01hcCh2YWwyKSB8fCB2YWwxLnNpemUgIT09IHZhbDIuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNNYXApO1xuICB9IGVsc2UgaWYgKGlzQW55QXJyYXlCdWZmZXIodmFsMSkpIHtcbiAgICBpZiAoIWFyZUVxdWFsQXJyYXlCdWZmZXJzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQm94ZWRQcmltaXRpdmUodmFsMSkgJiYgIWlzRXF1YWxCb3hlZFByaW1pdGl2ZSh2YWwxLCB2YWwyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrTm9JdGVyYXRvcik7XG59XG5cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVzKHZhbCwga2V5cykge1xuICByZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUodmFsLCBrKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGl0ZXJhdGlvblR5cGUsIGFLZXlzKSB7XG4gIC8vIEZvciBhbGwgcmVtYWluaW5nIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5LCBvYmplY3RzIGFuZCBNYXBzLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5IGhhdmluZzpcbiAgLy8gYSkgVGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIGVudW1lcmFibGUgcHJvcGVydGllc1xuICAvLyBiKSBUaGUgc2FtZSBzZXQgb2Yga2V5cy9pbmRleGVzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpXG4gIC8vIGMpIEVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleS9pbmRleFxuICAvLyBkKSBGb3IgU2V0cyBhbmQgTWFwcywgZXF1YWwgY29udGVudHNcbiAgLy8gTm90ZTogdGhpcyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDUpIHtcbiAgICBhS2V5cyA9IE9iamVjdC5rZXlzKHZhbDEpO1xuICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKHZhbDIpOyAvLyBUaGUgcGFpciBtdXN0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMuXG5cbiAgICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gLy8gQ2hlYXAga2V5IHRlc3RcblxuXG4gIHZhciBpID0gMDtcblxuICBmb3IgKDsgaSA8IGFLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2YWwyLCBhS2V5c1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RyaWN0ICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDUpIHtcbiAgICB2YXIgc3ltYm9sS2V5c0EgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMSk7XG5cbiAgICBpZiAoc3ltYm9sS2V5c0EubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc3ltYm9sS2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IHN5bWJvbEtleXNBW2ldO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwxLCBrZXkpKSB7XG4gICAgICAgICAgaWYgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwyLCBrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYUtleXMucHVzaChrZXkpO1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlJc0VudW1lcmFibGUodmFsMiwga2V5KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3ltYm9sS2V5c0IgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMik7XG5cbiAgICAgIGlmIChzeW1ib2xLZXlzQS5sZW5ndGggIT09IHN5bWJvbEtleXNCLmxlbmd0aCAmJiBnZXRFbnVtZXJhYmxlcyh2YWwyLCBzeW1ib2xLZXlzQikubGVuZ3RoICE9PSBjb3VudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfc3ltYm9sS2V5c0IgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMik7XG5cbiAgICAgIGlmIChfc3ltYm9sS2V5c0IubGVuZ3RoICE9PSAwICYmIGdldEVudW1lcmFibGVzKHZhbDIsIF9zeW1ib2xLZXlzQikubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYUtleXMubGVuZ3RoID09PSAwICYmIChpdGVyYXRpb25UeXBlID09PSBrTm9JdGVyYXRvciB8fCBpdGVyYXRpb25UeXBlID09PSBrSXNBcnJheSAmJiB2YWwxLmxlbmd0aCA9PT0gMCB8fCB2YWwxLnNpemUgPT09IDApKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gVXNlIG1lbW9zIHRvIGhhbmRsZSBjeWNsZXMuXG5cblxuICBpZiAobWVtb3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG1lbW9zID0ge1xuICAgICAgdmFsMTogbmV3IE1hcCgpLFxuICAgICAgdmFsMjogbmV3IE1hcCgpLFxuICAgICAgcG9zaXRpb246IDBcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIFdlIHByZXZlbnQgdXAgdG8gdHdvIG1hcC5oYXMoeCkgY2FsbHMgYnkgZGlyZWN0bHkgcmV0cmlldmluZyB0aGUgdmFsdWVcbiAgICAvLyBhbmQgY2hlY2tpbmcgZm9yIHVuZGVmaW5lZC4gVGhlIG1hcCBjYW4gb25seSBjb250YWluIG51bWJlcnMsIHNvIGl0IGlzXG4gICAgLy8gc2FmZSB0byBjaGVjayBmb3IgdW5kZWZpbmVkIG9ubHkuXG4gICAgdmFyIHZhbDJNZW1vQSA9IG1lbW9zLnZhbDEuZ2V0KHZhbDEpO1xuXG4gICAgaWYgKHZhbDJNZW1vQSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgdmFsMk1lbW9CID0gbWVtb3MudmFsMi5nZXQodmFsMik7XG5cbiAgICAgIGlmICh2YWwyTWVtb0IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdmFsMk1lbW9BID09PSB2YWwyTWVtb0I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb3MucG9zaXRpb24rKztcbiAgfVxuXG4gIG1lbW9zLnZhbDEuc2V0KHZhbDEsIG1lbW9zLnBvc2l0aW9uKTtcbiAgbWVtb3MudmFsMi5zZXQodmFsMiwgbWVtb3MucG9zaXRpb24pO1xuICB2YXIgYXJlRXEgPSBvYmpFcXVpdih2YWwxLCB2YWwyLCBzdHJpY3QsIGFLZXlzLCBtZW1vcywgaXRlcmF0aW9uVHlwZSk7XG4gIG1lbW9zLnZhbDEuZGVsZXRlKHZhbDEpO1xuICBtZW1vcy52YWwyLmRlbGV0ZSh2YWwyKTtcbiAgcmV0dXJuIGFyZUVxO1xufVxuXG5mdW5jdGlvbiBzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCB2YWwxLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gR28gbG9va2luZy5cbiAgdmFyIHNldFZhbHVlcyA9IGFycmF5RnJvbVNldChzZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0VmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbDIgPSBzZXRWYWx1ZXNbaV07XG5cbiAgICBpZiAoaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBtYXRjaGluZyBlbGVtZW50IHRvIG1ha2Ugc3VyZSB3ZSBkbyBub3QgY2hlY2sgdGhhdCBhZ2Fpbi5cbiAgICAgIHNldC5kZWxldGUodmFsMik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59IC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L0VxdWFsaXR5X2NvbXBhcmlzb25zX2FuZF9zYW1lbmVzcyNMb29zZV9lcXVhbGl0eV91c2luZ1xuLy8gU2FkbHkgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGRldGVjdCBjb3JyZXNwb25kaW5nIHZhbHVlcyBwcm9wZXJseSBpbiBjYXNlIHRoZVxuLy8gdHlwZSBpcyBhIHN0cmluZywgbnVtYmVyLCBiaWdpbnQgb3IgYm9vbGVhbi4gVGhlIHJlYXNvbiBpcyB0aGF0IHRob3NlIHZhbHVlc1xuLy8gY2FuIG1hdGNoIGxvdHMgb2YgZGlmZmVyZW50IHN0cmluZyB2YWx1ZXMgKGUuZy4sIDFuID09ICcrMDAwMDEnKS5cblxuXG5mdW5jdGlvbiBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSkge1xuICBzd2l0Y2ggKF90eXBlb2YocHJpbSkpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgLy8gT25seSBwYXNzIGluIG51bGwgYXMgb2JqZWN0IVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcHJpbSA9ICtwcmltO1xuICAgIC8vIExvb3NlIGVxdWFsIGVudHJpZXMgZXhpc3Qgb25seSBpZiB0aGUgc3RyaW5nIGlzIHBvc3NpYmxlIHRvIGNvbnZlcnQgdG9cbiAgICAvLyBhIHJlZ3VsYXIgbnVtYmVyIGFuZCBub3QgTmFOLlxuICAgIC8vIEZhbGwgdGhyb3VnaFxuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGlmIChudW1iZXJJc05hTihwcmltKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZXRNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgcHJpbSkge1xuICB2YXIgYWx0VmFsdWUgPSBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSk7XG4gIGlmIChhbHRWYWx1ZSAhPSBudWxsKSByZXR1cm4gYWx0VmFsdWU7XG4gIHJldHVybiBiLmhhcyhhbHRWYWx1ZSkgJiYgIWEuaGFzKGFsdFZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHByaW0sIGl0ZW0sIG1lbW8pIHtcbiAgdmFyIGFsdFZhbHVlID0gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pO1xuXG4gIGlmIChhbHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsdFZhbHVlO1xuICB9XG5cbiAgdmFyIGN1ckIgPSBiLmdldChhbHRWYWx1ZSk7XG5cbiAgaWYgKGN1ckIgPT09IHVuZGVmaW5lZCAmJiAhYi5oYXMoYWx0VmFsdWUpIHx8ICFpbm5lckRlZXBFcXVhbChpdGVtLCBjdXJCLCBmYWxzZSwgbWVtbykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gIWEuaGFzKGFsdFZhbHVlKSAmJiBpbm5lckRlZXBFcXVhbChpdGVtLCBjdXJCLCBmYWxzZSwgbWVtbyk7XG59XG5cbmZ1bmN0aW9uIHNldEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtbykge1xuICAvLyBUaGlzIGlzIGEgbGF6aWx5IGluaXRpYXRlZCBTZXQgb2YgZW50cmllcyB3aGljaCBoYXZlIHRvIGJlIGNvbXBhcmVkXG4gIC8vIHBhaXJ3aXNlLlxuICB2YXIgc2V0ID0gbnVsbDtcbiAgdmFyIGFWYWx1ZXMgPSBhcnJheUZyb21TZXQoYSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbCA9IGFWYWx1ZXNbaV07IC8vIE5vdGU6IENoZWNraW5nIGZvciB0aGUgb2JqZWN0cyBmaXJzdCBpbXByb3ZlcyB0aGUgcGVyZm9ybWFuY2UgZm9yIG9iamVjdFxuICAgIC8vIGhlYXZ5IHNldHMgYnV0IGl0IGlzIGEgbWlub3Igc2xvdyBkb3duIGZvciBwcmltaXRpdmVzLiBBcyB0aGV5IGFyZSBmYXN0XG4gICAgLy8gdG8gY2hlY2sgdGhpcyBpbXByb3ZlcyB0aGUgd29yc3QgY2FzZSBzY2VuYXJpbyBpbnN0ZWFkLlxuXG4gICAgaWYgKF90eXBlb2YodmFsKSA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH0gLy8gSWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBkb2Vzbid0IGV4aXN0IGluIHRoZSBzZWNvbmQgc2V0IGl0cyBhbiBub3QgbnVsbFxuICAgICAgLy8gb2JqZWN0IChvciBub24gc3RyaWN0IG9ubHk6IGEgbm90IG1hdGNoaW5nIHByaW1pdGl2ZSkgd2UnbGwgbmVlZCB0byBnb1xuICAgICAgLy8gaHVudGluZyBmb3Igc29tZXRoaW5nIHRoYXRzIGRlZXAtKHN0cmljdC0pZXF1YWwgdG8gaXQuIFRvIG1ha2UgdGhpc1xuICAgICAgLy8gTyhuIGxvZyBuKSBjb21wbGV4aXR5IHdlIGhhdmUgdG8gY29weSB0aGVzZSB2YWx1ZXMgaW4gYSBuZXcgc2V0IGZpcnN0LlxuXG5cbiAgICAgIHNldC5hZGQodmFsKTtcbiAgICB9IGVsc2UgaWYgKCFiLmhhcyh2YWwpKSB7XG4gICAgICBpZiAoc3RyaWN0KSByZXR1cm4gZmFsc2U7IC8vIEZhc3QgcGF0aCB0byBkZXRlY3QgbWlzc2luZyBzdHJpbmcsIHN5bWJvbCwgdW5kZWZpbmVkIGFuZCBudWxsIHZhbHVlcy5cblxuICAgICAgaWYgKCFzZXRNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgdmFsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgfVxuXG4gICAgICBzZXQuYWRkKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNldCAhPT0gbnVsbCkge1xuICAgIHZhciBiVmFsdWVzID0gYXJyYXlGcm9tU2V0KGIpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGJWYWx1ZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX3ZhbCA9IGJWYWx1ZXNbX2ldOyAvLyBXZSBoYXZlIHRvIGNoZWNrIGlmIGEgcHJpbWl0aXZlIHZhbHVlIGlzIGFscmVhZHlcbiAgICAgIC8vIG1hdGNoaW5nIGFuZCBvbmx5IGlmIGl0J3Mgbm90LCBnbyBodW50aW5nIGZvciBpdC5cblxuICAgICAgaWYgKF90eXBlb2YoX3ZhbCkgPT09ICdvYmplY3QnICYmIF92YWwgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCBfdmFsLCBzdHJpY3QsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgIWEuaGFzKF92YWwpICYmICFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCBfdmFsLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2V0LnNpemUgPT09IDA7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbWFwSGFzRXF1YWxFbnRyeShzZXQsIG1hcCwga2V5MSwgaXRlbTEsIHN0cmljdCwgbWVtbykge1xuICAvLyBUbyBiZSBhYmxlIHRvIGhhbmRsZSBjYXNlcyBsaWtlOlxuICAvLyAgIE1hcChbW3t9LCAnYSddLCBbe30sICdiJ11dKSB2cyBNYXAoW1t7fSwgJ2InXSwgW3t9LCAnYSddXSlcbiAgLy8gLi4uIHdlIG5lZWQgdG8gY29uc2lkZXIgKmFsbCogbWF0Y2hpbmcga2V5cywgbm90IGp1c3QgdGhlIGZpcnN0IHdlIGZpbmQuXG4gIHZhciBzZXRWYWx1ZXMgPSBhcnJheUZyb21TZXQoc2V0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkyID0gc2V0VmFsdWVzW2ldO1xuXG4gICAgaWYgKGlubmVyRGVlcEVxdWFsKGtleTEsIGtleTIsIHN0cmljdCwgbWVtbykgJiYgaW5uZXJEZWVwRXF1YWwoaXRlbTEsIG1hcC5nZXQoa2V5MiksIHN0cmljdCwgbWVtbykpIHtcbiAgICAgIHNldC5kZWxldGUoa2V5Mik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG1hcEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtbykge1xuICB2YXIgc2V0ID0gbnVsbDtcbiAgdmFyIGFFbnRyaWVzID0gYXJyYXlGcm9tTWFwKGEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYUVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2FFbnRyaWVzJGkgPSBfc2xpY2VkVG9BcnJheShhRW50cmllc1tpXSwgMiksXG4gICAgICAgIGtleSA9IF9hRW50cmllcyRpWzBdLFxuICAgICAgICBpdGVtMSA9IF9hRW50cmllcyRpWzFdO1xuXG4gICAgaWYgKF90eXBlb2Yoa2V5KSA9PT0gJ29iamVjdCcgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cblxuICAgICAgc2V0LmFkZChrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCeSBkaXJlY3RseSByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3ZSBwcmV2ZW50IGFub3RoZXIgYi5oYXMoa2V5KSBjaGVjayBpblxuICAgICAgLy8gYWxtb3N0IGFsbCBwb3NzaWJsZSBjYXNlcy5cbiAgICAgIHZhciBpdGVtMiA9IGIuZ2V0KGtleSk7XG5cbiAgICAgIGlmIChpdGVtMiA9PT0gdW5kZWZpbmVkICYmICFiLmhhcyhrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChpdGVtMSwgaXRlbTIsIHN0cmljdCwgbWVtbykpIHtcbiAgICAgICAgaWYgKHN0cmljdCkgcmV0dXJuIGZhbHNlOyAvLyBGYXN0IHBhdGggdG8gZGV0ZWN0IG1pc3Npbmcgc3RyaW5nLCBzeW1ib2wsIHVuZGVmaW5lZCBhbmQgbnVsbFxuICAgICAgICAvLyBrZXlzLlxuXG4gICAgICAgIGlmICghbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIGtleSwgaXRlbTEsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldC5hZGQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc2V0ICE9PSBudWxsKSB7XG4gICAgdmFyIGJFbnRyaWVzID0gYXJyYXlGcm9tTWFwKGIpO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYkVudHJpZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9iRW50cmllcyRfaSA9IF9zbGljZWRUb0FycmF5KGJFbnRyaWVzW19pMl0sIDIpLFxuICAgICAgICAgIGtleSA9IF9iRW50cmllcyRfaVswXSxcbiAgICAgICAgICBpdGVtID0gX2JFbnRyaWVzJF9pWzFdO1xuXG4gICAgICBpZiAoX3R5cGVvZihrZXkpID09PSAnb2JqZWN0JyAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwga2V5LCBpdGVtLCBzdHJpY3QsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgKCFhLmhhcyhrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChhLmdldChrZXkpLCBpdGVtLCBmYWxzZSwgbWVtbykpICYmICFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwga2V5LCBpdGVtLCBmYWxzZSwgbWVtbykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQuc2l6ZSA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBzdHJpY3QsIGtleXMsIG1lbW9zLCBpdGVyYXRpb25UeXBlKSB7XG4gIC8vIFNldHMgYW5kIG1hcHMgZG9uJ3QgaGF2ZSB0aGVpciBlbnRyaWVzIGFjY2Vzc2libGUgdmlhIG5vcm1hbCBvYmplY3RcbiAgLy8gcHJvcGVydGllcy5cbiAgdmFyIGkgPSAwO1xuXG4gIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNTZXQpIHtcbiAgICBpZiAoIXNldEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc01hcCkge1xuICAgIGlmICghbWFwRXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzQXJyYXkpIHtcbiAgICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eShhLCBpKSkge1xuICAgICAgICBpZiAoIWhhc093blByb3BlcnR5KGIsIGkpIHx8ICFpbm5lckRlZXBFcXVhbChhW2ldLCBiW2ldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShiLCBpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBcnJheSBpcyBzcGFyc2UuXG4gICAgICAgIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKGEpO1xuXG4gICAgICAgIGZvciAoOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c0FbaV07XG5cbiAgICAgICAgICBpZiAoIWhhc093blByb3BlcnR5KGIsIGtleSkgfHwgIWlubmVyRGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlzQS5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBUaGUgcGFpciBtdXN0IGhhdmUgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LlxuICAvLyBQb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0OlxuXG5cbiAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2tleSA9IGtleXNbaV07XG5cbiAgICBpZiAoIWlubmVyRGVlcEVxdWFsKGFbX2tleV0sIGJbX2tleV0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRGVlcEVxdWFsKHZhbDEsIHZhbDIpIHtcbiAgcmV0dXJuIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIGtMb29zZSk7XG59XG5cbmZ1bmN0aW9uIGlzRGVlcFN0cmljdEVxdWFsKHZhbDEsIHZhbDIpIHtcbiAgcmV0dXJuIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIGtTdHJpY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNEZWVwRXF1YWw6IGlzRGVlcEVxdWFsLFxuICBpc0RlZXBTdHJpY3RFcXVhbDogaXNEZWVwU3RyaWN0RXF1YWxcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCcuLycpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kKGludHJpbnNpYyk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG52YXIgJG1heCA9IEdldEludHJpbnNpYygnJU1hdGgubWF4JScpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZChvcmlnaW5hbEZ1bmN0aW9uKSB7XG5cdHZhciBmdW5jID0gJHJlZmxlY3RBcHBseShiaW5kLCAkY2FsbCwgYXJndW1lbnRzKTtcblx0aWYgKCRnT1BEICYmICRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHZhciBkZXNjID0gJGdPUEQoZnVuYywgJ2xlbmd0aCcpO1xuXHRcdGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0Ly8gb3JpZ2luYWwgbGVuZ3RoLCBwbHVzIHRoZSByZWNlaXZlciwgbWludXMgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIChhZnRlciB0aGUgcmVjZWl2ZXIpXG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdGZ1bmMsXG5cdFx0XHRcdCdsZW5ndGgnLFxuXHRcdFx0XHR7IHZhbHVlOiAxICsgJG1heCgwLCBvcmlnaW5hbEZ1bmN0aW9uLmxlbmd0aCAtIChhcmd1bWVudHMubGVuZ3RoIC0gMSkpIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiLypnbG9iYWwgd2luZG93LCBnbG9iYWwqL1xudmFyIHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKVxudmFyIGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIilcbmZ1bmN0aW9uIG5vdygpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIH1cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG52YXIgY29uc29sZVxudmFyIHRpbWVzID0ge31cblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNvbnNvbGUpIHtcbiAgICBjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGVcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuY29uc29sZSkge1xuICAgIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZVxufSBlbHNlIHtcbiAgICBjb25zb2xlID0ge31cbn1cblxudmFyIGZ1bmN0aW9ucyA9IFtcbiAgICBbbG9nLCBcImxvZ1wiXSxcbiAgICBbaW5mbywgXCJpbmZvXCJdLFxuICAgIFt3YXJuLCBcIndhcm5cIl0sXG4gICAgW2Vycm9yLCBcImVycm9yXCJdLFxuICAgIFt0aW1lLCBcInRpbWVcIl0sXG4gICAgW3RpbWVFbmQsIFwidGltZUVuZFwiXSxcbiAgICBbdHJhY2UsIFwidHJhY2VcIl0sXG4gICAgW2RpciwgXCJkaXJcIl0sXG4gICAgW2NvbnNvbGVBc3NlcnQsIFwiYXNzZXJ0XCJdXG5dXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gZnVuY3Rpb25zW2ldXG4gICAgdmFyIGYgPSB0dXBsZVswXVxuICAgIHZhciBuYW1lID0gdHVwbGVbMV1cblxuICAgIGlmICghY29uc29sZVtuYW1lXSkge1xuICAgICAgICBjb25zb2xlW25hbWVdID0gZlxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zb2xlXG5cbmZ1bmN0aW9uIGxvZygpIHt9XG5cbmZ1bmN0aW9uIGluZm8oKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5mdW5jdGlvbiB3YXJuKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgIHRpbWVzW2xhYmVsXSA9IG5vdygpXG59XG5cbmZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICB2YXIgdGltZSA9IHRpbWVzW2xhYmVsXVxuICAgIGlmICghdGltZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsOiBcIiArIGxhYmVsKVxuICAgIH1cblxuICAgIGRlbGV0ZSB0aW1lc1tsYWJlbF1cbiAgICB2YXIgZHVyYXRpb24gPSBub3coKSAtIHRpbWVcbiAgICBjb25zb2xlLmxvZyhsYWJlbCArIFwiOiBcIiArIGR1cmF0aW9uICsgXCJtc1wiKVxufVxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKClcbiAgICBlcnIubmFtZSA9IFwiVHJhY2VcIlxuICAgIGVyci5tZXNzYWdlID0gdXRpbC5mb3JtYXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKVxufVxuXG5mdW5jdGlvbiBkaXIob2JqZWN0KSB7XG4gICAgY29uc29sZS5sb2codXRpbC5pbnNwZWN0KG9iamVjdCkgKyBcIlxcblwiKVxufVxuXG5mdW5jdGlvbiBjb25zb2xlQXNzZXJ0KGV4cHJlc3Npb24pIHtcbiAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgdmFyIGFyciA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICAgICBhc3NlcnQub2soZmFsc2UsIHV0aWwuZm9ybWF0LmFwcGx5KG51bGwsIGFycikpXG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgaGFzU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbCgnZm9vJykgPT09ICdzeW1ib2wnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgb3JpZ0RlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbikge1xuXHRyZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvcnMgPSByZXF1aXJlKCdoYXMtcHJvcGVydHktZGVzY3JpcHRvcnMnKSgpO1xuXG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IG9yaWdEZWZpbmVQcm9wZXJ0eSAmJiBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSwgcHJlZGljYXRlKSB7XG5cdGlmIChuYW1lIGluIG9iamVjdCAmJiAoIWlzRnVuY3Rpb24ocHJlZGljYXRlKSB8fCAhcHJlZGljYXRlKCkpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdH1cbn07XG5cbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iamVjdCwgbWFwKSB7XG5cdHZhciBwcmVkaWNhdGVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB7fTtcblx0dmFyIHByb3BzID0ga2V5cyhtYXApO1xuXHRpZiAoaGFzU3ltYm9scykge1xuXHRcdHByb3BzID0gY29uY2F0LmNhbGwocHJvcHMsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMobWFwKSk7XG5cdH1cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcHNbaV0sIG1hcFtwcm9wc1tpXV0sIHByZWRpY2F0ZXNbcHJvcHNbaV1dKTtcblx0fVxufTtcblxuZGVmaW5lUHJvcGVydGllcy5zdXBwb3J0c0Rlc2NyaXB0b3JzID0gISFzdXBwb3J0c0Rlc2NyaXB0b3JzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnRpZXM7XG4iLCIvKipcbiAqIENvZGUgcmVmYWN0b3JlZCBmcm9tIE1vemlsbGEgRGV2ZWxvcGVyIE5ldHdvcms6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBmaXJzdFNvdXJjZSkge1xuICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PT0gdW5kZWZpbmVkIHx8IG5leHRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgIHZhciBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cblxuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gIGlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGFzc2lnblxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhc3NpZ246IGFzc2lnbixcbiAgcG9seWZpbGw6IHBvbHlmaWxsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJ2lzLWNhbGxhYmxlJyk7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm9yRWFjaEFycmF5ID0gZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaFN0cmluZyA9IGZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlcmF0b3Ioc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaE9iamVjdCA9IGZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgb2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCB0aGlzQXJnKSB7XG4gICAgaWYgKCFpc0NhbGxhYmxlKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZXI7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykge1xuICAgICAgICByZWNlaXZlciA9IHRoaXNBcmc7XG4gICAgfVxuXG4gICAgaWYgKHRvU3RyLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBuby1pbnZhbGlkLXRoaXM6IDEgKi9cblxudmFyIEVSUk9SX01FU1NBR0UgPSAnRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSAnO1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmdW5jVHlwZSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbCh0YXJnZXQpICE9PSBmdW5jVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEVSUk9SX01FU1NBR0UgKyB0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBib3VuZDtcbiAgICB2YXIgYmluZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJvdW5kTGVuZ3RoID0gTWF0aC5tYXgoMCwgdGFyZ2V0Lmxlbmd0aCAtIGFyZ3MubGVuZ3RoKTtcbiAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvdW5kQXJncy5wdXNoKCckJyArIGkpO1xuICAgIH1cblxuICAgIGJvdW5kID0gRnVuY3Rpb24oJ2JpbmRlcicsICdyZXR1cm4gZnVuY3Rpb24gKCcgKyBib3VuZEFyZ3Muam9pbignLCcpICsgJyl7IHJldHVybiBiaW5kZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpOyB9JykoYmluZGVyKTtcblxuICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBFbXB0eSA9IGZ1bmN0aW9uIEVtcHR5KCkge307XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBFbXB0eSgpO1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBpbXBsZW1lbnRhdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBuZWVkc0V2YWwsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBkb0V2YWwgPSBmdW5jdGlvbiBkb0V2YWwobmFtZSkge1xuXHR2YXIgdmFsdWU7XG5cdGlmIChuYW1lID09PSAnJUFzeW5jRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yJScpIHtcblx0XHR2YXIgZm4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpO1xuXHRcdGlmIChmbikge1xuXHRcdFx0dmFsdWUgPSBmbi5wcm90b3R5cGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnKSB7XG5cdFx0dmFyIGdlbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yJScpO1xuXHRcdGlmIChnZW4pIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJvdG8oZ2VuLnByb3RvdHlwZSk7XG5cdFx0fVxuXHR9XG5cblx0SU5UUklOU0lDU1tuYW1lXSA9IHZhbHVlO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5zbGljZSk7XG52YXIgJGV4ZWMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgUmVnRXhwLnByb3RvdHlwZS5leGVjKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgZmlyc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAwLCAxKTtcblx0dmFyIGxhc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAtMSk7XG5cdGlmIChmaXJzdCA9PT0gJyUnICYmIGxhc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgY2xvc2luZyBgJWAnKTtcblx0fSBlbHNlIGlmIChsYXN0ID09PSAnJScgJiYgZmlyc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgb3BlbmluZyBgJWAnKTtcblx0fVxuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gbmVlZHNFdmFsKSB7XG5cdFx0XHR2YWx1ZSA9IGRvRXZhbChpbnRyaW5zaWNOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHRpZiAoJGV4ZWMoL14lP1teJV0qJT8kLywgbmFtZSkgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdgJWAgbWF5IG5vdCBiZSBwcmVzZW50IGFueXdoZXJlIGJ1dCBhdCB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgdGhlIGludHJpbnNpYyBuYW1lJyk7XG5cdH1cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHR2YXIgZmlyc3QgPSAkc3RyU2xpY2UocGFydCwgMCwgMSk7XG5cdFx0dmFyIGxhc3QgPSAkc3RyU2xpY2UocGFydCwgLTEpO1xuXHRcdGlmIChcblx0XHRcdChcblx0XHRcdFx0KGZpcnN0ID09PSAnXCInIHx8IGZpcnN0ID09PSBcIidcIiB8fCBmaXJzdCA9PT0gJ2AnKVxuXHRcdFx0XHR8fCAobGFzdCA9PT0gJ1wiJyB8fCBsYXN0ID09PSBcIidcIiB8fCBsYXN0ID09PSAnYCcpXG5cdFx0XHQpXG5cdFx0XHQmJiBmaXJzdCAhPT0gbGFzdFxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcigncHJvcGVydHkgbmFtZXMgd2l0aCBxdW90ZXMgbXVzdCBoYXZlIG1hdGNoaW5nIHF1b3RlcycpO1xuXHRcdH1cblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZykge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2b2lkIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG5cbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKFtdLCAnbGVuZ3RoJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBnT1BEXG5cdFx0JGdPUEQgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJGdPUEQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG5cbnZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gaGFzUHJvcGVydHlEZXNjcmlwdG9ycygpIHtcblx0aWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHRyeSB7XG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyB2YWx1ZTogMSB9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGRlZmluZVByb3BlcnR5XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbmhhc1Byb3BlcnR5RGVzY3JpcHRvcnMuaGFzQXJyYXlMZW5ndGhEZWZpbmVCdWcgPSBmdW5jdGlvbiBoYXNBcnJheUxlbmd0aERlZmluZUJ1ZygpIHtcblx0Ly8gbm9kZSB2MC42IGhhcyBhIGJ1ZyB3aGVyZSBhcnJheSBsZW5ndGhzIGNhbiBiZSBTZXQgYnV0IG5vdCBEZWZpbmVkXG5cdGlmICghaGFzUHJvcGVydHlEZXNjcmlwdG9ycygpKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dHJ5IHtcblx0XHRyZXR1cm4gJGRlZmluZVByb3BlcnR5KFtdLCAnbGVuZ3RoJywgeyB2YWx1ZTogMSB9KS5sZW5ndGggIT09IDE7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJbiBGaXJlZm94IDQtMjIsIGRlZmluaW5nIGxlbmd0aCBvbiBhbiBhcnJheSB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sO1xudmFyIGhhc1N5bWJvbFNoYW0gPSByZXF1aXJlKCcuL3NoYW1zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzTmF0aXZlU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sKCdmb28nKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sKCdiYXInKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0cmV0dXJuIGhhc1N5bWJvbFNoYW0oKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBjb21wbGV4aXR5OiBbMiwgMThdLCBtYXgtc3RhdGVtZW50czogWzIsIDMzXSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7IHJldHVybiB0cnVlOyB9XG5cblx0dmFyIG9iaiA9IHt9O1xuXHR2YXIgc3ltID0gU3ltYm9sKCd0ZXN0Jyk7XG5cdHZhciBzeW1PYmogPSBPYmplY3Qoc3ltKTtcblx0aWYgKHR5cGVvZiBzeW0gPT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltT2JqKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9vYmplY3QuYXNzaWduL2lzc3Vlcy8xN1xuXHQvLyBpZiAoc3ltIGluc3RhbmNlb2YgU3ltYm9sKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMvaXNzdWVzLzRcblx0Ly8gaWYgKCEoc3ltT2JqIGluc3RhbmNlb2YgU3ltYm9sKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBpZiAodHlwZW9mIFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIGlmIChTdHJpbmcoc3ltKSAhPT0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bVZhbCA9IDQyO1xuXHRvYmpbc3ltXSA9IHN5bVZhbDtcblx0Zm9yIChzeW0gaW4gb2JqKSB7IHJldHVybiBmYWxzZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby11bnJlYWNoYWJsZS1sb29wXG5cdGlmICh0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKTtcblx0aWYgKHN5bXMubGVuZ3RoICE9PSAxIHx8IHN5bXNbMF0gIT09IHN5bSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKTtcblx0XHRpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gc3ltVmFsIHx8IGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scy9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1RvU3RyaW5nVGFnU2hhbXMoKSB7XG5cdHJldHVybiBoYXNTeW1ib2xzKCkgJiYgISFTeW1ib2wudG9TdHJpbmdUYWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG5cbnZhciBpc1N0YW5kYXJkQXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKGhhc1RvU3RyaW5nVGFnICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiAkdG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbnZhciBpc0xlZ2FjeUFyZ3VtZW50cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdGlmIChpc1N0YW5kYXJkQXJndW1lbnRzKHZhbHVlKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0JHRvU3RyaW5nKHZhbHVlKSAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdCR0b1N0cmluZyh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gaXNTdGFuZGFyZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xufSgpKTtcblxuaXNTdGFuZGFyZEFyZ3VtZW50cy5pc0xlZ2FjeUFyZ3VtZW50cyA9IGlzTGVnYWN5QXJndW1lbnRzOyAvLyBmb3IgdGVzdHNcblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c1N0YW5kYXJkQXJndW1lbnRzID8gaXNTdGFuZGFyZEFyZ3VtZW50cyA6IGlzTGVnYWN5QXJndW1lbnRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm5Ub1N0ciA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciByZWZsZWN0QXBwbHkgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgJiYgUmVmbGVjdCAhPT0gbnVsbCAmJiBSZWZsZWN0LmFwcGx5O1xudmFyIGJhZEFycmF5TGlrZTtcbnZhciBpc0NhbGxhYmxlTWFya2VyO1xuaWYgKHR5cGVvZiByZWZsZWN0QXBwbHkgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHR0cnkge1xuXHRcdGJhZEFycmF5TGlrZSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2xlbmd0aCcsIHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBpc0NhbGxhYmxlTWFya2VyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlzQ2FsbGFibGVNYXJrZXIgPSB7fTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuXHRcdHJlZmxlY3RBcHBseShmdW5jdGlvbiAoKSB7IHRocm93IDQyOyB9LCBudWxsLCBiYWRBcnJheUxpa2UpO1xuXHR9IGNhdGNoIChfKSB7XG5cdFx0aWYgKF8gIT09IGlzQ2FsbGFibGVNYXJrZXIpIHtcblx0XHRcdHJlZmxlY3RBcHBseSA9IG51bGw7XG5cdFx0fVxuXHR9XG59IGVsc2Uge1xuXHRyZWZsZWN0QXBwbHkgPSBudWxsO1xufVxuXG52YXIgY29uc3RydWN0b3JSZWdleCA9IC9eXFxzKmNsYXNzXFxiLztcbnZhciBpc0VTNkNsYXNzRm4gPSBmdW5jdGlvbiBpc0VTNkNsYXNzRnVuY3Rpb24odmFsdWUpIHtcblx0dHJ5IHtcblx0XHR2YXIgZm5TdHIgPSBmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3RvclJlZ2V4LnRlc3QoZm5TdHIpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlOyAvLyBub3QgYSBmdW5jdGlvblxuXHR9XG59O1xuXG52YXIgdHJ5RnVuY3Rpb25PYmplY3QgPSBmdW5jdGlvbiB0cnlGdW5jdGlvblRvU3RyKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKGlzRVM2Q2xhc3NGbih2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm5Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgb2JqZWN0Q2xhc3MgPSAnW29iamVjdCBPYmplY3RdJztcbnZhciBmbkNsYXNzID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbnZhciBnZW5DbGFzcyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG52YXIgZGRhQ2xhc3MgPSAnW29iamVjdCBIVE1MQWxsQ29sbGVjdGlvbl0nOyAvLyBJRSAxMVxudmFyIGRkYUNsYXNzMiA9ICdbb2JqZWN0IEhUTUwgZG9jdW1lbnQuYWxsIGNsYXNzXSc7XG52YXIgZGRhQ2xhc3MzID0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJzsgLy8gSUUgOS0xMFxudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiAhIVN5bWJvbC50b1N0cmluZ1RhZzsgLy8gYmV0dGVyOiB1c2UgYGhhcy10b3N0cmluZ3RhZ2BcblxudmFyIGlzSUU2OCA9ICEoMCBpbiBbLF0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNwYXJzZS1hcnJheXMsIGNvbW1hLXNwYWNpbmdcblxudmFyIGlzRERBID0gZnVuY3Rpb24gaXNEb2N1bWVudERvdEFsbCgpIHsgcmV0dXJuIGZhbHNlOyB9O1xuaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcpIHtcblx0Ly8gRmlyZWZveCAzIGNhbm9uaWNhbGl6ZXMgRERBIHRvIHVuZGVmaW5lZCB3aGVuIGl0J3Mgbm90IGFjY2Vzc2VkIGRpcmVjdGx5XG5cdHZhciBhbGwgPSBkb2N1bWVudC5hbGw7XG5cdGlmICh0b1N0ci5jYWxsKGFsbCkgPT09IHRvU3RyLmNhbGwoZG9jdW1lbnQuYWxsKSkge1xuXHRcdGlzRERBID0gZnVuY3Rpb24gaXNEb2N1bWVudERvdEFsbCh2YWx1ZSkge1xuXHRcdFx0LyogZ2xvYmFscyBkb2N1bWVudDogZmFsc2UgKi9cblx0XHRcdC8vIGluIElFIDYtOCwgdHlwZW9mIGRvY3VtZW50LmFsbCBpcyBcIm9iamVjdFwiIGFuZCBpdCdzIHRydXRoeVxuXHRcdFx0aWYgKChpc0lFNjggfHwgIXZhbHVlKSAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0c3RyID09PSBkZGFDbGFzc1xuXHRcdFx0XHRcdFx0fHwgc3RyID09PSBkZGFDbGFzczJcblx0XHRcdFx0XHRcdHx8IHN0ciA9PT0gZGRhQ2xhc3MzIC8vIG9wZXJhIDEyLjE2XG5cdFx0XHRcdFx0XHR8fCBzdHIgPT09IG9iamVjdENsYXNzIC8vIElFIDYtOFxuXHRcdFx0XHRcdCkgJiYgdmFsdWUoJycpID09IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgLyoqLyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZmxlY3RBcHBseVxuXHQ/IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAoaXNEREEodmFsdWUpKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dHJ5IHtcblx0XHRcdHJlZmxlY3RBcHBseSh2YWx1ZSwgbnVsbCwgYmFkQXJyYXlMaWtlKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZSAhPT0gaXNDYWxsYWJsZU1hcmtlcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuICFpc0VTNkNsYXNzRm4odmFsdWUpICYmIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTtcblx0fVxuXHQ6IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAoaXNEREEodmFsdWUpKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKGhhc1RvU3RyaW5nVGFnKSB7IHJldHVybiB0cnlGdW5jdGlvbk9iamVjdCh2YWx1ZSk7IH1cblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR2YXIgc3RyQ2xhc3MgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0XHRpZiAoc3RyQ2xhc3MgIT09IGZuQ2xhc3MgJiYgc3RyQ2xhc3MgIT09IGdlbkNsYXNzICYmICEoL15cXFtvYmplY3QgSFRNTC8pLnRlc3Qoc3RyQ2xhc3MpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHJldHVybiB0cnlGdW5jdGlvbk9iamVjdCh2YWx1ZSk7XG5cdH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZm5Ub1N0ciA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciBpc0ZuUmVnZXggPSAvXlxccyooPzpmdW5jdGlvbik/XFwqLztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgZ2V0R2VuZXJhdG9yRnVuYyA9IGZ1bmN0aW9uICgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gZnVuY3Rpb24qKCkge30nKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdH1cbn07XG52YXIgR2VuZXJhdG9yRnVuY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNHZW5lcmF0b3JGdW5jdGlvbihmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChpc0ZuUmVnZXgudGVzdChmblRvU3RyLmNhbGwoZm4pKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHtcblx0XHR2YXIgc3RyID0gdG9TdHIuY2FsbChmbik7XG5cdFx0cmV0dXJuIHN0ciA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblx0fVxuXHRpZiAoIWdldFByb3RvKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmICh0eXBlb2YgR2VuZXJhdG9yRnVuY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0dmFyIGdlbmVyYXRvckZ1bmMgPSBnZXRHZW5lcmF0b3JGdW5jKCk7XG5cdFx0R2VuZXJhdG9yRnVuY3Rpb24gPSBnZW5lcmF0b3JGdW5jID8gZ2V0UHJvdG8oZ2VuZXJhdG9yRnVuYykgOiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gZ2V0UHJvdG8oZm4pID09PSBHZW5lcmF0b3JGdW5jdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIuaXNuYW4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgTnVtYmVyKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmIChOdW1iZXIuaXNOYU4gJiYgTnVtYmVyLmlzTmFOKE5hTikgJiYgIU51bWJlci5pc05hTignYScpKSB7XG5cdFx0cmV0dXJuIE51bWJlci5pc05hTjtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1OdW1iZXJJc05hTigpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKE51bWJlciwgeyBpc05hTjogcG9seWZpbGwgfSwge1xuXHRcdGlzTmFOOiBmdW5jdGlvbiB0ZXN0SXNOYU4oKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJyk7XG52YXIgYXZhaWxhYmxlVHlwZWRBcnJheXMgPSByZXF1aXJlKCdhdmFpbGFibGUtdHlwZWQtYXJyYXlzJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSByZXF1aXJlKCdoYXMtdG9zdHJpbmd0YWcvc2hhbXMnKSgpO1xudmFyIGdPUEQgPSByZXF1aXJlKCdnb3BkJyk7XG5cbnZhciBnID0gdHlwZW9mIGdsb2JhbFRoaXMgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogZ2xvYmFsVGhpcztcbnZhciB0eXBlZEFycmF5cyA9IGF2YWlsYWJsZVR5cGVkQXJyYXlzKCk7XG5cbnZhciAkaW5kZXhPZiA9IGNhbGxCb3VuZCgnQXJyYXkucHJvdG90eXBlLmluZGV4T2YnLCB0cnVlKSB8fCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn07XG52YXIgJHNsaWNlID0gY2FsbEJvdW5kKCdTdHJpbmcucHJvdG90eXBlLnNsaWNlJyk7XG52YXIgdG9TdHJUYWdzID0ge307XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7IC8vIHJlcXVpcmUoJ2dldHByb3RvdHlwZW9mJyk7XG5pZiAoaGFzVG9TdHJpbmdUYWcgJiYgZ09QRCAmJiBnZXRQcm90b3R5cGVPZikge1xuXHRmb3JFYWNoKHR5cGVkQXJyYXlzLCBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHRcdHZhciBhcnIgPSBuZXcgZ1t0eXBlZEFycmF5XSgpO1xuXHRcdGlmIChTeW1ib2wudG9TdHJpbmdUYWcgaW4gYXJyKSB7XG5cdFx0XHR2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGVPZihhcnIpO1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdFx0aWYgKCFkZXNjcmlwdG9yKSB7XG5cdFx0XHRcdHZhciBzdXBlclByb3RvID0gZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuXHRcdFx0XHRkZXNjcmlwdG9yID0gZ09QRChzdXBlclByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdFx0fVxuXHRcdFx0dG9TdHJUYWdzW3R5cGVkQXJyYXldID0gZGVzY3JpcHRvci5nZXQ7XG5cdFx0fVxuXHR9KTtcbn1cblxudmFyIHRyeVR5cGVkQXJyYXlzID0gZnVuY3Rpb24gdHJ5QWxsVHlwZWRBcnJheXModmFsdWUpIHtcblx0dmFyIGFueVRydWUgPSBmYWxzZTtcblx0Zm9yRWFjaCh0b1N0clRhZ3MsIGZ1bmN0aW9uIChnZXR0ZXIsIHR5cGVkQXJyYXkpIHtcblx0XHRpZiAoIWFueVRydWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGFueVRydWUgPSBnZXR0ZXIuY2FsbCh2YWx1ZSkgPT09IHR5cGVkQXJyYXk7XG5cdFx0XHR9IGNhdGNoIChlKSB7IC8qKi8gfVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBhbnlUcnVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcblx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnIHx8ICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlKSkge1xuXHRcdHZhciB0YWcgPSAkc2xpY2UoJHRvU3RyaW5nKHZhbHVlKSwgOCwgLTEpO1xuXHRcdHJldHVybiAkaW5kZXhPZih0eXBlZEFycmF5cywgdGFnKSA+IC0xO1xuXHR9XG5cdGlmICghZ09QRCkgeyByZXR1cm4gZmFsc2U7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBudW1iZXJJc05hTiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpcyhhLCBiKSB7XG5cdGlmIChhID09PSAwICYmIGIgPT09IDApIHtcblx0XHRyZXR1cm4gMSAvIGEgPT09IDEgLyBiO1xuXHR9XG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKG51bWJlcklzTmFOKGEpICYmIG51bWJlcklzTmFOKGIpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpLCBPYmplY3QpO1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdHJldHVybiB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltT2JqZWN0SXMoKSB7XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdGRlZmluZShPYmplY3QsIHsgaXM6IHBvbHlmaWxsIH0sIHtcblx0XHRpczogZnVuY3Rpb24gdGVzdE9iamVjdElzKCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5pcyAhPT0gcG9seWZpbGw7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHBvbHlmaWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0dmFyIGlzQXJncyA9IHN0ciA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdGlmICghaXNBcmdzKSB7XG5cdFx0aXNBcmdzID0gc3RyICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0XHR2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGlzQXJncztcbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvdXRpbC90eXBlcy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8xMTJjYzdjMjc1NTEyNTRhYTJiMTcwOThmYjc3NDg2N2YwNWVkMGQ5XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJndW1lbnRzT2JqZWN0ID0gcmVxdWlyZSgnaXMtYXJndW1lbnRzJyk7XG52YXIgaXNHZW5lcmF0b3JGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWdlbmVyYXRvci1mdW5jdGlvbicpO1xudmFyIHdoaWNoVHlwZWRBcnJheSA9IHJlcXVpcmUoJ3doaWNoLXR5cGVkLWFycmF5Jyk7XG52YXIgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnaXMtdHlwZWQtYXJyYXknKTtcblxuZnVuY3Rpb24gdW5jdXJyeVRoaXMoZikge1xuICByZXR1cm4gZi5jYWxsLmJpbmQoZik7XG59XG5cbnZhciBCaWdJbnRTdXBwb3J0ZWQgPSB0eXBlb2YgQmlnSW50ICE9PSAndW5kZWZpbmVkJztcbnZhciBTeW1ib2xTdXBwb3J0ZWQgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJztcblxudmFyIE9iamVjdFRvU3RyaW5nID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG5cbnZhciBudW1iZXJWYWx1ZSA9IHVuY3VycnlUaGlzKE51bWJlci5wcm90b3R5cGUudmFsdWVPZik7XG52YXIgc3RyaW5nVmFsdWUgPSB1bmN1cnJ5VGhpcyhTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIGJvb2xlYW5WYWx1ZSA9IHVuY3VycnlUaGlzKEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YpO1xuXG5pZiAoQmlnSW50U3VwcG9ydGVkKSB7XG4gIHZhciBiaWdJbnRWYWx1ZSA9IHVuY3VycnlUaGlzKEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmlmIChTeW1ib2xTdXBwb3J0ZWQpIHtcbiAgdmFyIHN5bWJvbFZhbHVlID0gdW5jdXJyeVRoaXMoU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgcHJvdG90eXBlVmFsdWVPZikge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIHByb3RvdHlwZVZhbHVlT2YodmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0cy5pc0FyZ3VtZW50c09iamVjdCA9IGlzQXJndW1lbnRzT2JqZWN0O1xuZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gaXNHZW5lcmF0b3JGdW5jdGlvbjtcbmV4cG9ydHMuaXNUeXBlZEFycmF5ID0gaXNUeXBlZEFycmF5O1xuXG4vLyBUYWtlbiBmcm9tIGhlcmUgYW5kIG1vZGlmaWVkIGZvciBiZXR0ZXIgYnJvd3NlciBzdXBwb3J0XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3AtaXMtcHJvbWlzZS9ibG9iL2NkYTM1YTUxM2JkYTAzZjk3N2FkNWNkZTNhMDc5ZDIzN2U4MmQ3ZWYvaW5kZXguanNcbmZ1bmN0aW9uIGlzUHJvbWlzZShpbnB1dCkge1xuXHRyZXR1cm4gKFxuXHRcdChcblx0XHRcdHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJlxuXHRcdFx0aW5wdXQgaW5zdGFuY2VvZiBQcm9taXNlXG5cdFx0KSB8fFxuXHRcdChcblx0XHRcdGlucHV0ICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgaW5wdXQudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LmNhdGNoID09PSAnZnVuY3Rpb24nXG5cdFx0KVxuXHQpO1xufVxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJldHVybiBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBpc1R5cGVkQXJyYXkodmFsdWUpIHx8XG4gICAgaXNEYXRhVmlldyh2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNBcnJheUJ1ZmZlclZpZXcgPSBpc0FycmF5QnVmZmVyVmlldztcblxuXG5mdW5jdGlvbiBpc1VpbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50OEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OEFycmF5ID0gaXNVaW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQ4Q2xhbXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhDbGFtcGVkQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQ4Q2xhbXBlZEFycmF5ID0gaXNVaW50OENsYW1wZWRBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50MTZBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50MTZBcnJheSA9IGlzVWludDE2QXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MzJBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDMyQXJyYXkgPSBpc1VpbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDhBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0ludDhBcnJheSc7XG59XG5leHBvcnRzLmlzSW50OEFycmF5ID0gaXNJbnQ4QXJyYXk7XG5cbmZ1bmN0aW9uIGlzSW50MTZBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0ludDE2QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDE2QXJyYXkgPSBpc0ludDE2QXJyYXk7XG5cbmZ1bmN0aW9uIGlzSW50MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0ludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDMyQXJyYXkgPSBpc0ludDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDMyQXJyYXkgPSBpc0Zsb2F0MzJBcnJheTtcblxuZnVuY3Rpb24gaXNGbG9hdDY0QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdGbG9hdDY0QXJyYXknO1xufVxuZXhwb3J0cy5pc0Zsb2F0NjRBcnJheSA9IGlzRmxvYXQ2NEFycmF5O1xuXG5mdW5jdGlvbiBpc0JpZ0ludDY0QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdCaWdJbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdJbnQ2NEFycmF5ID0gaXNCaWdJbnQ2NEFycmF5O1xuXG5mdW5jdGlvbiBpc0JpZ1VpbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnVWludDY0QXJyYXknO1xufVxuZXhwb3J0cy5pc0JpZ1VpbnQ2NEFycmF5ID0gaXNCaWdVaW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNNYXBUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBNYXBdJztcbn1cbmlzTWFwVG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNNYXBUb1N0cmluZyhuZXcgTWFwKCkpXG4pO1xuXG5mdW5jdGlvbiBpc01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNNYXBUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBNYXA7XG59XG5leHBvcnRzLmlzTWFwID0gaXNNYXA7XG5cbmZ1bmN0aW9uIGlzU2V0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2V0XSc7XG59XG5pc1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzU2V0VG9TdHJpbmcobmV3IFNldCgpKVxuKTtcbmZ1bmN0aW9uIGlzU2V0KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc1NldFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzU2V0VG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNldDtcbn1cbmV4cG9ydHMuaXNTZXQgPSBpc1NldDtcblxuZnVuY3Rpb24gaXNXZWFrTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2Vha01hcF0nO1xufVxuaXNXZWFrTWFwVG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzV2Vha01hcFRvU3RyaW5nKG5ldyBXZWFrTWFwKCkpXG4pO1xuZnVuY3Rpb24gaXNXZWFrTWFwKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNXZWFrTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNXZWFrTWFwVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFdlYWtNYXA7XG59XG5leHBvcnRzLmlzV2Vha01hcCA9IGlzV2Vha01hcDtcblxuZnVuY3Rpb24gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2Vha1NldF0nO1xufVxuaXNXZWFrU2V0VG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIFdlYWtTZXQgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzV2Vha1NldFRvU3RyaW5nKG5ldyBXZWFrU2V0KCkpXG4pO1xuZnVuY3Rpb24gaXNXZWFrU2V0KHZhbHVlKSB7XG4gIHJldHVybiBpc1dlYWtTZXRUb1N0cmluZyh2YWx1ZSk7XG59XG5leHBvcnRzLmlzV2Vha1NldCA9IGlzV2Vha1NldDtcblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5pc0FycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc0FycmF5QnVmZmVyVG9TdHJpbmcobmV3IEFycmF5QnVmZmVyKCkpXG4pO1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc0FycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn1cbmV4cG9ydHMuaXNBcnJheUJ1ZmZlciA9IGlzQXJyYXlCdWZmZXI7XG5cbmZ1bmN0aW9uIGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBEYXRhVmlld10nO1xufVxuaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgdHlwZW9mIERhdGFWaWV3ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc0RhdGFWaWV3VG9TdHJpbmcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSwgMCwgMSkpXG4pO1xuZnVuY3Rpb24gaXNEYXRhVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc0RhdGFWaWV3VG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNEYXRhVmlld1RvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBEYXRhVmlldztcbn1cbmV4cG9ydHMuaXNEYXRhVmlldyA9IGlzRGF0YVZpZXc7XG5cbi8vIFN0b3JlIGEgY29weSBvZiBTaGFyZWRBcnJheUJ1ZmZlciBpbiBjYXNlIGl0J3MgZGVsZXRlZCBlbHNld2hlcmVcbnZhciBTaGFyZWRBcnJheUJ1ZmZlckNvcHkgPSB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnID8gU2hhcmVkQXJyYXlCdWZmZXIgOiB1bmRlZmluZWQ7XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdJztcbn1cbmZ1bmN0aW9uIGlzU2hhcmVkQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlckNvcHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZyA9IGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZyhuZXcgU2hhcmVkQXJyYXlCdWZmZXJDb3B5KCkpO1xuICB9XG5cbiAgcmV0dXJuIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyQ29weTtcbn1cbmV4cG9ydHMuaXNTaGFyZWRBcnJheUJ1ZmZlciA9IGlzU2hhcmVkQXJyYXlCdWZmZXI7XG5cbmZ1bmN0aW9uIGlzQXN5bmNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXSc7XG59XG5leHBvcnRzLmlzQXN5bmNGdW5jdGlvbiA9IGlzQXN5bmNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNNYXBJdGVyYXRvcih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBNYXAgSXRlcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNNYXBJdGVyYXRvciA9IGlzTWFwSXRlcmF0b3I7XG5cbmZ1bmN0aW9uIGlzU2V0SXRlcmF0b3IodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2V0IEl0ZXJhdG9yXSc7XG59XG5leHBvcnRzLmlzU2V0SXRlcmF0b3IgPSBpc1NldEl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBpc0dlbmVyYXRvck9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBHZW5lcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNHZW5lcmF0b3JPYmplY3QgPSBpc0dlbmVyYXRvck9iamVjdDtcblxuZnVuY3Rpb24gaXNXZWJBc3NlbWJseUNvbXBpbGVkTW9kdWxlKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYkFzc2VtYmx5Lk1vZHVsZV0nO1xufVxuZXhwb3J0cy5pc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGUgPSBpc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGU7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBudW1iZXJWYWx1ZSk7XG59XG5leHBvcnRzLmlzTnVtYmVyT2JqZWN0ID0gaXNOdW1iZXJPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBzdHJpbmdWYWx1ZSk7XG59XG5leHBvcnRzLmlzU3RyaW5nT2JqZWN0ID0gaXNTdHJpbmdPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgYm9vbGVhblZhbHVlKTtcbn1cbmV4cG9ydHMuaXNCb29sZWFuT2JqZWN0ID0gaXNCb29sZWFuT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0JpZ0ludE9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gQmlnSW50U3VwcG9ydGVkICYmIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIGJpZ0ludFZhbHVlKTtcbn1cbmV4cG9ydHMuaXNCaWdJbnRPYmplY3QgPSBpc0JpZ0ludE9iamVjdDtcblxuZnVuY3Rpb24gaXNTeW1ib2xPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIFN5bWJvbFN1cHBvcnRlZCAmJiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBzeW1ib2xWYWx1ZSk7XG59XG5leHBvcnRzLmlzU3ltYm9sT2JqZWN0ID0gaXNTeW1ib2xPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQm94ZWRQcmltaXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICBpc051bWJlck9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc1N0cmluZ09iamVjdCh2YWx1ZSkgfHxcbiAgICBpc0Jvb2xlYW5PYmplY3QodmFsdWUpIHx8XG4gICAgaXNCaWdJbnRPYmplY3QodmFsdWUpIHx8XG4gICAgaXNTeW1ib2xPYmplY3QodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQm94ZWRQcmltaXRpdmUgPSBpc0JveGVkUHJpbWl0aXZlO1xuXG5mdW5jdGlvbiBpc0FueUFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxuICAgIGlzQXJyYXlCdWZmZXIodmFsdWUpIHx8XG4gICAgaXNTaGFyZWRBcnJheUJ1ZmZlcih2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNBbnlBcnJheUJ1ZmZlciA9IGlzQW55QXJyYXlCdWZmZXI7XG5cblsnaXNQcm94eScsICdpc0V4dGVybmFsJywgJ2lzTW9kdWxlTmFtZXNwYWNlT2JqZWN0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG1ldGhvZCwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXRob2QgKyAnIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdXNlcmxhbmQnKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyB8fFxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaikge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB2YXIgZGVzY3JpcHRvcnMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlc2NyaXB0b3JzW2tleXNbaV1dID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY3JpcHRvcnM7XG4gIH07XG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52UmVnZXggPSAvXiQvO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykge1xuICB2YXIgZGVidWdFbnYgPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHO1xuICBkZWJ1Z0VudiA9IGRlYnVnRW52LnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrPy5dL2csICdcXFxcJCYnKVxuICAgIC5yZXBsYWNlKC9cXCovZywgJy4qJylcbiAgICAucmVwbGFjZSgvLC9nLCAnJHxeJylcbiAgICAudG9VcHBlckNhc2UoKTtcbiAgZGVidWdFbnZSZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgZGVidWdFbnYgKyAnJCcsICdpJyk7XG59XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKGRlYnVnRW52UmVnZXgudGVzdChzZXQpKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnNsaWNlKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMSwgLTEpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmV4cG9ydHMudHlwZXMgPSByZXF1aXJlKCcuL3N1cHBvcnQvdHlwZXMnKTtcblxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcbmV4cG9ydHMudHlwZXMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5leHBvcnRzLnR5cGVzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuZXhwb3J0cy50eXBlcy5pc05hdGl2ZUVycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxudmFyIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sKCd1dGlsLnByb21pc2lmeS5jdXN0b20nKSA6IHVuZGVmaW5lZDtcblxuZXhwb3J0cy5wcm9taXNpZnkgPSBmdW5jdGlvbiBwcm9taXNpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgJiYgb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXSkge1xuICAgIHZhciBmbiA9IG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF07XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwidXRpbC5wcm9taXNpZnkuY3VzdG9tXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZuKCkge1xuICAgIHZhciBwcm9taXNlUmVzb2x2ZSwgcHJvbWlzZVJlamVjdDtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHByb21pc2VSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHByb21pc2VSZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG5cbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgYXJncy5wdXNoKGZ1bmN0aW9uIChlcnIsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihmbiwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuICAgIGZuLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpXG4gICk7XG59XG5cbmV4cG9ydHMucHJvbWlzaWZ5LmN1c3RvbSA9IGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbFxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeU9uUmVqZWN0ZWQocmVhc29uLCBjYikge1xuICAvLyBgIXJlYXNvbmAgZ3VhcmQgaW5zcGlyZWQgYnkgYmx1ZWJpcmQgKFJlZjogaHR0cHM6Ly9nb28uZ2wvdDVJUzZNKS5cbiAgLy8gQmVjYXVzZSBgbnVsbGAgaXMgYSBzcGVjaWFsIGVycm9yIHZhbHVlIGluIGNhbGxiYWNrcyB3aGljaCBtZWFucyBcIm5vIGVycm9yXG4gIC8vIG9jY3VycmVkXCIsIHdlIGVycm9yLXdyYXAgc28gdGhlIGNhbGxiYWNrIGNvbnN1bWVyIGNhbiBkaXN0aW5ndWlzaCBiZXR3ZWVuXG4gIC8vIFwidGhlIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBudWxsXCIgb3IgXCJ0aGUgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB1bmRlZmluZWRcIi5cbiAgaWYgKCFyZWFzb24pIHtcbiAgICB2YXIgbmV3UmVhc29uID0gbmV3IEVycm9yKCdQcm9taXNlIHdhcyByZWplY3RlZCB3aXRoIGEgZmFsc3kgdmFsdWUnKTtcbiAgICBuZXdSZWFzb24ucmVhc29uID0gcmVhc29uO1xuICAgIHJlYXNvbiA9IG5ld1JlYXNvbjtcbiAgfVxuICByZXR1cm4gY2IocmVhc29uKTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gIH1cblxuICAvLyBXZSBETyBOT1QgcmV0dXJuIHRoZSBwcm9taXNlIGFzIGl0IGdpdmVzIHRoZSB1c2VyIGEgZmFsc2Ugc2Vuc2UgdGhhdFxuICAvLyB0aGUgcHJvbWlzZSBpcyBhY3R1YWxseSBzb21laG93IHJlbGF0ZWQgdG8gdGhlIGNhbGxiYWNrJ3MgZXhlY3V0aW9uXG4gIC8vIGFuZCB0aGF0IHRoZSBjYWxsYmFjayB0aHJvd2luZyB3aWxsIHJlamVjdCB0aGUgcHJvbWlzZS5cbiAgZnVuY3Rpb24gY2FsbGJhY2tpZmllZCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbWF5YmVDYiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKHR5cGVvZiBtYXliZUNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGFzdCBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1heWJlQ2IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIC8vIEluIHRydWUgbm9kZSBzdHlsZSB3ZSBwcm9jZXNzIHRoZSBjYWxsYmFjayBvbiBgbmV4dFRpY2tgIHdpdGggYWxsIHRoZVxuICAgIC8vIGltcGxpY2F0aW9ucyAoc3RhY2ssIGB1bmNhdWdodEV4Y2VwdGlvbmAsIGBhc3luY19ob29rc2ApXG4gICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJldCkgeyBwcm9jZXNzLm5leHRUaWNrKGNiLmJpbmQobnVsbCwgbnVsbCwgcmV0KSkgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlaikgeyBwcm9jZXNzLm5leHRUaWNrKGNhbGxiYWNraWZ5T25SZWplY3RlZC5iaW5kKG51bGwsIHJlaiwgY2IpKSB9KTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihjYWxsYmFja2lmaWVkLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2FsbGJhY2tpZmllZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbCkpO1xuICByZXR1cm4gY2FsbGJhY2tpZmllZDtcbn1cbmV4cG9ydHMuY2FsbGJhY2tpZnkgPSBjYWxsYmFja2lmeTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpO1xudmFyIGF2YWlsYWJsZVR5cGVkQXJyYXlzID0gcmVxdWlyZSgnYXZhaWxhYmxlLXR5cGVkLWFycmF5cycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSByZXF1aXJlKCdoYXMtdG9zdHJpbmd0YWcvc2hhbXMnKSgpO1xuXG52YXIgZyA9IHR5cGVvZiBnbG9iYWxUaGlzID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IGdsb2JhbFRoaXM7XG52YXIgdHlwZWRBcnJheXMgPSBhdmFpbGFibGVUeXBlZEFycmF5cygpO1xuXG52YXIgJHNsaWNlID0gY2FsbEJvdW5kKCdTdHJpbmcucHJvdG90eXBlLnNsaWNlJyk7XG52YXIgdG9TdHJUYWdzID0ge307XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7IC8vIHJlcXVpcmUoJ2dldHByb3RvdHlwZW9mJyk7XG5pZiAoaGFzVG9TdHJpbmdUYWcgJiYgZ09QRCAmJiBnZXRQcm90b3R5cGVPZikge1xuXHRmb3JFYWNoKHR5cGVkQXJyYXlzLCBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHRcdGlmICh0eXBlb2YgZ1t0eXBlZEFycmF5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFyIGFyciA9IG5ldyBnW3R5cGVkQXJyYXldKCk7XG5cdFx0XHRpZiAoU3ltYm9sLnRvU3RyaW5nVGFnIGluIGFycikge1xuXHRcdFx0XHR2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGVPZihhcnIpO1xuXHRcdFx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRcdGlmICghZGVzY3JpcHRvcikge1xuXHRcdFx0XHRcdHZhciBzdXBlclByb3RvID0gZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuXHRcdFx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dG9TdHJUYWdzW3R5cGVkQXJyYXldID0gZGVzY3JpcHRvci5nZXQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxudmFyIHRyeVR5cGVkQXJyYXlzID0gZnVuY3Rpb24gdHJ5QWxsVHlwZWRBcnJheXModmFsdWUpIHtcblx0dmFyIGZvdW5kTmFtZSA9IGZhbHNlO1xuXHRmb3JFYWNoKHRvU3RyVGFncywgZnVuY3Rpb24gKGdldHRlciwgdHlwZWRBcnJheSkge1xuXHRcdGlmICghZm91bmROYW1lKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgbmFtZSA9IGdldHRlci5jYWxsKHZhbHVlKTtcblx0XHRcdFx0aWYgKG5hbWUgPT09IHR5cGVkQXJyYXkpIHtcblx0XHRcdFx0XHRmb3VuZE5hbWUgPSBuYW1lO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBmb3VuZE5hbWU7XG59O1xuXG52YXIgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnaXMtdHlwZWQtYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaFR5cGVkQXJyYXkodmFsdWUpIHtcblx0aWYgKCFpc1R5cGVkQXJyYXkodmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnIHx8ICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlKSkgeyByZXR1cm4gJHNsaWNlKCR0b1N0cmluZyh2YWx1ZSksIDgsIC0xKTsgfVxuXHRyZXR1cm4gdHJ5VHlwZWRBcnJheXModmFsdWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBvc3NpYmxlTmFtZXMgPSBbXG5cdCdCaWdJbnQ2NEFycmF5Jyxcblx0J0JpZ1VpbnQ2NEFycmF5Jyxcblx0J0Zsb2F0MzJBcnJheScsXG5cdCdGbG9hdDY0QXJyYXknLFxuXHQnSW50MTZBcnJheScsXG5cdCdJbnQzMkFycmF5Jyxcblx0J0ludDhBcnJheScsXG5cdCdVaW50MTZBcnJheScsXG5cdCdVaW50MzJBcnJheScsXG5cdCdVaW50OEFycmF5Jyxcblx0J1VpbnQ4Q2xhbXBlZEFycmF5J1xuXTtcblxudmFyIGcgPSB0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiBnbG9iYWxUaGlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF2YWlsYWJsZVR5cGVkQXJyYXlzKCkge1xuXHR2YXIgb3V0ID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcG9zc2libGVOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICh0eXBlb2YgZ1twb3NzaWJsZU5hbWVzW2ldXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0b3V0W291dC5sZW5ndGhdID0gcG9zc2libGVOYW1lc1tpXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVzdENvbnNvbGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdvb2QgZGF5LCB0aGlzIGlzIGEgbmV3ZXIgeDIgdGVzdC5cIik7ICAgIFxyXG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==