type Curry = <A, B, C>(fn: (a: A, b: B) => C) => (a: A) => (b: B) => C;

const curryTs: Curry = fn => a => b => fn(a, b);
const sum = curryTs((a: number, b: number) => a + b);

console.log(sum(5)(7)); // 12
