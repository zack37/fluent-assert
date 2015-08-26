'use strict';

var util = require('util');
var common = require('./common-assert');
var AssertBase = require('./assert-base');

/**
 * Array assertions
 * @constructor
 * @public
 * @param name - The name of the variable being tested
 * @param value - The value of the variable being tested
 * @throws {AssertionError} - Throws error if value is not an array
 */
function ArrayAssert(name, value) {
  common.arrayCheck(name, value);

  AssertBase.call(this, name, value);
}

util.inherits(ArrayAssert, AssertBase);

/**
 * Tests if value is an array containing values of the same specified type
 * @param {String|Function} type - The type to check all values in the array
 * against. Can be a string for `typeof` check or function for class comparison
 * @returns {ArrayAssert}
 * @throws {AssertionError} - Throws error if all elements in value are not of type
 */
ArrayAssert.prototype.of = function(type) {
  var inner = (typeof type === 'string')
    ? (function(x) { return typeof x === type })
    : (function(x) { return (x).constructor === type });

  var isAllOfType = this.value.every(inner);

  if(!isAllOfType) {
    common.error(this.value,
      this.name + ' to be an array of all ' + type,
      this.name + ' should be all of type ' + type,
      'of');
  }

  return this;
};

/**
 * Tests if the array contains some element
 * @param {Object} value - Singular element to check if any of values elements
 * equal value using === comparison
 * @returns {ArrayAssert}
 * @throws {AssertionError} - Throws error if value does not contain supplied value
 */
ArrayAssert.prototype.contains = function(value) {
  var containsValue = this.value.some(function(x) {
    return x === value;
  });

  if(!containsValue) {
    common.error(this.value,
      value,
      this.name + ' should contain ' + value,
      'contains');
  }

  return this;
};

module.exports = ArrayAssert;
