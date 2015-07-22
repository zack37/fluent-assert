var AssertionError = require('assert').AssertionError;

function typeCheck(name, value, type) {
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

function arrayCheck(name, value) {
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

function error(actual, expected, message, func) {
  throw new AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operation: func,
    stackStartFunction: func
  });
}

module.exports = {
  typeCheck: typeCheck,
  arrayCheck: arrayCheck,
  error: error
};
