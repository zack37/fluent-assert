'use strict';

var common = require('./common-assert');

function ObjectAssert(name, value) {
  common.typeCheck(name, value, 'object');

  Object.defineProperties(this, {
    name: { enumerable: true, configurable: false, writable: false, value: name },
    value: { enumerable: true, configurable: false, writable: false, value: value }
  });
}

ObjectAssert.prototype.hasMember = function(member) {
  if(!this.value[member]) {
    common.error(this.value, member, 'Expected ' + this.value + ' to have member named ' + member, 'hasMember');
  }
  return this;
};

module.exports = ObjectAssert;
