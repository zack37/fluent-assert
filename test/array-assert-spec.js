'use strict';

var expect = require('chai').expect;
var ArrayAssert = require('../src/array-assert');

describe('ArrayAssert', function() {

  describe('#of', function() {

    it('should throw an error when array is not all of "type" as string', function() {
      var aa = new ArrayAssert('test', [1, '1']);
      expect(function() {
        aa.of('number');
      }).to.throw('test should be all of type number');
    });

    it('should not throw an error when array is all of "type" as string', function() {
      var aa = new ArrayAssert('test', [1, 2]);
      expect(function() {
        aa.of('number');
      }).to.not.throw('test should be all of type number');
    });

    it('should throw an error when array is not all of "type" as function', function() {
      var aa = new ArrayAssert('test', [1, 2, '3']);
      expect(function() {
        aa.of(Number);
      }).to.throw('test should be all of type function Number');
    });

    it('should not throw an error when array is not all of "type" as function', function() {
      var aa = new ArrayAssert('test', [Number(1), 2, 3]);
      expect(function() {
        aa.of(Number);
      }).to.not.throw('test should be all of type function Number');
    });

    it('should return an ArrayAssert', function() {
      var aa = new ArrayAssert('test', [1]);
      expect(aa.of('number')).to.be.an.instanceOf(ArrayAssert);
    });

  });

  describe('#contains', function() {

    it('should throw an error when array does not contain "value"', function() {
      var aa = new ArrayAssert('test', [1]);
      expect(function() {
        aa.contains(2);
      }).to.throw('test should contain 2');
    });

    it('should not throw an error when array contains "value"', function() {
      var aa = new ArrayAssert('test', [1]);
      expect(function() {
        aa.contains(1);
      }).to.not.throw('test should contain 2');
    });

    it('should return an ArrayAssert', function() {
      var aa = new ArrayAssert('test', [0]);
      expect(aa.contains(0)).to.be.an.instanceOf(ArrayAssert);
    });

  });

});
