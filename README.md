# [fast-binary-indexed-tree][github-repo] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A JavaScript implementation of Binary Indexed Tree with fast initialization

Binary Indexed Tree also known as [Fenwick tree][wiki-fenwick-tree] is a data
structure providing efficient methods for calculation and manipulation of the
prefix sums of a table of values.

This JavaScript implementation is based on the
[Top Coder article][binary-indexed-tree] by [boba5551][boba5551]. Most of the
terms respect to the author's definition except for

* All indexes in the public API are 0 based

There's another implementation by [berlysia][berlysia]. Comparing to that, this
one is faster for creation. The constructor accepts a `defaultFrequency` option,
which initializes all frequencies in O(1) time complexity.

## Installation

```sh
$ npm install --save fast-binary-indexed-tree
```

## Usage
```js
var BinaryIndexedTree = require('fast-binary-indexed-tree');

var bit = new BinaryIndexedTree({ defaultFrequency: 10, maxVal: 10 });

// Read a single frequency
// Output: 10
console.log(bit.readSingle(3));

// Update the frequency by delta
// Output: 15
bit.update(2, 5);
console.log(bit.readSingle(2));

// Write a single frequency
// Output: 20
bit.writeSingle(3, 20);
console.log(bit.readSingle(3));

// Read the cumulated frequency
// Output: 55
console.log(bit.read(4));

// Find the lower bound
// Output: 3
console.log(bit.lowerBound(55));

// Find the upper bound
// Output: 4
console.log(bit.upperBound(55));
```
## License

MIT

This project has adopted the [Microsoft Open Source Code of Conduct][ms-code-of-conduct].
For more information see the [Code of Conduct FAQ][ms-code-of-conduct-faq]
or contact [opencode@microsoft.com][ms-mailto] with any additional questions or comments.

[boba5551]: https://www.topcoder.com/members/boba5551
[wiki-fenwick-tree]: https://en.wikipedia.org/wiki/Fenwick_tree
[binary-indexed-tree]: https://www.topcoder.com/community/data-science/data-science-tutorials/binary-indexed-trees/
[berlysia]: https://github.com/berlysia/binary-indexed-tree-js

[ms-code-of-conduct]: https://opensource.microsoft.com/codeofconduct/
[ms-code-of-conduct-faq]: https://opensource.microsoft.com/codeofconduct/faq/
[ms-mailto]: mailto:opencode@microsoft.com

[github-repo]: https://github.com/Microsoft/fast-binary-indexed-tree-js
[npm-image]: https://badge.fury.io/js/fast-binary-indexed-tree.svg
[npm-url]: https://npmjs.org/package/fast-binary-indexed-tree
[travis-image]: https://travis-ci.org/Microsoft/fast-binary-indexed-tree-js.svg?branch=master
[travis-url]: https://travis-ci.org/Microsoft/fast-binary-indexed-tree-js
[daviddm-image]: https://david-dm.org/Microsoft/fast-binary-indexed-tree-js.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Microsoft/fast-binary-indexed-tree-js
[coveralls-image]: https://coveralls.io/repos/Microsoft/fast-binary-indexed-tree-js/badge.svg
[coveralls-url]: https://coveralls.io/r/Microsoft/fast-binary-indexed-tree-js

