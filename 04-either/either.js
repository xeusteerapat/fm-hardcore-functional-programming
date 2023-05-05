// Left and Right are the sub-class of the Either type
const Left = x => ({
  chain: fn => Left(x),
  map: fn => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const Right = x => ({
  chain: fn => fn(x),
  map: fn => Right(fn(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

// FromNullable helper
const fromNullable = x => (x != null ? Right(x) : Left());

const findColor = name => {
  const found = {
    red: '#ff4444',
    green: '#00ff00',
    blue: '#3b5998',
  }[name];

  return found ? Right(found) : Left('Not found color! ❌');
};

console.log(
  findColor('red')
    .map(x => x.toUpperCase())
    .fold(
      () => 'Not found color! ❌',
      color => color
    )
); // 'Right(#FF4444)'
console.log(
  findColor('green')
    .map(x => x.toUpperCase())
    .fold(
      () => 'Not found color! ❌',
      color => color
    )
); // 'Right(#00FF00)'
console.log(
  findColor('blue')
    .map(x => x.toUpperCase())
    .fold(
      () => 'Not found color! ❌',
      color => color
    )
); // 'Right(#3B5998)'
console.log(
  findColor('redd')
    .map(x => x.toUpperCase())
    .fold(
      () => 'Not found color! 🙅🏻‍♂️',
      color => color
    )
); // 'Left(Not found color)'

// with fromNullable helper
const findColor_ = name =>
  fromNullable(
    {
      red: '#ff4444',
      green: '#00ff00',
      blue: '#3b5998',
    }[name]
  );
console.log(
  findColor_('red')
    .map(x => x.toUpperCase())
    .fold(
      () => 'Not found color! ❌',
      color => color
    )
); // #FF4444
console.log(
  findColor_('sdfsdfedg')
    .map(x => x.toUpperCase())
    .fold(
      () => 'Not found color! ❌',
      color => color
    )
); // Not found
