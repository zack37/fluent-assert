import common from './common-assert'
import AssertBase from './assert-base'

/**
 * Array assertions
 * @constructor
 * @public
 * @param name - The name of the variable being tested
 * @param value - The value of the variable being tested
 * @throws {AssertionError} - Throws error if value is not an array
 */
export default class ArrayAssert extends AssertBase {
  constructor(name, value) {
    common.arrayCheck(name, value);
    super(name, value);
  }

  /**
   * Tests if value is an array containing values of the same specified type
   * @param {String|Function} type - The type to check all values in the array
   * against. Can be a string for `typeof` check or function for class comparison
   * @returns {ArrayAssert}
   * @throws {AssertionError} - Throws error if all elements in value are not of type
   */
  of(type) {
    let inner = common.isType(type, 'string')
      ? x => common.isType(x, type)
      : x => x.constructor === type;

    let isAllOfType = this.value.every(inner);

    if(!isAllOfType) {
      common.error(this.value,
        `${this.name} to be an array of all ${type}`,
        `${this.name} should be all of type ${type}`,
        'of');
    }

    return this;
  };

  /**
   * Tests if the array contains some element
   * @param {Object} value - Singular element to check if any of values elements
   * equal value using === comparison
   * @returns {ArrayAssert}
   * @throws {AssertionError} - Throws error if value does not contain supplied value
   */
  contains(value) {
    let containsValue = this.value.some(x => x  === value);

    if(!containsValue) {
      common.error(this.value,
        value,
        `${this.name} should contain ${value}`,
        'contains');
    }

    return this;
  };
}
