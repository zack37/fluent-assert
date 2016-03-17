import { expect } from 'chai';

import stringAssert from '../src/string-assert';

describe('stringAssert', () => {

  describe('#matches', () => {

    it('should throw an error when parameter is not of type RegExp', () => {
      var sa = stringAssert('test', 'test');
      expect(() => {
        sa.matches('test');
      }).to.throw('parameter regexp should be of type RegExp');
    });

    it('should throw an error when value does not match pattern', () => {
      var sa = stringAssert('test', 'test');
      expect(() => {
        sa.matches(/fail/);
      }).to.throw('test should match pattern /fail/');
    });

    it('should not throw an error when value matches pattern', () => {
      var sa = stringAssert('test', 'test');
      expect(() => {
        sa.matches(/test/);
      }).to.not.throw('test should match pattern /test/');
    });

    it('should return a stringAssert', () => {
      var sa = stringAssert('test', 'test');
      expect(sa.matches(/test/)).to.be.an.instanceOf(Object);
    });

  });

  describe('#notEmpty', () => {

    it('should throw an error when value is an empty string', () => {
      var sa = stringAssert('test', '');
      expect(() => {
        sa.notEmpty();
      }).to.throw('test should not be empty');
    });

    it('should return an instance of stringAssert', () => {
      var sa = stringAssert('test', 'test');
      expect(sa.notEmpty()).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when value is not an empty string', () => {
      var sa = stringAssert('test', 'test');
      expect(() => {
        sa.notEmpty();
      }).to.not.throw('test should not be empty');
    });

  });

  describe('#notWhiteSpace', () => {

    it('should throw an error when value is a white space string', () => {
      var sa = stringAssert('test', '         \t');
      expect(() => {
        sa.notWhiteSpace();
      }).to.throw('test should not be whitespace');
    });

    it('should throw an error when value is an empty string', () => {
      var sa = stringAssert('test', '');
      expect(() => {
        sa.notWhiteSpace();
      }).to.throw('test should not be whitespace');
    });

    it('should return an instance of stringAssert', () => {
      var sa = stringAssert('test', 'test');
      expect(sa.notWhiteSpace()).to.be.an.instanceOf(Object);
    });

    it('should not throw an error when value is not a white space string', () => {
      var sa = stringAssert('test', 'test');
      expect(() => {
        sa.notWhiteSpace();
      }).to.not.throw('test should not be whitespace');
    });

    it('should not throw an error when value is not only whitespace', () => {
      var sa = stringAssert('test', ' test ');
      expect(() => {
        sa.notWhiteSpace();
      }).to.not.throw('test should not be whitespace');
    });

  });

  describe('#uuid', () => {

    it('should have an alias of guid', () => {
      const sa = stringAssert('test', '');
      expect(sa.guid).to.be.a('function');
      expect(sa.guid).to.eql(sa.uuid);
    });

    it('should not throw an error for a well-formed UUID', () => {
      const sa = stringAssert('test', 'a4558b56-af55-47e4-9980-28b29e4f81ef');
      expect(sa.uuid).to.not.throw();
    });

    it('should not throw an error for missing first hyphen', () => {
      const sa = stringAssert('test', 'a4558b56af55-47e4-9980-28b29e4f81ef');
      expect(sa.uuid).to.not.throw();
    });

    it('should not throw an error for missing second hyphen', () => {
      const sa = stringAssert('test', 'a4558b56-af5547e4-9980-28b29e4f81ef');
      expect(sa.uuid).to.not.throw();
    });

    it('should not throw an error for missing third hyphen', () => {
      const sa = stringAssert('test', 'a4558b56-af55-47e49980-28b29e4f81ef');
      expect(sa.uuid).to.not.throw();
    });

    it('should not throw an error for missing fourth hyphen', () => {
      const sa = stringAssert('test', 'a4558b56-af55-47e4-998028b29e4f81ef');
      expect(sa.uuid).to.not.throw();
    });

    it('should not throw an error for missing all hyphens', () => {
      const sa = stringAssert('test', 'a4558b56af5547e4998028b29e4f81ef');
      expect(sa.uuid).to.not.throw();
    });

    it('should not throw an error for hex letter casing', () => {
      const sa = stringAssert('test', 'A4558B56AF55-47E4-9980-28b29E4f81EF');
      expect(sa.uuid).to.not.throw();
    });

    it('should throw an error for a malformed UUID', () => {
      const sa = stringAssert('test', 'obviously-not-a-uuid');
      expect(sa.uuid).to.throw('test should be a UUID');
    });

    it('should return an instance of stringAssert', () => {
      const sa = stringAssert('test', 'a4558b56-af55-47e4-9980-28b29e4f81ef');
      expect(sa.uuid()).to.be.an.instanceOf(Object);
    });

  });

});
