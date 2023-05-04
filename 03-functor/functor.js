// Functor is a container that holds an object that is mapped over,
const Box = x => ({
  map: fn => Box(fn(x)),
  fold: fn => fn(x),
});

/*
const nextCharForNumberString = str => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};
*/

const nextCharForNumberString = str => {
  return Box(str)
    .map(x => x.trim())
    .map(trimmed => parseInt(trimmed, 10))
    .map(number => new Number(number + 1))
    .fold(String.fromCharCode);
};

const result = nextCharForNumberString('  65 ');
console.log(result);

// helper
const first = xs => xs[0];

const Functor = x => ({
  map: fn => Functor(fn(x)),
  fold: fn => fn(x),
});

/**
 * 
  const found = xs.filter(x => x >= 20);
  const answer = first(found) / 2;
 */
const halfTheFirstLargeNumber = xs => {
  const res = Functor(xs)
    .map(item => item.filter(num => num >= 20))
    .map(xs => first(xs))
    .fold(x => x / 2);

  return `The answer is ${res}`;
};

console.log(halfTheFirstLargeNumber([1, 4, 50])); // The answer is 25

const compose = (f, g) => x => Functor(x).map(g).fold(f);
