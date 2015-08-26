'use strict';

var AssertionError = require('assert').AssertionError;

/**
 * Helper function to throw assertion error
 * @param actual - Actual value
 * @param expected - Expected value
 * @param message - Message for user consumption
 * @param func - Start stack function
 */
function error(actual, expected, message, func) {
  throw new AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operation: func,
    stackStartFunction: func
  });
}

/**
 * Checks value against type using `typeof`
 * @param {String} name - name of value used in AssertionError message
 * @param {Object} value - value to check
 * @param {String} type - type to check value against
 * @throws {AssertionError} - Throws error if value is not of type
 */
function typeCheck(name, value, type) {
  if(typeof (value) !== type) {
    error(typeof value, type, name + 'should be of type ' + type, 'type');
  }
}

/**
 * Checks if value is an array
 * @param {String} name - name of value used in AssertionError message
 * @param {Object} value - value to check
 * @throws {AssertionError} - Throws error if value is not an array
 */
function arrayCheck(name, value) {
  if(!Array.isArray(value)) {
    throw new AssertionError({
      message: name + ' should be an array',
      actual: typeof value,
      expected: 'Array',
      operation: 'array',
      stackStartFunction: 'array'
    });
  }
}

/**
 * Helper wrapper function for optional value checking
 * @param {Boolean} isOptional - Whether or not to run the callback
 * @param {Object} value - value to check
 * @param {Function} cb - Callback to invoke if conditions are met
 * @returns {*} - Value of callback function
 */
function optional(isOptional, value, cb) {
  if(!isOptional || (value !== null && value !== undefined)) {
    return cb();
  }
}

/**
 * Similar to typeCheck, but uses the Object toString to grab the type for wrapped objects. Slower than typeof,
 * so please use typeCheck where possible
 * https://jsperf.com/typeof-vs-object-prototype-tostring-call/5
 * @param {String} name - Name of value for assertion error message
 * @param {Object} value - value to check type of
 * @param {String} expectedType - The expected type as a string
 * @throws {AssertionError} - Throws error if value is not of type expectedType
 */
function toStringCheck(name, value, expectedType) {
  var objToString = Object.prototype.toString.call(value);
  var regexp = new RegExp(expectedType, 'i');
  if(!regexp.test(objToString)) {
    error(value, expectedType, name + ' should be of type ' + expectedType, 'toStringCheck');
  }
}

module.exports = {
  typeCheck: typeCheck,
  arrayCheck: arrayCheck,
  error: error,
  optional: optional,
  toStringCheck: toStringCheck
};
