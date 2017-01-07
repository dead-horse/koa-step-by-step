// node generator/3_iterator_fn.js
// output:
//
// tick 1 after 1000 ms
// tick 2 after 1000 ms
// tick 3 after 1000 ms

// only call once
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
}

function run(iterator) {
  var ret = iterator.next();
  if (ret.done) return;
  var tick = ret.value;
  tick(function () {
    run(iterator);// jump to line 24
  });
}

var count = 1;
function tick(done) {
  setTimeout(function () {
    console.log('tick %s after %s ms', count++, 1000);
    done();
  }, 1000)
}

//here
run(IteratorFactory([tick, tick, tick, tick, tick]));

