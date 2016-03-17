import { expect } from 'chai';

import numberAssert from '../src/number-assert';

describe('numberAssert', () => {

  describe('#min', () => {

    it('should throw an error when validating a number smaller than "min"', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.min(100);
      }).to.throw('test should be greater than 100');
    });

    it('should not throw an error when validating a number larger than "min"', () => {
      const na = numberAssert('test', 100);
      expect(() => {
        na.min(0);
      }).to.not.throw('test should be greater than 0');
    });

    it('should not throw an error for value same as "min"', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.min(0);
      }).to.not.throw('test should be greater than 0');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.min(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#max', () => {

    it('should throw an error when validating a number larger than "max"', () => {
      const na = numberAssert('test', 100);
      expect(() => {
        na.max(0);
      }).to.throw('test should be less than 0');
    });

    it('should not throw an error when validating a number smaller than "max"', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.max(100);
      }).to.not.throw('test should be less than 100');
    });

    it('should not throw an error for value same as "max"', () => {
      const na = numberAssert('test', 100);
      expect(() => {
        na.max(100);
      }).to.not.throw('test should be less than 100');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.max(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#range', () => {

    it('should throw an error when lower bound rule is violated', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.range(1, 10);
      }).to.throw('test should be between 1 and 10');
    });

    it('should throw an error when upper bound rule is violated', () => {
      const na = numberAssert('test', 100);
      expect(() => {
        na.range(1, 10);
      }).to.throw('test should be between 1 and 10');
    });

    it('should not throw an error when value is the same as the lower bound', () => {
      const na = numberAssert('test', 10);
      expect(() => {
        na.range(10, 100);
      }).to.not.throw('test should be between 10 and 100');
    });

    it('should not throw an error when value is the same as the upper bound rule', () => {
      const na = numberAssert('test', 10);
      expect(() => {
        na.range(1, 10);
      }).to.not.throw('test should be between 1 and 10');
    });

    it('should not throw an error when value passed to numberAssert lies within lower and upper bound', () => {
      const na = numberAssert('test', 5);
      expect(() => {
        na.range(1, 10);
      }).to.not.throw('test should be between 1 and 10');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.range(0, 10)).to.be.an.instanceOf(Object);
    });

  });

  describe('#even', () => {

    it('should throw an error for odd numbers', () => {
      const na = numberAssert('test', 5);
      expect(() => {
        na.even();
      }).to.throw('test should be even');
    });

    it('should not throw an error for even numbers', () => {
      const na = numberAssert('test', 6);
      expect(() => {
        na.even();
      }).to.not.throw('test should be even');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.even()).to.be.an.instanceOf(Object);
    });

  });

  describe('#odd', () => {

    it('should throw an error for even numbers', () => {
      const na = numberAssert('test', 6);
      expect(() => {
        na.odd();
      }).to.throw('test should be odd');
    });

    it('should not throw an error for odd numbers', () => {
      const na = numberAssert('test', 5);
      expect(() => {
        na.odd();
      }).to.not.throw('test should be odd');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 1);
      expect(na.odd()).to.be.an.instanceOf(Object);
    });

  });

  describe('#equal', () => {

    it('should throw an error when value is greater than compare', () => {
      const na = numberAssert('test', 10);
      expect(() => {
        na.equal(0);
      }).to.throw('test should be equal to 0');
    });

    it('should throw an error when value is less than compare', () => {
      const na = numberAssert('test', 10);
      expect(() => {
        na.equal(100);
      }).to.throw('test should be equal to 100');
    });

    it('should not throw an error when value is equal to compare', () => {
      const na = numberAssert('test', 10);
      expect(() => {
        na.equal(10);
      }).to.not.throw('test should be equal to 10');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.equal(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#in', () => {

    it('should throw an error when parameter values is not an array', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.in([1, 2, 3, 4, 5]);
      }).to.throw('test should be in 1,2,3,4,5');
    });

    it('should throw an error when value is not present in parameter values', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.in([1, 2, 3, 4, 5]);
      }).to.throw('test should be in 1,2,3,4,5');
    });

    it('should not throw an error when value is present in parameter values', () => {
      const na = numberAssert('test', 0);
      expect(() => {
        na.in([0, 1, 2, 3, 4, 5]);
      }).to.not.throw('test should be in 1,2,3,4,5');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.in([0])).to.be.an.instanceOf(Object);
    });

  });

  describe('#finite', () => {

    it('should not throw an error for a positive number', () => {
      const na = numberAssert('test', 100);
      expect(na.finite).to.not.throw();
    });

    it('should not throw an error for a negative number', () => {
      const na = numberAssert('test', -100);
      expect(na.finite).to.not.throw();
    });

    it('should not throw an error for a decimal number', () => {
      const na = numberAssert('test', 1.10);
      expect(na.finite).to.not.throw();
    });

    it('should not throw an error for a 0', () => {
      const na = numberAssert('test', 0);
      expect(na.finite).to.not.throw();
    });

    it('should throw an error for positive infinity', () => {
      const na = numberAssert('test', Infinity);
      expect(na.finite).to.throw('test should be a finite number');
    });

    it('should throw an error for negative infinity', () => {
      const na = numberAssert('test', -Infinity);
      expect(na.finite).to.throw('test should be a finite number');
    });

    it('should throw an error for NaN', () => {
      const na = numberAssert('test', NaN);
      expect(na.finite).to.throw('test should be a finite number');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.finite()).to.be.an.instanceOf(Object);
    });

  });

  describe('#integer', () => {

    it('should not throw an error for an integer value', () => {
      const na = numberAssert('test', 10);
      expect(na.integer).to.not.throw();
    });

    it('should throw an error for a float value', () => {
      const na = numberAssert('test', 10.1);
      expect(na.integer).to.throw('test should be an integer');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.finite()).to.be.an.instanceOf(Object);
    });

  });

  describe('#float', () => {

    it('should not throw an error for a float value', () => {
      const na = numberAssert('test', 10.1);
      expect(na.float).to.not.throw();
    });

    it('should throw an error for an integer value', () => {
      const na = numberAssert('test', 10);
      expect(na.float).to.throw('test should be a float');
    });

    it('should return a numberAssert', () => {
      const na = numberAssert('test', 0);
      expect(na.finite()).to.be.an.instanceOf(Object);
    });

  });

  describe('positive', () => {

    it('should not throw an error for a positive number', () => {
      const na = numberAssert('test', 10);
      expect(na.positive).to.not.throw();
    });

    it('should throw an error for a negative number', () => {
      const na = numberAssert('test', -10);
      expect(na.positive).to.throw('test should be a positive number');
    });

    it('should throw an error for a zero (0) value', () => {
      const na = numberAssert('test', 0);
      expect(na.positive).to.throw('test should be a positive number');
    });

    it('should return an instance of numberAssert', () => {
      const na = numberAssert('test', 10);
      expect(na.positive()).to.be.an.instanceOf(Object);
    });

  });

  describe('negative', () => {

    it('should not throw an error for a negative number', () => {
      const na = numberAssert('test', -10);
      expect(na.negative).to.not.throw();
    });

    it('should throw an error for a positive number', () => {
      const na = numberAssert('test', 10);
      expect(na.negative).to.throw('test should be a negative number');
    });

    it('should throw an error for a zero (0) value', () => {
      const na = numberAssert('test', 0);
      expect(na.negative).to.throw('test should be a negative number');
    });

    it('should return an instance of numberAssert', () => {
      const na = numberAssert('test', -10);
      expect(na.negative()).to.be.an.instanceOf(Object);
    })

  });

});
