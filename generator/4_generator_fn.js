// node --harmony generator/4_generator_fn.js
// output:
//
// tick 1 after 1000 ms
// tick 2 after 1000 ms
// tick 3 after 1000 ms

function* GeneratorFunction(items) {
  var index = 0;
  var max = items.length;
  while (index < max) {
    yield items[index++];
  }
}

function run(generator) {
  var ret = generator.next();
  if (ret.done) return;
  ret.value(function () {
    run(generator);
  });
}

var count = 1;
function tick(done) {
  setTimeout(function () {
    console.log('tick %s after %s ms', count++, 1000);
    done();
  }, 1000)
}

run(GeneratorFunction([tick, tick, tick]));
