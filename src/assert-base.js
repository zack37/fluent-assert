'use strict';

/**
 * Assertion base used to simplify assert class creation
 * @constructor
 * @public
 * @abstract
 * @param {String} name - The name of the value being tested
 * @param {Object} value - The value being tested
 */
function AssertBase(name, value) {
  Object.defineProperties(this, {
    name: { enumerable: true, configurable: false, writable: false, value: name },
    value: { enumerable: true, configurable: false, writable: false, value: value }
  });
}

module.exports = AssertBase;
