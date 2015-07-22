var AssertionError = require('assert').AssertionError;
var common = require('./common-assert');
var NumberAssert = require('./number-assert');
var StringAssert = require('./string-assert');

function number(name, value) {
  common.typeCheck(name, value, 'number');
  return new NumberAssert(name, value);
}

function string(name, value) {
  common.typeCheck(name, value, 'string');
  return new StringAssert(name, value);
}

function bool(name, value) {
  common.typeCheck(name, value, 'boolean');
}

function array(name, value) {
  common.arrayCheck(name, value);
  // return new ArrayAssert(name, value);
}

module.exports = {
  number: number,
  string: string,
  bool: bool,
  array: array
};
