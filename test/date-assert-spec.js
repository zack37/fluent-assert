'use strict';

var expect = require('chai').expect;
var dateAssert = require('../src/date-assert');

describe('dateAssert', function() {

  describe('#before', function() {

    it('should throw an error when date is after value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.before(new Date('January 2, 1970'));
      }).to.throw('test should occur before Fri Jan 02 1970');
    });

    it('should not throw an error when date is before value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.before(new Date('December 31, 1969'));
      }).to.not.throw('test should occur before Fri Jan 02 1970');
    });

    it('should return a dateAssert', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(da.before(new Date('December 31, 1969'))).to.be.an.instanceOf(Object);
    });

  });

  describe('#after', function() {

    it('should throw an error when date is before value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.after(new Date('December 31, 1969'));
      }).to.throw('test should occur after Wed Dec 31 1969');
    });

    it('should not throw an error when date is after value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.after(new Date('January 2, 1970'));
      }).to.not.throw('test should occur after Wed Dec 31 1969');
    });

    it('should return a dateAssert', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(da.after(new Date('January 2, 1970'))).to.be.an.instanceOf(Object);
    });

  });

  describe('#within', function() {

    it('should throw an error when date is before range', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('January 2, 1970'), new Date('January 5, 1970'));
      }).to.throw(/test should be within Fri Jan 02 1970 .* and Mon Jan 05 1970 .*/);
    });

    it('should throw an error when date is after range', function () {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('December 20, 1969'), new Date('December 31, 1969'));
      }).to.throw(/test should be within Sat Dec 20 1969 .* and Wed Dec 31 1969 .*/);
    });

    it('should not throw an error when date is within range', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('December 31, 1969'), new Date('January 5, 1970'));
      }).to.not.throw(/test should be within Fri Jan 02 1970 .* and Mon Jan 05 1970 .*/);
    });

    it('should not throw an error when date is equal to lower bound', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('January 1, 1970'), new Date('January 2, 1970'));
      }).to.not.throw(/test should be within Thu Jan 01 1970 .* and Fri Jan 02 1970 .*/);
    });

    it('should not throw an error when date is equal to upper bound', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.within(new Date('December 31, 1969'), new Date('January 1, 1970'));
      }).to.not.throw(/test should be within  Wed Dec 31 1969 .* and Thu Jan 1 1970 .*/);
    });

    it('should return a dateAssert', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(da.within(new Date('December 31, 1969'), new Date('January 5, 1970'))).to.be.an.instanceOf(Object);
    });

  });

  describe('#dayOf', function() {

    it('should throw an error when day is not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.dayOf(12);
      }).to.throw('test should occur on day 12');
    });

    it('should not throw an error when day is not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.dayOf(1);
      }).to.not.throw('test should occur on day 1');
    });

    it('should return a dateAssert', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(da.dayOf(1)).to.be.an.instanceOf(Object);
    });

  });

  describe('#monthOf', function() {

    it('should throw an error when month is not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf(12);
      }).to.throw('test should occur on month 12');
    });

    it('should throw an error when month is a short string not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('Feb');
      }).to.throw('test should occur on month Feb');
    });

    it('should throw an error when month is a long string not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('February');
      }).to.throw('test should occur on month February');
    });

    it('should not throw an error when month is not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf(0);
      }).to.not.throw('test should occur on month 0');
    });

    it('should not throw an error when month is a short string equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('Jan');
      }).to.not.throw('test should occur on month Jan');
    });

    it('should not throw an error when month is a long string equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.monthOf('January');
      }).to.not.throw('test should occur on month January');
    });

    it('should return a dateAssert', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(da.monthOf(0)).to.be.an.instanceOf(Object);
    });

  });

  describe('#yearOf', function() {

    it('should throw an error when year is not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.yearOf(1969);
      }).to.throw('test should occur on year 1969');
    });

    it('should not throw an error when year is not equal to value', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(function() {
        da.yearOf(1970);
      }).to.not.throw('test should occur on year 1970');
    });

    it('should return a dateAssert', function() {
      var da = dateAssert('test', new Date('January 1, 1970'));
      expect(da.yearOf(1970)).to.be.an.instanceOf(Object);
    });

  });

});
