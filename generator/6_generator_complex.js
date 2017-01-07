// node --harmony generator/6_generator_complex.js
// output:
//
// start run...
// tick 1 done after 500 ms
// tick 2 done after 1000 ms
// tick 3 done after 2000 ms

var count = 1;
function tick(time) {
  return new Promise(resolve => {
    setTimeout(function () {
      console.log('tick %s after %s ms', count++, time);
      resolve();
    }, time);
  });
}

function* GeneratorFunction() {
  var time;
  console.log('start run...');
  time = yield tick(500);
  time = yield tick(1000);
  time = yield tick(2000);
}

function run(generator, res) {
  var ret = generator.next(res);
  if (ret.done) return;
  ret.value.then(function (res) {
    run(generator, res);
  });
}

run(GeneratorFunction());
