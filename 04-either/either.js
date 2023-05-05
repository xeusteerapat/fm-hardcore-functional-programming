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
const fromNullable = x => (x != null ? Right(x) : Left(null));

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

const readFile = path => tryCatch(() => fs.readFileSync(path));
const parseJSON = strContent => tryCatch(() => JSON.parse(strContent));

// Flattening Either Monads with Chain
const getPort = () =>
  readFile(__dirname + '/config.json')
    .chain(content => parseJSON(content))
    .map(config => config.port)
    .fold(
      () => 8080, // if something went wrong, then use 8080
      port => port
    );

const resultGetPort = getPort();
console.log(resultGetPort); // 3000

// Excercise
const getStreet = user =>
  fromNullable(user.address)
    .map(address => address.street)
    .fold(
      () => 'No street',
      street => street
    );

const xeus = { address: { street: { name: 'Ratchada' } } };
const dunno = {};
console.log(getStreet(xeus)); // { name: 'Ratchada' }
console.log(getStreet(dunno)); // 'No street',

const getStreetName = user =>
  fromNullable(user)
    .chain(user => fromNullable(user.address))
    .chain(address => fromNullable(address.street))
    .map(street => street.name)
    .fold(
      () => 'No street name',
      name => name
    );

console.log(getStreetName(xeus)); // Ratchada
console.log(getStreetName({ address: { street: null } })); // No street name

// next one
const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i;

const parseDbUrl_ = cfg => {
  try {
    const c = JSON.parse(cfg); // throws if it can't parse
    return c.url.match(DB_REGEX);
  } catch (e) {
    return null;
  }
};

const parseDbUrl = config =>
  tryCatch(() => JSON.parse(config))
    .map(content => content.url.match(DB_REGEX))
    .fold(
      () => 'Incorrect url',
      result => result
    );

const parseDbUrlWithChain = config =>
  Right(config)
    .chain(c => tryCatch(() => JSON.parse(c)))
    .map(content => content.url.match(DB_REGEX))
    .fold(
      () => null,
      result => result
    );

/**REVIEW - 
 * [
  'postgres://sally:muppets@localhost:5432/mydb',
  'sally',
  'muppets',
  'mydb',
  index: 0,
  input: 'postgres://sally:muppets@localhost:5432/mydb',
  groups: undefined
]

otherwise return null
 */
console.log(
  parseDbUrl('{"url": "postgres://sally:muppets@localhost:5432/mydb"}')
);
console.log(
  parseDbUrlWithChain('{"url": "postgres://sally:muppets@localhost:5432/mydb"}')
);
console.log(
  parseDbUrl('{"url": "postgres:/sally:muppets@localhost:5432/mydb"}')
);
console.log(
  parseDbUrlWithChain('{"url": "postgres://sallymuppets@localhost:5432/mydb"}')
);

const startApp = config =>
  fromNullable(parseDbUrl(config))
    .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
    .fold(
      () => `Incorrect configuration provided!`,
      result => result
    );

console.log(
  startApp('{"url": "postgres://sally:muppets@localhost:5432/mydb"}')
); // starting mydb, sally, muppets
console.log(startApp('{"url": "postgres//sally:muppets@localhost:5432/mydb"}')); // Incorrect configuration provided!

// Tracing with log
const logIt = x => {
  console.log(x);
  return x;
};

const parseDbUrlWithLog = config =>
  logIt(tryCatch(() => JSON.parse(config)))
    .map(content => content.url.match(DB_REGEX))
    .fold(
      () => 'Incorrect url',
      result => result
    );

parseDbUrlWithLog('{"url": "postgres://sally:muppets@localhost:5432/mydb"}');
