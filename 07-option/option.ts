import { composeTs, Increment } from '../02-compose/compose';

type DivideTwo = (x: number) => number;
const divideTwo: DivideTwo = x => 2 / x;

console.log(divideTwo(8));
console.log(divideTwo(0));

const increment: Increment = x => x + 1;

const composed = composeTs(increment, divideTwo);
console.log(composed(8));
console.log(composed(0));

type Option<A> = Some<A> | None;

type Some<A> = {
  value: A;
  _tag: 'Some';
};

type None = {
  _tag: 'None';
};

// helper function
const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x });
const none: Option<never> = { _tag: 'None' };

const isNone = <A>(x: Option<A>): x is None => x._tag === 'None';

type DivideTwoWithOption = (x: number) => Option<number>;
const divideTwoWithOption: DivideTwoWithOption = x =>
  x === 0 ? none : some(2 / x);

const composedWithOption = composeTs(
  (x: Option<number>) => (isNone(x) ? none : some(increment(x.value))),
  divideTwoWithOption
);

console.log(composedWithOption(8)); // { _tag: 'Some', value: 1.25 }
console.log(composedWithOption(0)); // { _tag: 'None' }
