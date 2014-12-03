// node_modules/.bin/regenerator -r generator/9_async_function.js | node
// # use regenerator to transform es7 to es5
// output:
//
// start run...
// tick 1 done after 500 ms
// tick 2 done after 1000 ms
// tick 3 done after 2000 ms

function tick(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

async function asyncFunction() {
  var time;
  console.log('start run...');
  time = await tick(500);
  console.log('tick 1 done after %s ms', time);
  time = await tick(1000);
  console.log('tick 2 done after %s ms', time);
  time = await tick(2000);
  console.log('tick 3 done after %s ms', time);
}

asyncFunction();
