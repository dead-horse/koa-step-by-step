// node generator/1_iterator.js
// output:
//
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

function IteratorFactory(items) {
  var iterator = {
    index: 0,
    max: items.length
  };

  iterator.next = function () {
    return this.index === this.max
      ? { value: undefined, done: true }
      : {value: items[this.index++], done: false};
  }

  return iterator;
};

var iterator = IteratorFactory([1, 2, 3]);
do {
  var ret = iterator.next();
  console.log(ret);
} while (!ret.done);
