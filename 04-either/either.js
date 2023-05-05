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

const fs = require('fs');

// Traditional approach
const getPort_ = () => {
  try {
    const str = fs.readFileSync('config.json');
    const config = JSON.parse(str);

    return config.port;
  } catch (e) {
    return 3000;
  }
};

const tryCatch = fn => {
  try {
    return Right(fn());
  } catch (error) {
    return Left(error);
  }
};

const getPort = () =>
  tryCatch(() => fs.readFileSync(__dirname + '/config.json'))
    .map(content => JSON.parse(content))
    .map(config => config.port)
    .fold(
      () => 8080, // if something went wrong, then use 8080
      port => port
    );

const resultGetPort = getPort();
console.log(resultGetPort); // 3000
