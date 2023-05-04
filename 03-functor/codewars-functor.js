/**
  accum("abcd") -> "A-Bb-Ccc-Dddd"
  accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
  accum("cwAt") -> "C-Ww-Aaa-Tttt"
 * 
 */
function accum(s) {
  // 1. lowercase
  // 2. split
  // 3. getOrderOfLetter (charAt)
  // 4. repeat based on order
  // 5. Get title case
  // 6. Join with "-"
  const Functor = x => ({
    map: fn => Functor(fn(x)),
    fold: fn => fn(x),
  });

  const result = Functor(s)
    .map(str => str.toLowerCase())
    .map(str => str.split(''))
    .map(arr => arr.map((item, idx) => ({ char: item, order: idx + 1 })))
    .map(arr => arr.map(item => item.char.repeat(item.order)))
    .map(arr => arr.map(item => item.replace(item[0], item[0].toUpperCase())))
    .map(arr => arr.join('-'))
    .fold(result => result);

  return result;
}

console.log(accum('abcd'));
console.log(accum('RqaEzty'));
console.log(accum('cwAt'));
