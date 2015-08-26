'use strict';

var expect = require('chai').expect;
var StringAssert = require('../src/string-assert');

describe('StringAssert', function() {
  describe('#matches', function() {
    it('should throw an error when parameter is not of type RegExp', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.matches('test');
      }).to.throw(/RegExp/);
    });

    it('should throw an error when value does not match pattern', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.matches(/fail/);
      }).to.throw(/match/);
    });

    it('should not throw an error when value matches pattern', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.matches(/test/);
      }).to.not.throw(/match/);
    });
  });

  describe('#notEmpty', function() {
    it('should throw an error when value is an empty string', function() {
      var sa = new StringAssert('test', '');
      expect(function() {
        sa.notEmpty();
      }).to.throw(/empty/);
    });

    it('should return an instance of StringAssert', function() {
      var sa = new StringAssert('test', 'test');
      expect(sa.notEmpty()).to.be.an.instanceof(StringAssert);
    });

    it('should not throw an error when value is not an empty string', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.notEmpty();
      }).to.not.throw(/empty/);
    });
  });

  describe('#notWhiteSpace', function() {

    it('should throw an error when value is a white space string', function() {
      var sa = new StringAssert('test', '         \t');
      expect(function() {
        sa.notWhiteSpace();
      }).to.throw('white space');
    });

    it('should throw an error when value is an empty string', function() {
      var sa = new StringAssert('test', '');
      expect(function() {
        sa.notWhiteSpace();
      }).to.throw(/white space/);
    });

    it('should return an instance of StringAssert', function() {
      var sa = new StringAssert('test', 'test');
      expect(sa.notWhiteSpace()).to.be.an.instanceof(StringAssert);
    });

    it('should not throw an error when value is not a white space string', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.notWhiteSpace();
      }).to.not.throw('white space');
    });

    it('should not throw an error when value is not only whitespace', function() {
      var sa = new StringAssert('test', ' test ');
      expect(function() {
        sa.notWhiteSpace();
      }).to.not.throw('white space');
    });

  });

});
