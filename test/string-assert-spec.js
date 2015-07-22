var expect = require('chai').expect;
var StringAssert = require('../src/string-assert');

describe('StringAssert', function() {
  describe('#matches', function() {
    it('throws an error when parameter is not of type RegExp', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.matches('test');
      }).to.throw(/RegExp/);
    });

    it('throws an error when value does not match pattern', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.matches(/fail/);
      }).to.throw(/match/);
    });

    it('does not throw an error when value matches pattern', function() {
      var sa = new StringAssert('test', 'test');
      expect(function() {
        sa.matches(/test/);
      }).to.not.throw(/match/);
    });
  });


});
