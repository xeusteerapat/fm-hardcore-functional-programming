const test = require('node:test');
const assert = require('node:assert/strict');
const { accumWithPipe } = require('./pipe');

test('Basic tests', function () {
  assert.strictEqual(
    accumWithPipe('ZpglnRxqenU'),
    'Z-Pp-Ggg-Llll-Nnnnn-Rrrrrr-Xxxxxxx-Qqqqqqqq-Eeeeeeeee-Nnnnnnnnnn-Uuuuuuuuuuu'
  );
  assert.strictEqual(
    accumWithPipe('NyffsGeyylB'),
    'N-Yy-Fff-Ffff-Sssss-Gggggg-Eeeeeee-Yyyyyyyy-Yyyyyyyyy-Llllllllll-Bbbbbbbbbbb'
  );
  assert.strictEqual(
    accumWithPipe('MjtkuBovqrU'),
    'M-Jj-Ttt-Kkkk-Uuuuu-Bbbbbb-Ooooooo-Vvvvvvvv-Qqqqqqqqq-Rrrrrrrrrr-Uuuuuuuuuuu'
  );
  assert.strictEqual(
    accumWithPipe('EvidjUnokmM'),
    'E-Vv-Iii-Dddd-Jjjjj-Uuuuuu-Nnnnnnn-Oooooooo-Kkkkkkkkk-Mmmmmmmmmm-Mmmmmmmmmmm'
  );
  assert.strictEqual(
    accumWithPipe('HbideVbxncC'),
    'H-Bb-Iii-Dddd-Eeeee-Vvvvvv-Bbbbbbb-Xxxxxxxx-Nnnnnnnnn-Cccccccccc-Ccccccccccc'
  );
});
