'use strict';

var expect = require('chai').expect;
var DateAssert = require('../src/date-assert');

describe('DateAssert', function() {

  describe('#before', function() {

    it('should throw an error when date is after value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
      da.before(new Date('January 2, 1970'));
      }).to.throw(/before/);
    });

    it('should not throw an error when date is before value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.before(new Date('December 31, 1969'));
      }).to.not.throw(/before/);
    });

    it('should return a DateAssert', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(da.before(new Date('December 31, 1969'))).to.be.an.instanceOf(DateAssert);
    });

  });

  describe('#after', function() {

    it('should throw an error when date is before value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.after(new Date('December 31, 1969'));
      }).to.throw(/after/);
    });

    it('should not throw an error when date is after value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.after(new Date('January 2, 1970'));
      }).to.not.throw(/after/);
    });

    it('should return a DateAssert', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(da.after(new Date('January 2, 1970'))).to.be.an.instanceOf(DateAssert);
    });

  });

  describe('#within', function() {

    it('should throw an error when date is before range', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('January 2, 1970'), new Date('January 5, 1970'));
      }).to.throw(/within/);
    });

    it('should throw an error when date is after range', function () {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('December 20, 1969'), new Date('December 31, 1969'));
      }).to.throw(/within/);
    });

    it('should not throw an error when date is within range', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('December 31, 1969'), new Date('January 5, 1970'));
      }).to.not.throw(/within/);
    });

    it('should not throw an error when date is equal to lower bound', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('January 1, 1970'), new Date('January 2, 1970'));
      }).to.not.throw(/within/);
    });

    it('should not throw an error when date is equal to upper bound', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('December 31, 1969'), new Date('January 1, 1970'));
      }).to.not.throw(/within/);
    });

    it('should return a DateAssert', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(da.within(new Date('December 31, 1969'), new Date('January 5, 1970'))).to.be.an.instanceOf(DateAssert);
    });

  });

  describe('#dayOf', function() {

    it('should throw an error when day is not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.dayOf(12);
      }).to.throw(/day/);
    });

    it('should not throw an error when day is not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.dayOf(1);
      }).to.not.throw(/day/);
    });

    it('should return a DateAssert', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(da.dayOf(1)).to.be.an.instanceOf(DateAssert);
    });

  });

  describe('#monthOf', function() {

    it('should throw an error when month is not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf(12);
      }).to.throw(/month/);
    });

    it('should throw an error when month is a short string not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('Feb');
      }).to.throw(/month/);
    });

    it('should throw an error when month is a long string not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('February');
      }).to.throw(/month/);
    });

    it('should not throw an error when month is not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf(0);
      }).to.not.throw(/month/);
    });

    it('should not throw an error when month is a short string equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('Jan');
      }).to.not.throw(/month/);
    });

    it('should not throw an error when month is a long string equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('January');
      }).to.not.throw(/month/);
    });

    it('should return a DateAssert', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(da.monthOf(0)).to.be.an.instanceOf(DateAssert);
    });

  });

  describe('#yearOf', function() {

    it('should throw an error when year is not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.yearOf(1969);
      }).to.throw(/year/);
    });

    it('should not throw an error when year is not equal to value', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.yearOf(1970);
      }).to.not.throw(/year/);
    });

    it('should return a DateAssert', function() {
      var da = new DateAssert('test', new Date('January 1, 1970'));
      expect(da.yearOf(1970)).to.be.an.instanceOf(DateAssert);
    });

  });

});
