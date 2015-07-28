'use strict';

var expect = require('chai').expect;
var ObjectAssert = require('../src/object-assert');

describe('ObjectAssert', function() {
  describe('#hasMember', function() {
    it('throws an error when object does not have specified member', function() {
      var oa = new ObjectAssert('test', {});
      expect(function() {
        oa.hasMember('thing');
      }).to.throw(/member/);
    });

    it('returns an instance of ObjectAssert', function() {
      var oa = new ObjectAssert('test', {thing: 'thing'});
      expect(oa.hasMember('thing')).to.be.an.instanceof(ObjectAssert);
    });

    it('does not throw an error when object has specified member', function() {
      var oa = new ObjectAssert('test', {thing: 'thing'});
      expect(function() {
        oa.hasMember('thing');
      }).to.not.throw(/member/);
    });
  });
});
