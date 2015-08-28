import common from './common-assert'

import NumberAssert from './number-assert'
import StringAssert from './string-assert'
import ObjectAssert from './object-assert'
import ArrayAssert from './array-assert'
import DateAssert from './date-assert'

let _isOptional = false;

class Assert {
  constructor() {
    Object.defineProperties(this, {
      isOptional: {
        enumerable: true,
        configurable: false,
        get: function() {
          let retVal = _isOptional;
          _isOptional = false;
          return retVal;
        },
        set: function(value) {
          _isOptional = value
        }
      }
    });
  }

  /**
   * Sets the optional flag allowing for null or undefined values
   * Flag only stays set for one assertion chain
   * @returns {Assert}
   */
  optional() {
    this.isOptional = true;
    return this;
  }

  /**
   * Asserts if the value being passed in is a number
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @returns {NumberAssert|exports|module.exports}
   * @throws {AssertionError} - If value is not a number
   */
  number(name, value) {
    return common.optional(this.isOptional, value, () =>
      new NumberAssert(name, value)
    );
  };

  /**
   * Asserts if the value being passed in is a string
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @returns {StringAssert|exports|module.exports}
   * @throws {AssertionError} - If value is not a string
   */
  string(name, value) {
    return common.optional(this.isOptional, value, () =>
      new StringAssert(name, value)
    );
  };

  /**
   * Asserts if the value being passed in is a boolean
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @throws {AssertionError} - If value is not a boolean
   */
  bool(name, value) {
    common.optional(this.isOptional, value, () =>
      common.typeCheck(name, value, 'boolean')
    );
  };

  /**
   * Asserts if the value being passed in is a Buffer
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @throws {AssertionError} - If value is not a Buffer
   */
  buffer(name, value) {
    common.optional(this.isOptional, value, () => {
      if(!Buffer.isBuffer(value)) {
        common.error(value, 'Buffer', `${name} should be a buffer`, 'buffer');
      }
    });
  };

  /**
   * Asserts if the value being passed in is an object
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @returns {ObjectAssert|exports|module.exports}
   * @throws {AssertionError} - If value is not an object
   */
  object(name, value) {
    return common.optional(this.isOptional, value, () =>
      new ObjectAssert(name, value)
    );
  };

  /**
   * Asserts if the value being passed in is an array
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @returns {ArrayAssert|exports|module.exports}
   * @throws {AssertionError} - If value is not an array
   */
  array(name, value) {
    return common.optional(this.isOptional, value, () =>
      new ArrayAssert(name, value)
    );
  };

  /**
   * Asserts if the value being passed in is a function
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @throws {AssertionError} - If value is not a function
   */
  func(name, value) {
    common.optional(this.isOptional, value, () =>
      common.typeCheck(name, value, 'function')
    );
  };

  /**
   * Asserts if the value being passed in is a date
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @throws {AssertionError} - If value is not a date
   */
  date(name, value) {
    return common.optional(this.isOptional, value, () =>
      new DateAssert(name ,value)
    );
  };

  /**
   * Asserts if the value being passed in is not null or undefined
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @throws {AssertionError} - If value is null or undefined
   */
  ok(name, value) {
    if(value === undefined || value === null) {
      common.error(value,
        `${name} + ' to not be undefined or null`,
        `${value} + 'should not be undefined or null`,
        'ok');
    }
  };

  /**
   * Asserts if the value being passed in is a number
   * @param {String} name - The name of the value being tested
   * @param {Object} value - The value being tested
   * @param {Function} predicate - Predicate function to test value against
   * @throws {AssertionError} - If value does not match the predicate
   */
  custom(name, value, predicate) {
    common.typeCheck('predicate', predicate, 'function');

    if(!predicate(value)) {
      common.error(value,
        `${name} should satisfy the predicate function`,
        'value must match predicate',
        'custom');
    }
  };
}

export default new Assert()
