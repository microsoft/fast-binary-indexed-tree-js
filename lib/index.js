// polyfill
Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

function mostSignificantBit(value) {
  let result = value;

  result |= result >> 1;
  result |= result >> 2;
  result |= result >> 4;
  result |= result >> 8;
  result |= result >> 16;
  result |= result >> 32;
  result -= result >> 1;

  return result;
}

class BinaryIndexedTree {
  constructor({ defaultValue, size }) {
    this.defaultValue = defaultValue;
    this.size = size;
    this.values = { 0: 0 };
    this.msb = mostSignificantBit(size);
  }

  _getTree(index) {
    if (index in this.values) {
      return this.values[index];
    }

    let result = this.defaultValue;
    let idx = index;

    while (!(idx & 1)) {
      idx >>= 1;
      result *= 2;
    }
    return result;
  }

  _addTree(index, delta) {
    this.values[index] = this._getTree(index) + delta;
  }

  _checkIndex(index) {
    if (!Number.isInteger(index)) {
      throw new Error('Invalid index');
    }
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of range');
    }
  }

  _checkCount(count) {
    if (!Number.isInteger(count)) {
      throw new Error('Invalid count');
    }
    if (count < 0 || count > this.size) {
      throw new Error('Count out of range');
    }
  }

  _get(idx) {
    let index = idx + 1;
    let value = this._getTree(index);
    let z = index - (index & -index);

    index--;

    while (index != z) {
      value -= this._getTree(index);
      index -= index & -index;
    }

    return value;
  }

  _add(idx, delta) {
    let index = idx + 1;
    while (index <= this.size) {
      this._addTree(index, delta);
      index += (index & -index);
    }
  }

  _set(idx, value) {
    this._add(idx, value - this._get(idx));
  }

  _sum(count) {
    let index = count;
    let sum = 0;
    while (index) {
      sum += this._getTree(index);
      index -= index & -index;
    }

    return sum;
  }

  _find(value, lower) {
    let left = 0;
    let right = this.msb << 1;
    let target = value;

    while (right > left + 1) {
      let middle = (left + right) >> 1;
      const valueM = this._getTree(middle);

      if (middle <= this.size && (lower ? valueM < target : valueM <= target)) {
        target -= valueM;
        left = middle;
      } else {
        right = middle;
      }
    }
    return left;
  }

  get(idx) {
    this._checkIndex(idx);
    return this._get(idx);
  }


  add(idx, delta) {
    this._checkIndex(idx);
    return this._add(idx, delta);
  }

  set(idx, value) {
    this._checkIndex(idx)
    return this._set(idx, value);
  }

  sum(count) {
    this._checkCount(count);
    return this._sum(count);
  }

  lowerBound(value) {
    return this._find(value, true);
  }

  upperBound(value) {
    return this._find(value, false);
  }

}

export default BinaryIndexedTree;
