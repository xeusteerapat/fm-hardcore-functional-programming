const add = (x, y) => x + y;

const toPair =
  fn =>
  ([x, y]) =>
    fn(x, y);

const res1 = toPair(add)([4, 5]);
console.log(res1); // 9

const fromPair = fn => (x, y) => fn([x, y]);

const res2 = fromPair(toPair(add))(3, 4);
console.log(res2); // 7

// const curry = fn => x => y => fn(x, y);
const { curry } = require('ramda');

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2);

const res3 = isOdd(5);
console.log(res3); // 1

const filter = curry((predicateFn, arr) => arr.filter(predicateFn));

const getOdds = filter(isOdd);

const res4 = getOdds([1, 2, 3, 4, 5, 6, 7, 8]); // [ 1, 3, 5, 7 ]
console.log(res4);

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replace(/[AEIOU]/gi, '!');
const res5 = replaceVowels('Hey I am a programmer');
console.log(res5);

// Split
const split = curry((delimeter, str) => str.split(delimeter));
const batmanSplitted = split(' ', 'Jingle bells Batman smells');
console.log(batmanSplitted);

// Array reduce implementation
const reduce = function (reducerFn, initialVal, arr) {
  let accom = initialVal;

  for (let i = 0; i < this.length; i++) {
    accom = reducerFn(accom, this[i]);
  }

  return accom;
};

// const nums = [1, 2, 3];
// console.log(reduce((acc, curr) => acc + curr, 0, nums)); // 6

// Implement filer with Reduce
const filterWithReduce = (fn, arr) =>
  reduce((acc, curr) => (fn(curr) ? acc.concat([curr]) : acc), [], arr);

const even = filterWithReduce([1, 2, 3, 4]);
console.log('filterWithReduce:', even);
