'use strict';

var common = require('./common-assert');
var NumberAssert = require('./number-assert');
var StringAssert = require('./string-assert');
var ObjectAssert = require('./object-assert');
var ArrayAssert = require('./array-assert');
var DateAssert = require('./date-assert');

var _isOptional = false;

function Assert() {
  Object.defineProperties(this, {
    isOptional: {
      enumerable: true,
      configurable: false,
      get: function() {
        var retVal = _isOptional;
        _isOptional = false;
        return retVal;
      },
      set: function(value) {
        _isOptional = value
      }
    }
  });
}

/**
 * Sets the optional flag allowing for null or undefined values
 * Flag only stays set for one assertion chain
 * @returns {Assert}
 */
Assert.prototype.optional = function() {
  this.isOptional = true;
  return this;
};

/**
 * Asserts if the value being passed in is a number
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {NumberAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not a number
 */
Assert.prototype.number = function(name, value) {
  return common.optional(this.isOptional, value, function() {
    return new NumberAssert(name, value);
  });
};

/**
 * Asserts if the value being passed in is a string
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {StringAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not a string
 */
Assert.prototype.string = function(name, value) {
  return common.optional(this.isOptional, value, function() {
    return new StringAssert(name, value);
  });
};

/**
 * Asserts if the value being passed in is a boolean
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a boolean
 */
Assert.prototype.bool = function(name, value) {
  common.optional(this.isOptional, value, function() {
    common.typeCheck(name, value, 'boolean');
  });
};

/**
 * Asserts if the value being passed in is a Buffer
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a Buffer
 */
Assert.prototype.buffer = function(name, value) {
  common.optional(this.isOptional, value, function() {
    if(!Buffer.isBuffer(value)) {
      common.error(value, 'Buffer', name + ' should be a buffer', 'buffer');
    }
  });
};

/**
 * Asserts if the value being passed in is an object
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {ObjectAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not an object
 */
Assert.prototype.object = function(name, value) {
  return common.optional(this.isOptional, value, function() {
    return new ObjectAssert(name, value);
  });
};

/**
 * Asserts if the value being passed in is an array
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {ArrayAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not an array
 */
Assert.prototype.array = function(name, value) {
  return common.optional(this.isOptional, value, function() {
    return new ArrayAssert(name, value);
  });
};

/**
 * Asserts if the value being passed in is a function
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a function
 */
Assert.prototype.func = function(name, value) {
  common.optional(this.isOptional, value, function() {
    common.typeCheck(name, value, 'function');
  });
};

/**
 * Asserts if the value being passed in is a date
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a date
 */
Assert.prototype.date = function(name, value) {
  return common.optional(this.isOptional, value, function() {
    return new DateAssert(name ,value);
  });
};

/**
 * Asserts if the value being passed in is not null or undefined
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is null or undefined
 */
Assert.prototype.ok = function(name, value) {
  if(value === undefined || value === null) {
    common.error(value,
      name + ' to not be undefined or null',
      value + 'should not be undefined or null',
      'ok');
  }
};

/**
 * Asserts if the value being passed in is a number
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @param {Function} predicate - Predicate function to test value against
 * @throws {AssertionError} - If value does not match the predicate
 */
Assert.prototype.custom = function(name, value, predicate) {
  common.typeCheck('predicate', predicate, 'function');

  if(!predicate(value)) {
    common.error(value,
      name + ' should satisfy the predicate function',
      'value must match predicate',
      'custom');
  }
};

module.exports = new Assert();
