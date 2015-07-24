var AssertionError = require('assert').AssertionError;
var common = require('./common-assert');

function StringAssert(name, value) {
  common.typeCheck(name, value, 'string');

  Object.defineProperties(this, {
    name: {enumerable: true, configurable: false, writable: false, value: name},
    value: {enumerable: true, configurable: false, writable: false, value: value}
  });
}

StringAssert.prototype.matches = function(regexp) {
  if(!(regexp instanceof RegExp)) {
    common.error(this.value, regexp.toString(), 'parameters regexp should be of type RegExp', regexp.toString(), 'matches')
  }
  if(!regexp.test(this.value)) {
    common.error(this.value, regexp.toString(), this.value + ' should match pattern ', regexp.toString(), 'matches')
  }
  return this;
};

module.exports = StringAssert;
