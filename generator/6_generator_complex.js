// node --harmony generator/6_generator_complex.js
// output:
//
// start run...
// tick 1 done after 500 ms
// tick 2 done after 1000 ms
// tick 3 done after 2000 ms

function tick(time) {
  return function (done) {
    setTimeout(function () {
      done(null, time);
    }, time);
  }
}

function* GeneratorFunction() {
  var time;
  console.log('start run...');
  time = yield tick(500);
  console.log('tick 1 done after %s ms', time);
  time = yield tick(1000);
  console.log('tick 2 done after %s ms', time);
  time = yield tick(2000);
  console.log('tick 3 done after %s ms', time);
}

function run(generator, err, res) {
  var ret = generator.next(res);
  if (ret.done) return;
  ret.value(function (err, res) {
    run(generator, err, res);
  });
}

run(GeneratorFunction());
