var expect = require('chai').expect;
var assert = require('../src/index');
var NumberAssert = require('../src/number-assert');
var StringAssert = require('../src/string-assert');

describe('Assert', function() {
  describe('Number', function() {
    it('can create a number validator', function() {
      expect(function() {
        assert.number('test', 0);
      }).to.not.throw;
    });

    it('returns a number validator', function() {
        var validator = assert.number('test', 0);
        expect(validator).to.be.an.instanceof(NumberAssert);
    });

    it('throws when creating a number validator for not a number', function() {
      expect(function() {
        assert.number('test', '0');
      }).to.throw(/number/);
    });
  });

  describe('String', function() {
    it('can create a string validator', function() {
      expect(function() {
        assert.string('test', 'test');
      }).to.not.throw;
    });

    it('returns a string validator', function() {
      var validator = assert.string('test', 'test');
      expect(validator).to.be.an.instanceof(StringAssert);
    });

    it('throws when creating a string validator for not a string', function() {
      expect(function() {
        assert.string('test', 0);
      }).to.throw(/string/);
    });
  });

  describe('Boolean', function() {
    it('can create a boolean validator', function() {
      expect(function() {
        assert.bool('test', false);
      }).to.not.throw;
    });

    it('throws when creating a boolean validator for not a boolean', function() {
      expect(function() {
        assert.bool('test', 'false');
      }).to.throw(/boolean/);
    });
  });

  describe('Array', function() {
    it('can create an array validator', function() {
      expect(function() {
        assert.array('test', []);
      }).to.not.throw(/array/);
    });

    it('throws when creating an array validator for not an array', function() {
      expect(function() {
        assert.array('test', {});
      }).to.throw(/array/);
    });
  });

  describe('Custom', function() {
    it('throw an error when predicate is not a function', function() {
      expect(function() {
        assert.custom('test', 'test', 'test');
      }).to.throw(/function/);
    });

    it('throws an error when value does not match the predicate', function() {
      expect(function() {
        assert.custom('test', 'test', function(x) { return x === 'fail' });
      }).to.throw(/predicate/);
    });

    it('does not throw an error when value matches the predicate', function() {
      expect(function() {
        assert.custom('test', 'test', function(x) { return x === 'test'; });
      }).to.not.throw(/predicate/);
    });
  });
});
