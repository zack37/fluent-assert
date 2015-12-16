import common from './common-assert'

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const fullMonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
 * Date Assertions
 * @constructor
 * @public
 * @param {String} name - The name of the variable being tested
 * @param {Date} value - The value being tested
 * @param optional
 * @throws {AssertionError} - Throws error if value is not a Date
 */
export default (name, value, optional) => {
  common.optional(optional, value, () => common.toStringCheck(name, value, 'Date'));
  let assert = {};
  let emptyFunction = () => assert;

  /**
   * Tests if value occurs before the supplied date
   * @param {Date} date - Date to test value against
   * @returns {DateAssert}
   * @throws {AssertionError} - Throws error if value occurs after date
   */
  assert.before = common.optional(optional, value, () => date => {
    if (value < date) {
      common.error(value,
        `Date before ${value}`,
        `${name} should occur before ${date}`,
        'before');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value occurs after the supplied date
   * @param {Date} date - Date to test value against
   * @returns {DateAssert}
   * @throws {AssertionError} Throws error if value occurs before date
   */
  assert.after = common.optional(optional, value, () => date => {
    if (value > date) {
      common.error(value,
        `Date after ${value}`,
        `${name} should occur after ${date}`,
        'after');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if value occurs between lower and upper
   * @param {Date} lower - Lower bound of date range
   * @param {Date} upper - Upper bound of date range
   * @returns {DateAssert}
   * @throws {AssertionError} - Throws error if value is outside of lower - upper range
   */
  assert.within = common.optional(name, value, () => (lower, upper) => {
    if (value < lower || value > upper) {
      common.error(value,
        `Date within ${lower} and ${upper}`,
        `${name} should be within ${lower} and ${upper}`,
        'within');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if values day is the same as the day supplied
   * @param {Object|String|Number} day - day is parsed as an int and then compared to value
   * @returns {DateAssert}
   * @throws {AssertionError} - Throws error if values day does not equal day
   */
  assert.dayOf = common.optional(name, value, () => day => {
    if (value.getDate() !== parseInt(day)) {
      common.error(value,
        day,
        `${name} should occur on day ${day}`,
        'dayOf');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if values month is the same as the month supplied
   * @param {Object|String|Number} month - month is first parsed and matched as a
   * string against 3 or full length month name, else it's parsed to an int using
   * parseInt and then compared
   * @returns {DateAssert}
   * @throws {AssertionError} - Throws error if values month does not equal month
   */
  assert.monthOf = common.optional(optional, value, () => month => {
    if (common.isType(month, 'string')) {
      if (month.length === 3) {
        let short = shortMonthNames[ value.getMonth() ];
        if (short !== month) {
          common.error(value,
            month,
            `${name} should occur on month ${month}`,
            'monthOf');
        }
      }
      if (month.length > 3) {
        let long = fullMonthNames[ value.getMonth() ];
        if (long !== month) {
          common.error(value,
            month,
            `${name} should occur on month ${month}`,
            'monthOf');
        }
      }
    }
    else if (value.getMonth() !== parseInt(month)) {
      common.error(value,
        month,
        `${name} should occur on month ${month}`,
        'monthOf');
    }
    return assert;
  }, emptyFunction);

  /**
   * Tests if values year is the same as the year supplied
   * @param {Object|String|Number} year - year is first parsed to an int using parseInt and then compared
   * @returns {DateAssert}
   * @throws {AssertionError} - Throws error if values year does not equal year
   */
  assert.yearOf = common.optional(optional, value, () => year => {
    if (value.getFullYear() !== parseInt(year)) {
      common.error(value,
        year,
        `${name} should occur on year ${year}`,
        'yearOf');
    }
    return assert;
  }, emptyFunction);

  return assert;
};
