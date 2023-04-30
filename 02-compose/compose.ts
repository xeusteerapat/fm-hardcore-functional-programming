type Increment = (x: number) => number;

const increment: Increment = x => x + 1;

type ToString = (x: number) => string;
const toStringTs: ToString = x => `"${x}"`;

// Define function signature
type IncrementThenString = (x: number) => string;

const incrementThenString: IncrementThenString = x => toStringTs(increment(x));
console.log(incrementThenString(7)); // "8"

// Define compose function
type Compose = <A, B, C>(f: (x: B) => C, g: (x: A) => B) => (x: A) => C;

const composeTs: Compose = (f, g) => x => f(g(x));
const incrementThenStringWithCompose: IncrementThenString = composeTs(
  toStringTs,
  increment
);
console.log(incrementThenStringWithCompose(7)); // "8"
