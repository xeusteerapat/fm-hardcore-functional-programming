// Semi-groups
//!TODO: Need to re-visit this

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => 'Sum(${x})',
});

const All = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => 'Sum(${x})',
});

const First = x => ({
  x,
  concat: ({ x: y }) => First(x + y),
  inspect: () => 'First(${x})',
});

const { Map } = require('immutable-ext');

const acct1 = Map({
  name: First('Nico'),
  isPaid: All(true),
  points: Sum(10),
  friends: ['Franklin'],
});

const acc2 = Map({
  name: First('Nico'),
  isPaid: All(true),
  points: Sum(10),
  friends: ['Gatsby'],
});

const res = acct1.concat(acc2);
console.log(res.toJS());
