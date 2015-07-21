var AssertionError = require('assert').AssertionError;
var NumberAssert = require('./NumberAssert');

function number(name, value) {
  _typeCheck(name, value, 'number');
  return new NumberAssert(name, value);
}

function string(name, value) {
  _typeCheck(name, value, 'string');
  // return new StringAssert(name, value);
}

function bool(name, value) {
  _typeCheck(name, value, 'boolean');
  // return new BooleanAssert(name, value);
}

function array(name, value) {
  _arrayCheck(name, value);
  // return new ArrayAssert(name, value);
}

function _typeCheck(name, value, type) {
  if(typeof(value) !== type) {
    throw new AssertionError({
      message: name + ' should be of type ' + type,
      actual: typeof(value),
      expected: type,
      operation: type,
      stackStartFunction: type
    });
  }
}

function _arrayCheck(name, value) {
  if(!Array.isArray(value)) {
    throw new AssertionError({
      message: name + ' should be an array',
      actual: typeof(value),
      expected: 'Array',
      operation: 'array',
      stackStartFunction: 'array'
    });
  }
}

module.exports = {
  number: number,
  string: string,
  bool: bool,
  array: array
};
