// node --harmony generator/5_generator_logic.js
// output:
//
// start run...
// tick 1 after 1000 ms
// tick 1 done
// tick 2 after 1000 ms
// tick 2 done
// tick 3 after 1000 ms
// tick 3 done

var count = 1;
function tick(done) {
  setTimeout(function () {
    console.log('tick %s after %s ms', count++, 1000);
    done();
  }, 1000)
}

function* GeneratorFactory() {
  console.log('start run...');
  yield tick;
  console.log('tick 1 done');
  yield tick;
  console.log('tick 2 done');
  yield tick;
  console.log('tick 3 done');
}

function run(generator) {
  var ret = generator.next();
  if (ret.done) return;
  ret.value(function () {
    run(generator);
  });
}

run(GeneratorFactory());
