import common from './common-assert'

export default (name, value, optional) => {
  common.optional(optional, value, () => common.arrayCheck(name, value));

  const assert = {};
  const emptyFunction = () => assert;

  assert.of = common.optional(optional, value, () => type => {
    let inner = common.isType(type, 'string')
      ? x => common.isType(x, type)
      : x => x.constructor === type;

    let isAllOfType = value.every(inner);

    if(!isAllOfType) {
      common.error(value,
        `${name} to be an array of all ${type}`,
        `${name} should be all of type ${type}`,
        'of');
    }

    return assert;
  }, emptyFunction);

  assert.contains = common.optional(optional, value, () => element => {
    let containsElement = value.some(x => x  === element);

    if(!containsElement) {
      common.error(value,
        element,
        `${name} should contain ${element}`,
        'contains');
    }

    return assert;
  }, emptyFunction);

  return assert;
};
