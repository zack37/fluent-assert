import common from './common-assert'
import AssertBase from './assert-base.js'

/**
 * Number Assertions
 * @constructor
 * @public
 * @param name - The name of the variable being tested
 * @param value - The value being tested
 * @throws {AssertionError} - Throws error if value is not a number
 */
export default class NumberAssert extends AssertBase {
  constructor(name, value) {
    common.typeCheck(name, value, 'number');
    super(name, value);
  }

  /**
   * Tests value against a minimum threshold
   * @param {Number} min - The minimum threshold to test against
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is less than min
   */
  min(min) {
    if(this.value < min) {
      common.error(this.value,
        min,
        `${this.name} should be greater than ${min}`,
        'min');
    }
    return this;
  }

  /**
   * Tests value against a maximum threshold
   * @param {Number} max - The maximum threshold to test against
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value if greater than max
   */
  max(max) {
    if(this.value > max) {
      common.error(this.value,
        max,
        `${this.name} should be less than ${max}`,
        'max');
    }
    return this;
  }

  /**
   * Tests value against a minimum and maximum threshold
   * @param {Number} lower - Lower threshold to test against
   * @param {Number} upper - Upper threshold to test against
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is less than lower or greater than upper
   */
  range(lower, upper) {
    if(this.value < lower || this.value > upper) {
      common.error(this.value,
        `(${lower}-${upper})`,
        `${this.name} should be between ${lower} and ${upper}`,
        'range');
    }
    return this;
  }

  /**
   * Tests if value is an even number
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not even
   */
  even() {
    if(this.value % 2 === 1) {
      common.error(this.value,
        'even number',
        `${this.name} should be even`,
        'even');
    }
    return this;
  }

  /**
   * Tests if value is an odd number
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not odd
   */
  odd() {
    if(this.value % 2 === 0) {
      common.error(this.value,
        'odd number',
        `${this.name} should be odd`,
        'odd');
    }
    return this;
  }

  /**
   * Tests value against another number for equality
   * @param {Number} compare - The number to test for equality
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not equal to compare
   */
  equal(compare) {
    if(this.value !== compare) {
      common.error(this.value,
        compare,
        `${this.name} should be equal to ${compare}`,
        'equal');
    }
    return this;
  }

  /**
   * Tests if value is ina  subset of numbers
   * @param {Array.<Number>} values - Subset of numbers to confine value
   * @returns {NumberAssert}
   * @throws {AssertionError} - Throws error if value is not contained in values
   */
  in(values) {
    common.arrayCheck('values', values);
    if(values.indexOf(this.value) < 0) {
      common.throw(this.value,
        `value in ${values.toString()}`,
        `${this.value} should be in ${values.toString()}`,
        'in');
    }
    return this;
  }
}
