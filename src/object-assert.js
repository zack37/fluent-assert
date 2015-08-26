'use strict';

var util = require('util');
var common = require('./common-assert');
var AssertBase = require('./assert-base');

/**
 * Object Assertions
 * @constructor
 * @public
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - Throws error if value is not an Object
 */
function ObjectAssert(name, value) {
  common.typeCheck(name, value, 'object');

  AssertBase.call(this, name, value);
}

util.inherits(ObjectAssert, AssertBase);

/**
 * Tests value has the specified member. Properties and Functions included
 * @param {String} member
 * @returns {ObjectAssert}
 * @throws {AssertionError} - Throws error if value does not have member
 */
ObjectAssert.prototype.hasMember = function(member) {
  if(!this.value[member]) {
    common.error(this.value,
      member,
      'Expected ' + this.name + ' to have member named ' + member,
      'hasMember');
  }
  return this;
};

/**
 * Tests if value is an instance of type
 * @param {Function} type - The type function to test value against (e.g. Object)
 * @returns {ObjectAssert}
 * @throws {AssertionError} - Throws error if value is not an instance of type
 */
ObjectAssert.prototype.instanceOf = function(type) {
  if(!(this.value instanceof type)) {
    common.error(this.value,
      type,
      this.name + ' should be an instance of ' + type,
      'instanceOf');
  }
  return this;
};

module.exports = ObjectAssert;
