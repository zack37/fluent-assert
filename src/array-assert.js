'use strict';

var common = require('./common-assert');

/**
 * Array assertions
 * @constructor
 * @param name - The name of the variable being tested
 * @param value - The value of the variable being tested
 */
function ArrayAssert(name, value) {
  common.arrayCheck(name, value);

  Object.defineProperties(this, {
    name: { enumerable: true, configurable: false, writable: false, value: name },
    value: { enumerable: true, configurable: false, writable: false, value: value }
  });
}

/**
 * Tests if value is an array containing values of the same specified type
 * @param type - The type to check all values in the array against
 * @returns {ArrayAssert}
 */
ArrayAssert.prototype.of = function(type) {
  var isAllOfType = this.value.every(function(x) {
    return (typeof x) === type;
  });

  if(!isAllOfType) {
    common.error(this.value, this.name + ' to be an array of all ' + type, 'Array elements should be all of type ' + type, 'of');
  }

  return this;
};

/**
 * Tests if the array contains some element
 * @param value
 */
ArrayAssert.prototype.contains = function(value) {
  var containsValue = this.value.some(function(x) {
    return x === value;
  });

  if(!containsValue) {
    common.error(this.value, value, this.name + ' should contain ' + value, 'contains');
  }
};

module.exports = ArrayAssert;
