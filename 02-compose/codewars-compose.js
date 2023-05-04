function toCamelCase(str) {
  const compose = (f, g) => x => f(g(x));

  const splitWord = str => str.split(/[_-]/g);

  const toTitleCase = arr =>
    arr.map((word, idx) => {
      if (idx === 0) {
        return word;
      } else {
        return word.replace(word[0], word[0].toUpperCase());
      }
    });

  const composed = compose(toTitleCase, splitWord);

  const result = composed(str);
  return result.join('');
}

console.log(toCamelCase('the-stealth-warrior'));
console.log(toCamelCase('The_Stealth_Warrior'));
console.log(toCamelCase('The_Stealth-Warrior'));

function squareDigits(num) {
  const toString = num => String(num);
  const splitToArr = str => str.split('');
  const powerArr = arr => arr.map(item => String(Math.pow(Number(item), 2)));

  const compose = (f, g, h) => x => f(g(h(x)));
  const composed = compose(powerArr, splitToArr, toString);

  const result = composed(num);
  return Number(result.join(''));
}

console.log(squareDigits(3212));
console.log(squareDigits(2112));
console.log(squareDigits(0));
