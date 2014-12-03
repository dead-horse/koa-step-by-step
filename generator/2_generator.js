// node --harmony generator/2_generator.js
// output:
//
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

function* GeneratorFunction(items) {
  var index = 0;
  var max = items.length;
  while (index < max) {
    yield items[index++];
  }
}

var generator = GeneratorFunction([1, 2, 3]);
do {
  var ret = generator.next();
  console.log(ret);
} while (!ret.done);
