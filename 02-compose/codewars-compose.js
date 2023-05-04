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
