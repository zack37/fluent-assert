'use strict';

var common = require('./common-assert');

function NumberAssert(name, value) {
  common.typeCheck(name, value, 'number');

  Object.defineProperties(this, {
    name: { enumerable: true, configurable: false, writable: false, value: name },
    value: { enumerable: true, configurable: false, writable: false, value: value }
  });
}

NumberAssert.prototype.min = function(min) {
  if(this.value < min) {
    common.error(this.value,
      'number greater than ' + min,
      this.name + ' should be greater than ' + min,
      'min');
  }
  return this;
};

NumberAssert.prototype.max = function(max) {
  if(this.value > max) {
    common.error(this.value,
      'number less than ' + max,
      this.name + ' should be less than ' + max,
      'max');
  }
  return this;
};

NumberAssert.prototype.range = function(lower, upper) {
  if(this.value < lower || this.value > upper) {
    common.error(this.value,
      'number between ' + lower + ' and ' + upper,
      this.name + ' should be between ' + lower + ' and ' + upper,
      'range');
  }
  return this;
};

NumberAssert.prototype.even = function() {
  if(this.value % 2 === 1) {
    common.error(this.value,
      'even number',
      this.name + ' should be even',
      'even');
  }
  return this;
};

NumberAssert.prototype.odd = function() {
  if(this.value % 2 === 0) {
    common.error(this.value,
      'odd number',
      this.name + ' should be odd',
      'odd');
  }
  return this;
};

NumberAssert.prototype.equal = function(compare) {
  if(this.value !== compare) {
    common.error(this.value,
      compare,
      this.name + ' should be equal to ' + compare,
      'equal');
  }
  return this;
};

NumberAssert.prototype.in = function(values) {
  common.arrayCheck('values', values);
  if(values.indexOf(this.value) < 0) {
    common.throw(this.value,
      'value in ' + values.toString(),
      this.value + ' should be in ' + values.toString(),
      'in');
  }
  return this;
};

module.exports = NumberAssert;
