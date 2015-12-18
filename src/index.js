import common from './common-assert'
import numberAssert from './number-assert';
import stringAssert from './string-assert';
import objectAssert from './object-assert';
import arrayAssert from './array-assert';
import dateAssert from './date-assert';

let assert = {};
let isOptional = false;

/**
 * Sets the optional flag allowing for null or undefined values
 * Flag only stays set for one assertion chain
 * @returns {Assert}
 */
assert.optional = () => {
  isOptional = true;
  return assert;
};

/**
 * Asserts if the value being passed in is a number
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {NumberAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not a number
 */
assert.number = (name, value) => {
  let na = numberAssert(name, value, isOptional);
  isOptional = false;
  return na;
};

/**
 * Asserts if the value being passed in is a string
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {StringAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not a string
 */
assert.string = (name, value) => {
  let sa = stringAssert(name, value, isOptional);
  isOptional = false;
  return sa;
};

/**
 * Asserts if the value being passed in is a boolean
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a boolean
 */
assert.bool = (name, value) => {
  common.optional(isOptional, value, () =>
    common.typeCheck(name, value, 'boolean')
  );
};

/**
 * Asserts if the value being passed in is a Buffer
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a Buffer
 */
assert.buffer = (name, value) => {
  common.optional(isOptional, value, () => {
    if(!Buffer.isBuffer(value)) {
      common.error(value, 'Buffer', `${name} should be a buffer`, 'buffer');
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
assert.object = (name, value) => {
  let oa = objectAssert(name, value, isOptional);
  isOptional = false;
  return oa;
};

/**
 * Asserts if the value being passed in is an array
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @returns {ArrayAssert|exports|module.exports}
 * @throws {AssertionError} - If value is not an array
 */
assert.array = (name, value) => {
  let aa = arrayAssert(name, value, isOptional);
  isOptional = false;
  return aa;
};

/**
 * Asserts if the value being passed in is a function
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a function
 */
assert.func = (name, value) => {
  common.optional(isOptional, value, () =>
    common.typeCheck(name, value, 'function')
  );
};

/**
 * Asserts if the value being passed in is a date
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is not a date
 */
assert.date = (name, value) => {
  let da = dateAssert(name, value, isOptional);
  isOptional = false;
  return da;
};

/**
 * Asserts if the value being passed in is not null or undefined
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - If value is null or undefined
 */
assert.ok = (name, value) => {
  if(value === undefined || value === null) {
    common.error(value,
      `${name} to not be undefined or null`,
      `${name} should not be undefined or null`,
      'ok');
  }
};

assert.defined = (name, value) => {
  if(value === undefined) {
    common.error(value,
      `${name} to be defined`,
      `${name} should be defined`,
      'defined');
  }
};

/**
 * Asserts if the value being passed in is a number
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @param {Function} predicate - Predicate function to test value against
 * @throws {AssertionError} - If value does not match the predicate
 */
assert.custom = (name, value, predicate) => {
  common.typeCheck('predicate', predicate, 'function');

  if(!predicate(value)) {
    common.error(value,
      `${name} should satisfy the predicate function`,
      `${name} should match predicate`,
      'custom');
  }
};

export default assert;
