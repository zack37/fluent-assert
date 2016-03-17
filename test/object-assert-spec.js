import { expect } from 'chai';

import objectAssert from '../src/object-assert';

describe('objectAssert', function() {

  describe('#hasMember', function() {

    it('should throw an error when object does not have specified member', function() {
      var oa = objectAssert('test', {});
      expect(function() {
        oa.hasMember('thing');
      }).to.throw('test should have member named thing');
    });

    it('should throw an error when new object does not have specified member', function() {
      var test = objectAssert('test', {});
      var oa = objectAssert('test', test);
      expect(function() {
        oa.hasMember('thing');
      }).to.throw('test should have member named thing');
    });

    it('should return an instance of objectAssert', function() {
      var oa = objectAssert('test', { thing: 'thing' });
      expect(oa.hasMember('thing')).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when object has specified member', function() {
      var oa = objectAssert('test', { thing: 'thing' });
      expect(function() {
        oa.hasMember('thing');
      }).to.not.throw('test should have member named thing');
    });

    it('should throw an error when new object does not have specified member', function() {
      var test = objectAssert('test', {});
      var oa = objectAssert('test', test);
      expect(function() {
        oa.hasMember('hasMember');
      }).to.not.throw('test should have member named hasMember');
    });

  });

  describe('#instanceOf', function() {

    it('should throw an error when object is not an instance of type', function() {
      var test = objectAssert('test', {});
      var oa = objectAssert('test', test);
      expect(function() {
        oa.instanceOf(String);
      }).to.throw('test should be an instance of function String');
    });

    it('should return an instance of objectAssert', function() {
      var oa = objectAssert('test', {});
      expect(oa.instanceOf(Object)).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when object is an instance of type', function() {
      var test = objectAssert('test', {});
      var oa = objectAssert('test', test);
      expect(function() {
        oa.instanceOf(objectAssert);
      }).to.not.throw('test should be an instance of function objectAssert');
    });

  });

});
