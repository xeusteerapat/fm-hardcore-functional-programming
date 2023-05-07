const pipe =
  (...args) =>
  x => {
    return args.reduce((acc, curr) => curr(acc), x);
  };

const accumWithPipe = str => {
  const result = pipe(
    str => str.toLowerCase(),
    str => str.split(''),
    arr => arr.map((item, idx) => ({ char: item, order: idx + 1 })),
    arr => arr.map(item => item.char.repeat(item.order)),
    arr => arr.map(item => item.replace(item[0], item[0].toUpperCase())),
    arr => arr.join('-')
  );

  return result(str);
};

module.exports = {
  accumWithPipe,
};

console.log(accumWithPipe('abcd'));
console.log(accumWithPipe('RqaEzty'));
console.log(accumWithPipe('cwAt'));
