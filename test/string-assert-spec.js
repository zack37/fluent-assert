import { expect } from 'chai';

import stringAssert from '../src/string-assert';

describe('stringAssert', function() {

  describe('#matches', function() {

    it('should throw an error when parameter is not of type RegExp', function() {
      var sa = stringAssert('test', 'test');
      expect(function() {
        sa.matches('test');
      }).to.throw('parameter regexp should be of type RegExp');
    });

    it('should throw an error when value does not match pattern', function() {
      var sa = stringAssert('test', 'test');
      expect(function() {
        sa.matches(/fail/);
      }).to.throw('test should match pattern /fail/');
    });

    it('should not throw an error when value matches pattern', function() {
      var sa = stringAssert('test', 'test');
      expect(function() {
        sa.matches(/test/);
      }).to.not.throw('test should match pattern /test/');
    });

    it('should return a stringAssert', function() {
      var sa = stringAssert('test', 'test');
      expect(sa.matches(/test/)).to.be.an.instanceOf(Object);
    });

  });

  describe('#notEmpty', function() {

    it('should throw an error when value is an empty string', function() {
      var sa = stringAssert('test', '');
      expect(function() {
        sa.notEmpty();
      }).to.throw('test should not be empty');
    });

    it('should return an instance of stringAssert', function() {
      var sa = stringAssert('test', 'test');
      expect(sa.notEmpty()).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when value is not an empty string', function() {
      var sa = stringAssert('test', 'test');
      expect(function() {
        sa.notEmpty();
      }).to.not.throw('test should not be empty');
    });

  });

  describe('#notWhiteSpace', function() {

    it('should throw an error when value is a white space string', function() {
      var sa = stringAssert('test', '         \t');
      expect(function() {
        sa.notWhiteSpace();
      }).to.throw('test should not be whitespace');
    });

    it('should throw an error when value is an empty string', function() {
      var sa = stringAssert('test', '');
      expect(function() {
        sa.notWhiteSpace();
      }).to.throw('test should not be whitespace');
    });

    it('should return an instance of stringAssert', function() {
      var sa = stringAssert('test', 'test');
      expect(sa.notWhiteSpace()).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when value is not a white space string', function() {
      var sa = stringAssert('test', 'test');
      expect(function() {
        sa.notWhiteSpace();
      }).to.not.throw('test should not be whitespace');
    });

    it('should not throw an error when value is not only whitespace', function() {
      var sa = stringAssert('test', ' test ');
      expect(function() {
        sa.notWhiteSpace();
      }).to.not.throw('test should not be whitespace');
    });

  });

});
