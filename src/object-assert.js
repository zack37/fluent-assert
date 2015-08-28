import common from './common-assert'
import AssertBase from './assert-base'

/**
 * Object Assertions
 * @constructor
 * @public
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @throws {AssertionError} - Throws error if value is not an Object
 */
export default class ObjectAssert extends AssertBase {
  constructor(name, value) {
    super(name, value);
    common.typeCheck(name, value, 'object');
  }

  /**
   * Tests value has the specified member. Properties and Functions included
   * @param {String} member
   * @returns {ObjectAssert}
   * @throws {AssertionError} - Throws error if value does not have member
   */
  hasMember(member) {
    if(!this.value[member]) {
      common.error(this.value,
        member,
        `Expected ${this.name} to have member named ${member}`,
        'hasMember');
    }
    return this;
  }

  /**
   * Tests if value is an instance of type
   * @param {Function} type - The type function to test value against (e.g. Object)
   * @returns {ObjectAssert}
   * @throws {AssertionError} - Throws error if value is not an instance of type
   */
  instanceOf(type) {
    if(!(this.value instanceof type)) {
      common.error(this.value,
        type,
        `${this.name} should be an instance of ${type}`,
        'instanceOf');
    }
    return this;
  }
}
