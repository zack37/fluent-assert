'use strict';

var expect = require('chai').expect;
var NumberAssert = require('../src/number-assert');

describe('numberassert', function() {
  describe('#min', function() {
    it('should throw an error when validating a number smaller than "min"', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.min(100);
      }).to.throw(/greater/);
    });

    it('should not throw an error when validating a number larger than "min"', function() {
      var na = new NumberAssert('test', 100);
      expect(function() {
        na.min(0);
      }).to.not.throw(/greater/);
    });

    it('should not throw an error for value same as "min"', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.min(0);
      }).to.not.throw(/greater/);
    });

  });

  describe('#max', function() {
    it('should throw an error when validating a number larger than "max"', function() {
      var na = new NumberAssert('test', 100);
      expect(function() {
        na.max(0);
      }).to.throw(/less/);
    });

    it('should not throw an error when validating a number smaller than "max"', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.max(100);
      }).to.not.throw(/less/);
    });

    it('should not throw an error for value same as "max"', function() {
      var na = new NumberAssert('test', 100);
      expect(function() {
        na.max(100);
      }).to.not.throw(/less/);
    });
  });

  describe('#range', function() {

    it('should throw an error when lower bound rule is violated', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.range(1, 10);
      }).to.throw(/between/);
    });

    it('should throw an error when upper bound rule is violated', function() {
      var na = new NumberAssert('test', 100);
      expect(function() {
        na.range(1, 10);
      }).to.throw(/between/);
    });

    it('should not throw an error when value is the same as the lower bound', function() {
      var na = new NumberAssert('test', 10);
      expect(function() {
        na.range(10, 100);
      }).to.not.throw(/between/);
    });

    it('should not throw an error when value is the same as the upper bound rule', function() {
      var na = new NumberAssert('test', 10);
      expect(function() {
        na.range(1, 10);
      }).to.not.throw(/between/);
    });

    it('should not throw an error when value passed to NumberAssert lies within lower and upper bound', function() {
      var na = new NumberAssert('test', 5);
      expect(function() {
        na.range(1, 10);
      }).to.not.throw(/between/);
    });

  });

  describe('#even', function() {
    it('should throw an error for odd numbers', function() {
      var na = new NumberAssert('test', 5);
      expect(function() {
        na.even();
      }).to.throw(/even/);
    });

    it('should not throw an error for even numbers', function() {
      var na = new NumberAssert('test', 6);
      expect(function() {
        na.even();
      }).to.not.throw(/even/);
    });
  });

  describe('#odd', function() {
    it('should throw an error for even numbers', function() {
      var na = new NumberAssert('test', 6);
      expect(function() {
        na.odd();
      }).to.throw(/odd/);
    });

    it('should not throw an error for odd numbers', function() {
      var na = new NumberAssert('test', 5);
      expect(function() {
        na.odd();
      }).to.not.throw(/odd/);
    });
  });

  describe('#equal', function() {
    it('should throw an error when value is greater than compare', function() {
      var na = new NumberAssert('test', 10);
      expect(function() {
        na.equal(0);
      }).to.throw(/equal/);
    });

    it('should throw an error when value is less than compare', function() {
      var na = new NumberAssert('test', 10);
      expect(function() {
        na.equal(100);
      }).to.throw(/equal/);
    });

    it('should not throw an error when value is equal to compare', function() {
      var na = new NumberAssert('test', 10);
      expect(function() {
        na.equal(10);
      }).to.not.throw(/equal/);
    });
  });

  describe('#in', function() {
    it('should throw an error when parameter values is not an array', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.in([1, 2, 3, 4, 5]);
      }).to.throw(/in/);
    });

    it('should throw an error when value is not present in parameter values', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.in([1, 2, 3, 4, 5]);
      }).to.throw(/in/);
    });

    it('should not throw an error when value is present in parameter values', function() {
      var na = new NumberAssert('test', 0);
      expect(function() {
        na.in([0, 1, 2, 3, 4, 5]);
      }).to.not.throw(/in/);
    });
  });
});
