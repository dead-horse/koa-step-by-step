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
function tick() {
  return new Promise(resolve => {
    setTimeout(function () {
      console.log('tick %s after %s ms', count++, 1000);
      resolve();
    }, 1000);
  });
}

function* GeneratorFactory() {
  yield tick();
  yield tick();
  yield tick();
}

function run(generator) {
  var ret = generator.next();
  if (ret.done) return;
  console.log(ret.value)
  ret.value.then(function () {
    run(generator);
  });
}

run(GeneratorFactory());
