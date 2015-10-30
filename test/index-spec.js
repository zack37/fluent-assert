'use strict';

var expect = require('chai').expect;
var assert = require('../src/index');
var NumberAssert = require('../src/number-assert');
var StringAssert = require('../src/string-assert');
var ObjectAssert = require('../src/object-assert');
var ArrayAssert = require('../src/array-assert');
var DateAssert = require('../src/date-assert');

describe('Assert', function() {

  describe('#optional', function() {

    it('should not keep isOptional true after each assertion chain', function() {
      assert.optional().bool('test', undefined);
      expect(assert.isOptional).to.be.false;
      expect(function() {
        assert.bool('test', undefined);
      }).to.throw('test should be of type boolean');
    });

    describe('boolean', function() {

      it('should not throw an error for an undefined argument', function() {
        expect(function() {
          assert.optional().bool('test', undefined);
        }).to.not.throw('test should be of type boolean');
      });

      it('should not throw an error for a null argument', function() {
        expect(function() {
          assert.optional().bool('test', null);
        }).to.not.throw('test should be of type boolean');
      });

      it('should not throw an error for a boolean value of true', function() {
        expect(function() {
          assert.optional().bool('test', true);
        }).to.not.throw('test should be of type boolean');
      });

      it('should not throw an error for a boolean value of false', function() {
        expect(function() {
          assert.optional().bool('test', false);
        }).to.not.throw('test should be of type boolean');
      });

      it('should throw an error for defined non-boolean value', function() {
        expect(function() {
          assert.optional().bool('test', {});
        }).to.throw('test should be of type boolean');
      });

    });

    describe('buffer', function() {

      it('should not throw an error for undefined value', function() {
        expect(function() {
          assert.optional().buffer('test', undefined);
        }).to.not.throw('test should be a buffer');
      });

      it('should not throw an error for null value', function() {
        expect(function() {
          assert.optional().buffer('test', null);
        }).to.not.throw('test should be a buffer');
      });

      it('should not throw an error for a buffer value', function() {
        expect(function() {
          assert.optional().buffer('test', new Buffer(0));
        }).to.not.throw('test should be a buffer');
      });

      it('should throw an error for defined non-buffer value', function() {
        expect(function() {
          assert.optional().buffer('test', {});
        }).to.throw('test should be a buffer');
      });

    });

    describe('function', function() {

      it('should not throw an error for undefined value', function() {
        expect(function() {
          assert.optional().func('test', undefined);
        }).to.not.throw('test should be of type function');
      });

      it('should not throw an error for null value', function() {
        expect(function() {
          assert.optional().func('test', null);
        }).to.not.throw('test should be of type function');
      });

      it('should not throw an error for function value', function() {
        expect(function() {
          assert.optional().func('test', function() {});
        }).to.not.throw('test should be of type function');
      });

      it('should throw an error for defined non-function value', function() {
        expect(function() {
          assert.optional().func('test', {});
        }).to.throw('test should be of type function');
      });

    });

    describe('number', function() {

      it('should not throw an error for undefined value', function() {
        expect(function() {
          assert.optional().number('test', undefined);
        }).to.not.throw('test should be of type number');
      });

      it('should not throw an error for null value', function() {
        expect(function() {
          assert.optional().number('test', null);
        }).to.not.throw('test should be of type number');
      });

      it('should not throw an error for number value', function() {
        expect(function() {
          assert.optional().number('test', 5);
        }).to.not.throw('test should be of type number');
      });

      it('should throw an error for defined non-number value', function() {
        expect(function() {
          assert.optional().number('test', {});
        }).to.throw('test should be of type number');
      });

    });

    describe('object', function() {

      it('should not throw an error for undefined value', function() {
        expect(function() {
          assert.optional().object('test', undefined);
        }).to.not.throw('test should be of type object');
      });

      it('should not throw an error for null value', function() {
        expect(function() {
          assert.optional().object('test', null);
        }).to.not.throw('test should be of type object');
      });

      it('should not throw an error for object value', function() {
        expect(function() {
          assert.optional().object('test', {});
        }).to.not.throw('test should be of type object');
      });

      it('should throw an error for defined non-object value', function() {
        expect(function() {
          assert.optional().object('test', 0);
        }).to.throw('test should be of type object');
      });

    });

    describe('string', function() {

      it('should not throw an error for undefined value', function() {
        expect(function() {
          assert.optional().string('test', undefined);
        }).to.not.throw('test should be of type string');
      });

      it('should not throw an error for null value', function() {
        expect(function() {
          assert.optional().string('test', null);
        }).to.not.throw('test should be of type string');
      });

      it('should not throw an error for string value', function() {
        expect(function() {
          assert.optional().string('test', 'test');
        }).to.not.throw('test should be of type string');
      });

      it('should throw an error for defined non-string value', function() {
        expect(function() {
          assert.optional().string('test', 0);
        }).to.throw('test should be of type string');
      });

    });

    describe('array', function() {

      it('should not throw an error for undefined value', function() {
        expect(function() {
          assert.optional().array('test', undefined);
        }).to.not.throw('test should be an array');
      });

      it('should not throw an error for null value', function() {
        expect(function() {
          assert.optional().array('test', null);
        }).to.not.throw('test should be an array');
      });

      it('should not throw an error for array value', function() {
        expect(function() {
          assert.optional().array('test', []);
        }).to.not.throw('test should be an array');
      });

      it('should throw an error for defined non-array value', function() {
        expect(function() {
          assert.optional().array('test', 0);
        }).to.throw('test should be an array');
      });
    });

    describe('date', function() {

      it('should not throw an error for an undefined argument', function() {
        expect(function() {
          assert.optional().date('test', undefined);
        }).to.not.throw('test should be of type Date');
      });

      it('should not throw an error for a null argument', function() {
        expect(function() {
          assert.optional().date('test', null);
        }).to.not.throw('test should be of type Date');
      });

      it('should not throw an error for date value', function() {
        expect(function() {
          assert.optional().date('test', new Date());
        }).to.not.throw('test should be of type Date');
      });

      it('should throw an error for defined non-date value', function() {
        expect(function() {
          assert.optional().date('test', {});
        }).to.throw('test should be of type Date');
      });

    });

  });

  describe('#number', function() {

    it('should not throw an error when creating a number validator for a number', function() {
      expect(function() {
        assert.number('test', 0);
      }).to.not.throw('test should be of type number');

    });

    it('should return a number validator', function() {
        var validator = assert.number('test', 0);
        expect(validator).to.be.an.instanceof(NumberAssert);
    });

    it('should throw an error when creating a number validator for not a number', function() {
      expect(function() {
        assert.number('test', '0');
      }).to.throw('test should be of type number');
    });

  });

  describe('#string', function() {

    it('should not throw an error when creating a string validator for a string', function() {
      expect(function() {
        assert.string('test', 'test');
      }).to.not.throw('test should be of type string');
    });

    it('should return a string validator', function() {
      var validator = assert.string('test', 'test');
      expect(validator).to.be.an.instanceof(StringAssert);
    });

    it('should throw an error when creating a string validator for not a string', function() {
      expect(function() {
        assert.string('test', 0);
      }).to.throw('test should be of type string');
    });

  });

  describe('#boolean', function() {

    it('should not throw an error when creating a boolean validator for a boolean', function() {
      expect(function() {
        assert.bool('test', false);
      }).to.not.throw('test should be of type boolean');
    });

    it('should throw an erro when creating a boolean validator for not a boolean', function() {
      expect(function() {
        assert.bool('test', 'false');
      }).to.throw('test should be of type boolean');
    });

  });

  describe('#array', function() {

    it('should not throw an error when creating an array validator for an array', function() {
      expect(function() {
        assert.array('test', []);
      }).to.not.throw('test should be an array');
    });

    it('should return an ArrayAssert', function() {
      var aa = assert.array('test', []);
      expect(aa).to.be.an.instanceof(ArrayAssert);
    });

    it('should throw an error when creating an array validator for not an array', function() {
      expect(function() {
        assert.array('test', {});
      }).to.throw('test should be an array');
    });

    it('should throw an assertion error for null values', function() {
      expect(function() {
        assert.array('test', null);
      }).to.throw('test should be an array');
    });

    it('should throw an assertion error for undefined values', function() {
      expect(function() {
        assert.array('test', undefined);
      }).to.throw('test should be an array');
    });

  });

  describe('#func', function() {

    it('should throw an error when value if not a function', function() {
      expect(function() {
        assert.func('test', {});
      }).to.throw('test should be of type function');
    });

    it('should not throw an error when value is a function', function() {
      expect(function() {
        assert.func('test', function() {});
      }).to.not.throw('test should be of type function');
    });

  });

  describe('#buffer', function() {

    it('should throw an error when value is not a Buffer', function() {
      expect(function() {
        assert.buffer('test', {});
      }).to.throw('test should be a buffer');
    });

    it('should not throw an error when value is a Buffer', function() {
      expect(function() {
        assert.buffer('test', new Buffer(0));
      }).to.not.throw('test should be a buffer');
    });

  });

  describe('#custom', function() {

    it('should throw an error when predicate is not a function', function() {
      expect(function() {
        assert.custom('test', 'test', 'test');
      }).to.throw('predicate should be of type function');
    });

    it('should throw an error when value does not match the predicate', function() {
      expect(function() {
        assert.custom('test', 'test', function(x) { return x === 'fail'; });
      }).to.throw('test should match predicate');
    });

    it('should not throw an error when value matches the predicate', function() {
      expect(function() {
        assert.custom('test', 'test', function(x) { return x === 'test'; });
      }).to.not.throw('test should match predicate');
    });

  });

  describe('#object', function() {

    it('should throw an error when value is not an object', function() {
      expect(function() {
        assert.object('test', 'not a direct object');
      }).to.throw('test should be of type object');
    });

    it('should return an ObjectAssert', function() {
      var oa = assert.object('test', {});
      expect(oa).to.be.an.instanceof(ObjectAssert);
    });

    it('should not throw an error when value is an object', function() {
      expect(function() {
        assert.object('test', {});
      }).to.not.throw('test should be of type object');
    });

  });

  describe('#date', function() {

    it('should throw an error when value is not a date', function() {
      expect(function() {
        assert.date('test', {});
      }).to.throw('test should be of type Date');
    });

    it('should return a DateAssert', function() {
      var da = assert.date('test', new Date());
      expect(da).to.be.an.instanceOf(DateAssert);
    });

    it('should not throw an error when value is a date', function() {
      expect(function() {
        assert.date('test', new Date());
      }).to.not.throw('test should be of type Date');
    });

  });

  describe('#ok', function() {

    it('should throw an error when value is null', function() {
      expect(function() {
        assert.ok('test', null);
      }).to.throw('test should not be undefined or null');
    });

    it('should throw an error when value is undefined', function() {
      expect(function() {
        assert.ok('test', undefined);
      }).to.throw('test should not be undefined or null');
    });

    it('should not throw when value is not null and not undefined', function() {
      expect(function() {
        assert.ok('test', {});
      }).to.not.throw('test should not be undefined or null');
    });

  });

  describe('#defined', function() {

    it('should not throw an error for a null argument', function() {
      expect(function() {
        assert.defined('test', null);
      }).to.not.throw('test should be defined');
    });

    it('should not throw an error for a defined object', function() {
      expect(function() {
        assert.defined('test', {});
      }).to.not.throw('test should be defined');
    });

    it('should throw an error for undefined argument', function() {
      expect(function() {
        assert.defined('test', undefined);
      }).to.throw('test should be defined');
    });

  });

});
