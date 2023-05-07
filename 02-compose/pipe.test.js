const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { accumWithPipe } = require('./pipe');

describe('Test accumWithPipe', () => {
  it('Test case 1', () => {
    assert.strictEqual(
      accumWithPipe('ZpglnRxqenU'),
      'Z-Pp-Ggg-Llll-Nnnnn-Rrrrrr-Xxxxxxx-Qqqqqqqq-Eeeeeeeee-Nnnnnnnnnn-Uuuuuuuuuuu'
    );
  });

  it('Test case 2', () => {
    assert.strictEqual(
      accumWithPipe('NyffsGeyylB'),
      'N-Yy-Fff-Ffff-Sssss-Gggggg-Eeeeeee-Yyyyyyyy-Yyyyyyyyy-Llllllllll-Bbbbbbbbbbb'
    );
  });

  it('Test case 3', () => {
    assert.strictEqual(
      accumWithPipe('MjtkuBovqrU'),
      'M-Jj-Ttt-Kkkk-Uuuuu-Bbbbbb-Ooooooo-Vvvvvvvv-Qqqqqqqqq-Rrrrrrrrrr-Uuuuuuuuuuu'
    );
  });

  it('Test case 4', () => {
    assert.strictEqual(
      accumWithPipe('EvidjUnokmM'),
      'E-Vv-Iii-Dddd-Jjjjj-Uuuuuu-Nnnnnnn-Oooooooo-Kkkkkkkkk-Mmmmmmmmmm-Mmmmmmmmmmm'
    );
  });

  it('Test case 5', () => {
    assert.strictEqual(
      accumWithPipe('HbideVbxncC'),
      'H-Bb-Iii-Dddd-Eeeee-Vvvvvv-Bbbbbbb-Xxxxxxxx-Nnnnnnnnn-Cccccccccc-Ccccccccccc'
    );
  });
});
