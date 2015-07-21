var AssertionError = require('assert').AssertionError;

function NumberAssert(name, value) {
  Object.defineProperties(this, {
    name: {enumerable: true, configurable: false, writable: false, value: name},
    value: {enumerable: true, configurable: false, writable: false, value: value}
  });
}

NumberAssert.prototype.min = function(min) {
  if(this.value < min) {
    throw new AssertionError({
      message: this.name + ' should be greater than ' + min,
      actual: this.value,
      expected: 'number greater than ' + min,
      operation: 'min',
      stackStartFunction: 'min'
    });
  }
  return this;
};

NumberAssert.prototype.max = function(max) {
  if(this.value > max) {
    throw new AssertionError({
      message: this.name + ' should be less than ' + max,
      actual: this.value,
      expected: 'number less than ' + max,
      operation: 'max',
      stackStartFunction: 'max'
    });
  }
  return this;
};

NumberAssert.prototype.range = function(lower, upper) {
  if(this.value < lower || this.value > upper) {
    throw new AssertionError({
      message: this.name + ' should be between ' + lower + ' and ' + upper,
      actual: this.value,
      expected: 'number between ' + lower + ' and ' + upper,
      operation: 'range',
      stackStartFunction: 'range'
    });
  }
  return this;
};

NumberAssert.prototype.even = function () {
  if(this.value % 2 === 1) {
    throw new AssertionError({
      message: this.name + ' should be even',
      actual: this.value,
      expected: 'even number',
      operation: 'even',
      stackStartFunction: 'even'
    });
  }
  return this;
};

NumberAssert.prototype.odd = function () {
  if(this.value % 2 === 0) {
    throw new AssertionError({
      message: this.name + ' should be odd',
      actual: this.value,
      expected: 'odd number',
      operation: 'odd',
      stackStartFunction: 'odd'
    });
  }
  return this;
};

NumberAssert.prototype.equal = function(compare) {
  if(this.value !== compare) {
    throw new AssertionError({
      message: this.name + ' should be equal to ' + compare,
      actual: this.value,
      expected: compare,
      operation: 'eqaul',
      stackStartFunction: 'equal'
    });
  }
  return this;
}

module.exports = NumberAssert;
