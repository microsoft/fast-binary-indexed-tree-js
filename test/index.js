import { expect } from 'chai';
import BinaryIndexedTree from '../lib';

describe('BinaryIndexedTree', function () {
  it('should be a class', function () {
    expect(BinaryIndexedTree).is.a('function');
  });

  describe('sum', function () {
    it('should calculate the sum correctly with default value', function () {
      const bit = new BinaryIndexedTree({ defaultValue: 10, size: 10 });
      expect(bit.sum(0)).to.equal(0);
      expect(bit.sum(5)).to.equal(50);
      expect(bit.sum(10)).to.equal(100);
    });

    it('should calculate the sum correctly with set values', function () {
      const array = [1, 8, 6, 10, 7, 9, 0, 2, 6, 3];
      const bit = new BinaryIndexedTree({ defaultValue: 10, size: array.length });
      let sum = 0;
      const sumArray = array.map(value => sum += value);

      array.forEach((value, index) => {
        bit.set(index, value);
      });

      expect(bit.msb).to.equal(8);

      expect(bit.sum(0)).to.equal(0);
      for (let i = 0; i < sumArray.length; i++) {
        expect(bit.sum(i + 1)).to.equal(sumArray[i]);
      }
    });
  });
});
