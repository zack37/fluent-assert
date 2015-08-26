'use strict';

var expect = require('chai').expect;
var ObjectAssert = require('../src/object-assert');
var NumberAssert = require('../src/number-assert');

describe('ObjectAssert', function() {

  describe('#hasMember', function() {

    it('should throw an error when object does not have specified member', function() {
      var oa = new ObjectAssert('test', {});
      expect(function() {
        oa.hasMember('thing');
      }).to.throw(/member/);
    });

    it('should throw an error when new object does not have specified member', function() {
      var test = new ObjectAssert('test', {});
      var oa = new ObjectAssert('test', test);
      expect(function() {
        oa.hasMember('thing');
      }).to.throw(/member/);
    });

    it('should return an instance of ObjectAssert', function() {
      var oa = new ObjectAssert('test', { thing: 'thing' });
      expect(oa.hasMember('thing')).to.be.an.instanceof(ObjectAssert);
    });

    it('should not throw an error when object has specified member', function() {
      var oa = new ObjectAssert('test', { thing: 'thing' });
      expect(function() {
        oa.hasMember('thing');
      }).to.not.throw(/member/);
    });

    it('should throw an error when new object does not have specified member', function() {
      var test = new ObjectAssert('test', {});
      var oa = new ObjectAssert('test', test);
      expect(function() {
        oa.hasMember('hasMember');
      }).to.not.throw(/member/);
    });

  });

  describe('#instanceOf', function() {

    it('should throw an error when object is not an instance of type', function() {
      var test = new ObjectAssert('test', {});
      var oa = new ObjectAssert('test', test);
      expect(function() {
        oa.instanceOf(String);
      }).to.throw(/instance of/);
    });

    it('should return an instance of ObjectAssert', function() {
      var oa = new ObjectAssert('test', {});
      expect(oa.instanceOf(Object)).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when object is an instance of type', function() {
      var test = new ObjectAssert('test', {});
      var oa = new ObjectAssert('test', test);
      expect(function() {
        oa.instanceOf(ObjectAssert);
      }).to.not.throw(/instance of/);
    });

  });

});
