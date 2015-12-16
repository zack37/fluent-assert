'use strict';

var expect = require('chai').expect;
var numberAssert = require('../src/number-assert');

describe('numberAssert', function() {

  describe('#min', function() {

    it('should throw an error when validating a number smaller than "min"', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.min(100);
      }).to.throw('test should be greater than 100');
    });

    it('should not throw an error when validating a number larger than "min"', function() {
      var na = numberAssert('test', 100);
      expect(function() {
        na.min(0);
      }).to.not.throw('test should be greater than 0');
    });

    it('should not throw an error for value same as "min"', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.min(0);
      }).to.not.throw('test should be greater than 0');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 0);
      expect(na.min(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#max', function() {

    it('should throw an error when validating a number larger than "max"', function() {
      var na = numberAssert('test', 100);
      expect(function() {
        na.max(0);
      }).to.throw('test should be less than 0');
    });

    it('should not throw an error when validating a number smaller than "max"', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.max(100);
      }).to.not.throw('test should be less than 100');
    });

    it('should not throw an error for value same as "max"', function() {
      var na = numberAssert('test', 100);
      expect(function() {
        na.max(100);
      }).to.not.throw('test should be less than 100');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 0);
      expect(na.max(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#range', function() {

    it('should throw an error when lower bound rule is violated', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.range(1, 10);
      }).to.throw('test should be between 1 and 10');
    });

    it('should throw an error when upper bound rule is violated', function() {
      var na = numberAssert('test', 100);
      expect(function() {
        na.range(1, 10);
      }).to.throw('test should be between 1 and 10');
    });

    it('should not throw an error when value is the same as the lower bound', function() {
      var na = numberAssert('test', 10);
      expect(function() {
        na.range(10, 100);
      }).to.not.throw('test should be between 10 and 100');
    });

    it('should not throw an error when value is the same as the upper bound rule', function() {
      var na = numberAssert('test', 10);
      expect(function() {
        na.range(1, 10);
      }).to.not.throw('test should be between 1 and 10');
    });

    it('should not throw an error when value passed to numberAssert lies within lower and upper bound', function() {
      var na = numberAssert('test', 5);
      expect(function() {
        na.range(1, 10);
      }).to.not.throw('test should be between 1 and 10');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 0);
      expect(na.range(0, 10)).to.be.an.instanceOf(Object);
    });

  });

  describe('#even', function() {

    it('should throw an error for odd numbers', function() {
      var na = numberAssert('test', 5);
      expect(function() {
        na.even();
      }).to.throw('test should be even');
    });

    it('should not throw an error for even numbers', function() {
      var na = numberAssert('test', 6);
      expect(function() {
        na.even();
      }).to.not.throw('test should be even');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 0);
      expect(na.even()).to.be.an.instanceOf(Object);
    });

  });

  describe('#odd', function() {

    it('should throw an error for even numbers', function() {
      var na = numberAssert('test', 6);
      expect(function() {
        na.odd();
      }).to.throw('test should be odd');
    });

    it('should not throw an error for odd numbers', function() {
      var na = numberAssert('test', 5);
      expect(function() {
        na.odd();
      }).to.not.throw('test should be odd');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 1);
      expect(na.odd()).to.be.an.instanceOf(Object);
    });

  });

  describe('#equal', function() {

    it('should throw an error when value is greater than compare', function() {
      var na = numberAssert('test', 10);
      expect(function() {
        na.equal(0);
      }).to.throw('test should be equal to 0');
    });

    it('should throw an error when value is less than compare', function() {
      var na = numberAssert('test', 10);
      expect(function() {
        na.equal(100);
      }).to.throw('test should be equal to 100');
    });

    it('should not throw an error when value is equal to compare', function() {
      var na = numberAssert('test', 10);
      expect(function() {
        na.equal(10);
      }).to.not.throw('test should be equal to 10');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 0);
      expect(na.equal(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#in', function() {

    it('should throw an error when parameter values is not an array', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.in([1, 2, 3, 4, 5]);
      }).to.throw('test should be in 1,2,3,4,5');
    });

    it('should throw an error when value is not present in parameter values', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.in([1, 2, 3, 4, 5]);
      }).to.throw('test should be in 1,2,3,4,5');
    });

    it('should not throw an error when value is present in parameter values', function() {
      var na = numberAssert('test', 0);
      expect(function() {
        na.in([0, 1, 2, 3, 4, 5]);
      }).to.not.throw('test should be in 1,2,3,4,5');
    });

    it('should return a numberAssert', function() {
      var na = numberAssert('test', 0);
      expect(na.in([0])).to.be.an.instanceOf(Object);
    });

  });

});
