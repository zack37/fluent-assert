'use strict';

var expect = require('chai').expect;
var ArrayAssert = require('../src/array-assert');

describe('ArrayAssert', function() {

  describe('#of', function() {

    it('throws an error when array is not all of "type"', function() {
      var aa = new ArrayAssert('test', [1, '1']);
      expect(function() {
        aa.of('number');
      }).to.throw(/type/);
    });

    it('does not throw an error when array is all of "type"', function() {
      var aa = new ArrayAssert('test', [1, 2]);
      expect(function() {
        aa.of('number');
      }).to.not.throw(/type/);
    });

  });

  describe('#contains', function() {

    it('throws an error when array does not contain "value"', function() {
      var aa = new ArrayAssert('test', [1]);
      expect(function() {
        aa.contains(2);
      }).to.throw(/contain/);
    });

    it('does not throw an error when array contains "value"', function() {
      var aa = new ArrayAssert('test', [1]);
      expect(function() {
        aa.contains(1);
      }).to.not.throw(/contain/);
    });

  });

});
