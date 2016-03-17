import { expect } from 'chai';

import commonAssert from '../src/common-assert';

describe('common assert', () => {

  describe('#isType', () => {

    beforeEach(() => {
      process.env.NODE_ENV = undefined;
      Object.keys(require.cache).filter(x => x.includes('common-assert')).forEach(x => delete require.cache[x]);
    });

    it('should create dummy function when NODE_ENV === production', () => {
      process.env.NODE_ENV = 'production';
      const ca = require('../src/common-assert');
      expect(ca.isType(true, 'boolean')).to.be.true;
      expect(ca.isType(true, 'string')).to.be.true;
    });

    it('should verify value is of type', () => {
      const ca = require('../src/common-assert');
      expect(ca.isType(true, 'boolean')).to.be.true;
      expect(ca.isType(true, 'string')).to.be.false;
    });

  });

  describe('#optional', () => {
    let callback, fallback;

    beforeEach(() => {
      callback = () => 'callback';
      fallback = 'fallback';
    });

    it('should return callback value if not optional', () => {
      expect(commonAssert.optional(false, 'value', callback, fallback)).to.equal('callback');
    });

    it('should return callback value if optional and value exists', () => {
      expect(commonAssert.optional(true, 'value', callback, fallback)).to.equal('callback');
    });

    it('should return fallback value if optional and value is null', () => {
      expect(commonAssert.optional(true, null, callback, fallback)).to.equal('fallback');
    });

    it('should return callback value if optional and value is undefined', () => {
      expect(commonAssert.optional(true, undefined, callback, fallback)).to.equal('fallback');
    });

  });

  describe('#toStringCheck', () => {

    it('should throw an error when object is not of type value', () => {
      expect(() => {
        commonAssert.toStringCheck('test', new Date(), 'String');
      }).to.throw('test should be of type String');
    });

    it('should not throw an error when object is of type value', () => {
      expect(() => {
        commonAssert.toStringCheck('test', new Date(), 'Date');
      }).to.not.throw();
    });

    it('should not throw an error when object is of type value (case insensitive)', () => {
      expect(() => {
        commonAssert.toStringCheck('test', new Date(), 'date');
      }).to.not.throw();
    });

  });

  describe('#typeCheck', () => {

    it('should throw an error when value is not of type', () => {
      expect(() => {
        commonAssert.typeCheck('test', true, 'number');
      }).to.throw('test should be of type number');
    });

    it('should not throw an error when value is of type', () => {
      expect(() => {
        commonAssert.typeCheck('test', true, 'boolean');
      }).to.not.throw();
    });

  });

  describe('#arrayCheck', () => {

    it('should throw an error when value is not an array', () => {
      expect(() => {
        commonAssert.arrayCheck('test', {});
      }).to.throw('test should be an array');
    });

    it('should not throw an error when value is an array', () => {
      expect(() => {
        commonAssert.arrayCheck('test', []);
      }).to.not.throw();
    });

  });

});
