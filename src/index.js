'use strict';

var common = require('./common-assert');
var NumberAssert = require('./number-assert');
var StringAssert = require('./string-assert');
var ObjectAssert = require('./object-assert');
var ArrayAssert = require('./array-assert');

function number(name, value) {
  return new NumberAssert(name, value);
}

function string(name, value) {
  return new StringAssert(name, value);
}

function bool(name, value) {
  common.typeCheck(name, value, 'boolean');
}

function object (name, value) {
  return new ObjectAssert(name, value);
}

function array(name, value) {
  return new ArrayAssert(name, value);
}

function ok(name, value) {
  if(value === undefined || value === null) {
    common.error(value, name + ' to not be undefined or null', value + 'should not be undefined or null', 'ok');
  }
  return this;
}

function custom(name, value, predicate) {
  common.typeCheck(name, predicate, 'function');

  if(!predicate(value)) {
    common.error(value, name + ' should satisfy the predicate function', 'value must match predicate', 'custom');
  }
  return this;
}

module.exports = {
  number: number,
  string: string,
  bool: bool,
  object: object,
  array: array,
  ok: ok,
  custom: custom
};
