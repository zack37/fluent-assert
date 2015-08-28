import { AssertionError } from 'assert'

const runningMode = process.env.NODE_ENV || 'debug';

/**
 * Helper function to perform type checks. Allows for simple wrapping of the
 * NODE_ENV environment variable
 * @param {Object} value - The value to type
 * @param {String} type - The type to test against as a string
 * @returns {boolean}
 */
function isType(value, type) {
  return runningMode === 'production' || typeof value === type;
}

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
  if(!isType(value, type)) {
    error(typeof value, type, `${name} should be of type ${type}`, 'type');
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
      message: `${name}  should be an array`,
      actual: value.toString(),
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
 * Similar to typeCheck, but uses the Object toString to grab the type for
 * wrapped objects. Slower than typeof, * so please use typeCheck where possible
 * https://jsperf.com/typeof-vs-object-prototype-tostring-call/5
 * @param {String} name - Name of value for assertion error message
 * @param {Object} value - value to check type of
 * @param {String} expectedType - The expected type as a string
 * @throws {AssertionError} - Throws error if value is not of type expectedType
 */
function toStringCheck(name, value, expectedType) {
  let objToString = Object.prototype.toString.call(value);
  let regexp = new RegExp(expectedType, 'i');
  if(!regexp.test(objToString)) {
    error(value,
      expectedType,
      `${name} should be of type ${expectedType}`,
      'toStringCheck');
  }
}

export default {
  typeCheck,
  isType,
  arrayCheck,
  error,
  optional,
  toStringCheck
};
