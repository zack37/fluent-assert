var AssertionError = require('assert').AssertionError;

function StringAssert(name, value) {
  Object.defineProperties(this, {
    name: {enumerable: true, configurable: false, writable: false, value: name},
    value: {enumerable: true, configurable: false, writable: false, value: value}
  });
}

StringAssert.prototype.matches = function(regexp) {
  if(!(regexp instanceof RegExp)) {
    _throw(this.value, regexp.toString(), 'parameters regexp should be of type RegExp', regexp.toString(), 'matches')
  }
  if(!regexp.test(this.value)) {
    _throw(this.value, regexp.toString(), this.value + ' should match pattern ', regexp.toString(), 'matches')
  }
  return this;
};

function _throw(value, expected, message, func) {
  throw new AssertionError({
    message: message,
    actual: value,
    expected: expected,
    operation: func,
    stackStartFunction: func
  });
};

module.exports = StringAssert;
