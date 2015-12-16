import common from './common-assert'

/**
 * String assertions
 * @constructor
 * @public
 * @param name - The name of the variable being tested
 * @param value - The value being tested
 * @param optional
 * @throws {AssertionError} - Throws error if value is not a string
 */
export default (name, value, optional) => {
  common.optional(optional, value, () => common.typeCheck(name, value, 'string'));
  let assert = {};
  let emptyFunction = () => assert;

  /**
   * Tests value against a regular expression
   * @param regexp - Regular expression pattern to match value against
   * @returns {StringAssert}
   * @throws {AssertionError} - Throws error if value does not match supplied
   * regular expression
   */
  assert.matches = common.optional(optional, value, () => regexp => {
    if (!(regexp instanceof RegExp)) {
      common.error(value,
        regexp.toString(),
        'parameter regexp should be of type RegExp',
        regexp.toString(), 'matches');
    }
    if (!regexp.test(value)) {
      common.error(value,
        regexp.toString(),
        `${name} should match pattern ${regexp.toString()}`,
        'matches');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value is an empty string
   * @returns {StringAssert}
   * @throws {AssertionError} - Throws error if value is an empty string
   */
  assert.notEmpty = common.optional(optional, value, () => () => {
    if (value === '') {
      common.error(value,
        'non empty string',
        `${name} should not be empty`,
        'notEmpty');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests is value contains only whitespace characters
   * @returns {StringAssert}
   * @throws {AssertionError} - Throws error if value contains nothing but white
   * space characters or is empty
   */
  assert.notWhiteSpace = common.optional(optional, value, () => () => {
    if (/^\s*$/.test(value)) {
      common.error(value,
        'non white space only string',
        `${name} should not be whitespace`,
        'notWhiteSpace');
    }
    return assert;
  }, emptyFunction);

  return assert;
};
