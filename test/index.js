import { expect } from 'chai';
import BinaryIndexedTree from '../lib';

describe('BinaryIndexedTree', function () {
  it('should be a class', function () {
    expect(BinaryIndexedTree).is.a('function');
  });

  it('should have defaultFrequency and maxVal members', function () {
    const defaultFrequency = 10;
    const maxVal = 10;
    const bit = new BinaryIndexedTree({ defaultFrequency, maxVal });

    expect(bit.defaultFrequency).to.equal(defaultFrequency);
    expect(bit.maxVal).to.equal(maxVal);
  });

  function testUpperBound(bit, values) {
    values.forEach(value => {
      const index = bit.upperBound(value);
      if (index > 0) {
        expect(bit.read(index)).to.be.at.most(value);
      } else {
        expect(index).to.equal(0);
      }
      if (index < bit.maxVal) {
        expect(bit.read(index + 1)).to.be.above(value);
      } else {
        expect(index).to.equal(bit.maxVal);
      }
    });
  }

  function testLowerBound(bit, values) {
    values.forEach(value => {
      const index = bit.lowerBound(value);
      if (index > 0) {
        expect(bit.read(index)).to.be.below(value);
      } else {
        expect(index).to.equal(0);
      }
      if (index < bit.maxVal) {
        expect(bit.read(index + 1)).to.be.at.least(value);
      } else {
        expect(index).to.equal(bit.maxVal);
      }
    });
  }

  describe('BIT with default frequency', function () {
    const defaultFrequency = 10;
    const maxVal = 10;
    let bit = null;

    beforeEach(function () {
      bit = new BinaryIndexedTree({ defaultFrequency, maxVal });
    });

    describe('BinaryIndexedTree#readSingle', function () {
      it('should validate the index', function () {
        expect(() => bit.readSingle(-1)).to.throw('Index out of range');
        expect(() => bit.readSingle(10)).to.throw('Index out of range');
        expect(() => bit.readSingle('1')).to.throw('Invalid index');
        expect(() => bit.readSingle(1.23)).to.throw('Invalid index');
        expect(() => bit.readSingle(null)).to.throw('Invalid index');
        expect(() => bit.readSingle(undefined)).to.throw('Invalid index');
      });

      it('should read a single frequency correctly', function () {
        for (let i = 0; i < maxVal; i++) {
          expect(bit.readSingle(i)).to.equal(defaultFrequency);
        }
      });
    });

    describe('BinaryIndexedTree#update', function () {
      it('should validate the index', function () {
        expect(() => bit.update(-1, 100)).to.throw('Index out of range');
        expect(() => bit.update(10, 100)).to.throw('Index out of range');
        expect(() => bit.update('1', 100)).to.throw('Invalid index');
        expect(() => bit.update(1.23, 100)).to.throw('Invalid index');
        expect(() => bit.update(null, 100)).to.throw('Invalid index');
        expect(() => bit.update(undefined, 100)).to.throw('Invalid index');
      });

      it('should update the frequency with the given delta', function () {
        for (let i = 0; i < maxVal; i++) {
          bit.update(i, i * 2);
        }
        for (let i = 0; i < maxVal; i++) {
          expect(bit.readSingle(i)).to.equal(i * 2 + defaultFrequency);
        }
      });
    });

    describe('BinaryIndexedTree#writeSingle', function () {
      it('should validate the index', function () {
        expect(() => bit.writeSingle(-1, 100)).to.throw('Index out of range');
        expect(() => bit.writeSingle(10, 100)).to.throw('Index out of range');
        expect(() => bit.writeSingle('1', 100)).to.throw('Invalid index');
        expect(() => bit.writeSingle(1.23, 100)).to.throw('Invalid index');
        expect(() => bit.writeSingle(null, 100)).to.throw('Invalid index');
        expect(() => bit.writeSingle(undefined, 100)).to.throw('Invalid index');
      });

      it('should write a single frequency correctly', function () {
        for (let i = 0; i < maxVal; i++) {
          bit.writeSingle(i, i * 2);
        }
        for (let i = 0; i < maxVal; i++) {
          expect(bit.readSingle(i)).to.equal(i * 2);
        }
      });
    });

    describe('BinaryIndexedTree#read', function () {
      it('should validate the count', function () {
        expect(() => bit.read('1')).to.throw('Invalid count');
        expect(() => bit.read(1.23)).to.throw('Invalid count');
        expect(() => bit.read(null)).to.throw('Invalid count');
        expect(() => bit.read(undefined)).to.throw('Invalid count');
      });

      it('should read the cumulative frequency correctly', function () {
        for (let c = 0; c <= maxVal; c++) {
          expect(bit.read(c)).to.equal(c * defaultFrequency);
        }
      });
    });

    const values = [-5, 0, 5, 10, 95, 100, 1000];

    describe('BinaryIndexedTree#upperBound', function () {
      it('should find the upper-bound index', function () {
        testUpperBound(bit, values);
      });
    });

    describe('BinaryIndexedTree#lowerBound', function () {
      it('should find the lower-bound index', function () {
        testLowerBound(bit, values);
      });
    });
  });

  describe('BIT with designated values', function () {
    const array = [1, 8, 6, 10, 7, 9, 0, 2, 6, 3];
    const sumArray = (sum => array.map(value => (sum += value)))(0);
    let bit = null;

    beforeEach(function () {
      bit = new BinaryIndexedTree({ maxVal: array.length });
      array.forEach((value, i) => bit.writeSingle(i, value));
    });

    describe('BinaryIndexedTree#readSingle', function () {
      it('should read a single frequency correctly', function () {
        array.forEach((value, i) => {
          expect(bit.readSingle(i)).to.equal(array[i]);
        });
      });
    });

    describe('BinaryIndexedTree#update', function () {
      it('should update the frequency with the given delta', function () {
        array.forEach((value, i) => bit.update(i, value + i));
        array.forEach((value, i) => {
          expect(bit.readSingle(i)).to.equal(array[i] * 2 + i);
        });
      });
    });

    describe('BinaryIndexedTree#writeSingle', function () {
      it('should write a single frequency correctly', function () {
        array.forEach((value, i) => bit.writeSingle(i, value + i));
        array.forEach((value, i) => {
          expect(bit.readSingle(i)).to.equal(array[i] + i);
        });
      });
    });

    describe('BinaryIndexedTree#read', function () {
      it('should read the cumulative frequency correctly', function () {
        expect(bit.read(0)).to.equal(0);
        sumArray.forEach((sum, i) => {
          expect(bit.read(i + 1)).to.equal(sum);
        });
      });
    });

    const values = [-5, 0, 15, 25, 43, 53, 100];

    describe('BinaryIndexedTree#upperBound', function () {
      it('should find the upper-bound index', function () {
        testUpperBound(bit, values);
      });
    });

    describe('BinaryIndexedTree#lowerBound', function () {
      it('should find the lower-bound index', function () {
        testLowerBound(bit, values);
      });
    });
  });

  describe('BIT with descending sequence', function () {
    const array = [1, 8, -6, 10, 7, 9, 0, -2, 6, 3];
    let bit = null;

    beforeEach(function () {
      bit = new BinaryIndexedTree({ maxVal: array.length });
      array.forEach((value, i) => bit.writeSingle(i, value));
    });

    it('should have a correct _countNeg property', function () {
      expect(bit._countNeg).to.equal(2);
      bit.update(2, 6);
      expect(bit._countNeg).to.equal(1);
      bit.update(7, 3);
      expect(bit._countNeg).to.equal(0);
      bit.update(8, -7);
      expect(bit._countNeg).to.equal(1);
    });

    const values = [-5, 0, 15, 25, 43, 53, 100];

    describe('BinaryIndexedTree#upperBound', function () {
      it('should valiate the non-descending', function () {
        expect(() => bit.upperBound(20)).to.throw('Sequence is not non-descending');
        bit.update(2, 12);
        bit.update(7, 4);
        testUpperBound(bit, values);
      });
    });

    describe('BinaryIndexedTree#lowerBound', function () {
      it('should valiate the non-descending', function () {
        expect(() => bit.lowerBound(20)).to.throw('Sequence is not non-descending');
        bit.update(2, 12);
        bit.update(7, 4);
        testLowerBound(bit, values);
      });
    });
  });
});
