import common from './common-assert'


/**
 * Number Assertions
 * @constructor
 * @public
 * @param name - The name of the variable being tested
 * @param value - The value being tested
 * @param optional
 * @throws {AssertionError} - Throws error if value is not a number
 */
export default (name, value, optional) => {
  common.optional(optional, value, () => common.typeCheck(name, value, 'number'));
  let assert = {};
  let emptyFunction = () => assert;

  /**
   * Tests value against a minimum threshold
   * @param {Number} min - The minimum threshold to test against
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is less than min
   */
  assert.min = common.optional(optional, value, () => min => {
    if(value < min) {
      common.error(value,
        min,
        `${name} should be greater than ${min}`,
        'min');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests value against a maximum threshold
   * @param {Number} max - The maximum threshold to test against
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value if greater than max
   */
  assert.max = common.optional(optional, value, () => max => {
    if(value > max) {
      common.error(value,
        max,
        `${name} should be less than ${max}`,
        'max');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests value against a minimum and maximum threshold
   * @param {Number} lower - Lower threshold to test against
   * @param {Number} upper - Upper threshold to test against
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is less than lower or greater than upper
   */
  assert.range = common.optional(optional, value, () => (lower, upper) => {
    if(value < lower || value > upper) {
      common.error(value,
        `(${lower}-${upper})`,
        `${name} should be between ${lower} and ${upper}`,
        'range');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value is an even number
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not even
   */
  assert.even = common.optional(optional, value, () => () => {
    if(value % 2 === 1) {
      common.error(value,
        'even number',
        `${name} should be even`,
        'even');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value is an odd number
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not odd
   */
  assert.odd = common.optional(optional, value, () => () => {
    if(value % 2 === 0) {
      common.error(value,
        'odd number',
        `${name} should be odd`,
        'odd');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests value against another number for equality
   * @param {Number} compare - The number to test for equality
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not equal to compare
   */
  assert.equal = common.optional(optional, value, () => compare => {
    if(value !== compare) {
      common.error(value,
        compare,
        `${name} should be equal to ${compare}`,
        'equal');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value is ina  subset of numbers
   * @param {Array.<Number>} values - Subset of numbers to confine value
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not contained in values
   */
  assert.in = common.optional(optional, value, () => values => {
    common.arrayCheck('values', values);
    if(values.indexOf(value) < 0) {
      common.error(value,
        `value in ${values.toString()}`,
        `${name} should be in ${values.toString()}`,
        'in');
    }
    return assert;
  }, emptyFunction);

  return assert;
};
