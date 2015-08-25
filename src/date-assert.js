'use strict';

var common = require('./common-assert');

var shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

/**
 * Date Assertions
 * @constructor
 * @param {String} name - The name of the variable being tested
 * @param {Object} value - The value being tested
 */
function DateAssert(name, value) {
  common.toStringCheck(name, value, 'Date');

  Object.defineProperties(this, {
    name: { enumerable: true, configurable: false, writable: false, value: name },
    value: { enumerable: true, configurable: false, writable: false, value: value }
  });
}

/**
 * Tests if value occurs before the supplied date
 * @param {Date} date
 * @returns {DateAssert}
 */
DateAssert.prototype.before = function(date) {
  if(this.value < date) {
    common.error(this.value, 'Date before ' + this.value, this.name + ' should occur before ' + date, 'before');
  }
  return this;
};

/**
 * Tests if value occurs after the supplied date
 * @param {Date} date
 * @returns {DateAssert}
 */
DateAssert.prototype.after = function(date) {
  if(this.value > date) {
    common.error(this.value, 'Date after ' + this.value, this.name + ' should occur after ' + date, 'after');
  }
  return this;
};

/**
 * Tests if value occurs between lower and upper
 * @param {Date} lower
 * @param {Date} upper
 * @returns {DateAssert}
 */
DateAssert.prototype.within = function(lower, upper) {
  if(this.value < lower || this.value > upper) {
    common.error(this.value, 'Date within ' + lower + ' and ' + upper, this.name + ' should be within ' + lower + ' and ' + upper, 'within');
  }
  return this;
};

/**
 * Tests if values day is the same as the day supplied
 * @param {Object|String|Number} day - day is first parsed to an int using parseInt and then compared
 * @returns {DateAssert}
 */
DateAssert.prototype.dayOf = function(day) {
  if(this.value.getDate() !== parseInt(day)) {
    common.error(this.value, day, this.name + ' should occur on day ' + day, 'dayOf');
  }
  return this;
};


/**
 * Tests if values month is the same as the month supplied
 * @param {Object|String|Number} month - month is first parsed and matched as a string against 3 or full length month name, else it's parsed to an int using parseInt and then compared
 * @returns {DateAssert}
 */
DateAssert.prototype.monthOf = function(month) {
  if(typeof month === 'string') {
    if(month.length === 3) {
      var short = shortMonthNames[this.value.getMonth()];
      if(short !== month) {
        common.error(this.value, month, this.name + ' should occur on month ' + month, 'monthOf');
      }
    }
    if (month.length > 3) {
      var long = fullMonthNames[this.value.getMonth()];
      if(long !== month) {
        common.error(this.value, month, this.name + ' should occur on month ' + month, 'monthOf');
      }
    }
  }
  else if(this.value.getMonth() !== parseInt(month)) {
    common.error(this.value, month, this.name + ' should occur on month ' + month, 'monthOf');
  }
  return this;
};


/**
 * Tests if values year is the same as the year supplied
 * @param {Object|String|Number} year - year is first parsed to an int using parseInt and then compared
 * @returns {DateAssert}
 */
DateAssert.prototype.yearOf = function(year) {
  if(this.value.getFullYear() !== parseInt(year)) {
    common.error(this.value, year, this.name + ' should occur on year ' + year, 'yearOf');
  }
  return this;
};

module.exports = DateAssert;