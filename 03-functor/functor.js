/**
  Functor (or a Box in code) is a container that holds an object that is mapped over,
  Functor alone doesn't do much. It basically captures something in a context.
  We can keep mapping, and folding, and composing in different ways around it.
  As we'll see, there are stronger things than Box.
  They will give us behaviors associated with composition and new ways to compose.
  This is good practice to work on something as simple as a structure as Box that has no added behaviors,
  and we can practice composing with it.
*/
const Box = x => ({
  map: fn => Box(fn(x)),
  fold: fn => fn(x),
});

const nextCharForNumberString_ = str => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

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
