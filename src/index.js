'use strict';

var common = require('./common-assert');
var NumberAssert = require('./number-assert');
var StringAssert = require('./string-assert');
var ObjectAssert = require('./object-assert');

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
  common.arrayCheck(name, value);
  // return new ArrayAssert(name, value);
}

function ok(name, value) {
  if(value === undefined || value === null) {
    common.error(value, 'value not undefined or null', value + 'should not be undefined or null', 'ok');
  }
  return this;
}

function custom(name, value, predicate) {
  common.typeCheck(name, predicate, 'function');

  var body = predicate.toString().match(/^function\s*\(.*\)\s*\{\s*(.*)\s*\};?$/)[1];
  if(!predicate(value)) {
    common.error(value, body, 'value must match predicate ' + body, 'custom');
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
