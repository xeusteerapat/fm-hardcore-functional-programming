/**
 * Basic idea of compose, f . g = f(g(x))
 * Function composition returns a new function
 * 
  const compose = (f, g) => {
    return (x) => {
      return f(g(x))
    }
  }
 * @param {f} Function f 
 * @param {f} Function g
 * @returns {f} Function f(g(x));
 */
const compose = (f, g) => x => f(g(x));

/**
 *
 * @param {*} str
 * @returns
 */
const toUpper = str => str.toUpperCase();
const bangg = str => str + '!!!';
const first = arr => arr[0];

const shout = compose(bangg, toUpper); // compose = (x) => bang(toUpper(x))

console.log(shout('hello'));

const getFirstLetter = compose(first, compose(bangg, toUpper));
console.log(getFirstLetter('sawaddee')); // S

const R = require('ramda');

// pipe is kind of the opposite of the compose.
const getFirstLetterRamda = R.compose(first, bangg, toUpper);
const getFirstLetterRamdaPipe = R.pipe(toUpper, bangg, first);

console.log(getFirstLetterRamda('this is cool')); // T
console.log(getFirstLetterRamdaPipe('this is cool')); // T
