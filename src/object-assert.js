import common from './common-assert'

/**
 * Object Assertions
 * @constructor
 * @public
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 * @param optional
 * @throws {AssertionError} - Throws error if value is not an Object
 */
export default (name, value, optional) => {
  common.optional(optional, value, () => common.typeCheck(name, value, 'object'));
  let assert = {};
  let emptyFunction = () => assert;

  /**
   * Tests value has the specified member. Properties and Functions included
   * @param {String} member
   * @returns {ObjectAssert}
   * @throws {AssertionError} - Throws error if value does not have member
   */
  assert.hasMember = common.optional(optional, value, () => member => {
    if(!value[member]) {
      common.error(value,
        member,
        `${name} should have member named ${member}`,
        'hasMember');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value is an instance of type
   * @param {Function} type - The type function to test value against (e.g. Object)
   * @returns {ObjectAssert}
   * @throws {AssertionError} - Throws error if value is not an instance of type
   */
  assert.instanceOf = common.optional(optional, value, () => type => {
    if(!(value instanceof type)) {
      common.error(value,
        type,
        `${name} should be an instance of ${type}`,
        'instanceOf');
    }
    return assert;
  }, emptyFunction);

  return assert;
};

