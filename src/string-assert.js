'use strict';

var util = require('util');
var common = require('./common-assert');
var AssertBase = require('./assert-base');

/**
 * String assertions
 * @constructor
 * @public
 * @param name - The name of the variable being tested
 * @param value - The value being tested
 * @throws {AssertionError} - Throws error if value is not a string
 */
function StringAssert(name, value) {
  common.typeCheck(name, value, 'string');

  AssertBase.call(this, name, value);
}

util.inherits(StringAssert, AssertBase);

/**
 * Tests value against a regular expression
 * @param regexp - Regular expression pattern to match value against
 * @returns {StringAssert}
 * @throws {AssertionError} - Throws error if value does not match supplied
 * regular expression
 */
StringAssert.prototype.matches = function(regexp) {
  if(!(regexp instanceof RegExp)) {
    common.error(this.value,
      regexp.toString(),
      'parameter regexp should be of type RegExp',
      regexp.toString(), 'matches');
  }
  if(!regexp.test(this.value)) {
    common.error(this.value,
      regexp.toString(),
      this.name + ' should match pattern ' + regexp.toString(),
      'matches');
  }
  return this;
};

/**
 * Tests if value is an empty string
 * @returns {StringAssert}
 * @throws {AssertionError} - Throws error if value is an empty string
 */
StringAssert.prototype.notEmpty = function() {
  if(this.value === '') {
    common.error(this.value,
      'non empty string',
      this.name + ' should be a non empty string',
      'notEmpty');
  }
  return this;
};

/**
 * Tests is value contains only whitespace characters
 * @returns {StringAssert}
 * @throws {AssertionError} - Throws error if value contains nothing but white
 * space characters or is empty
 */
StringAssert.prototype.notWhiteSpace = function() {
  if(/^\s*$/.test(this.value)) {
    common.error(this.value,
      'non white space only string',
      this.name + ' should be a non white space only string',
      'notWhiteSpace');
  }
  return this;
};

module.exports = StringAssert;
