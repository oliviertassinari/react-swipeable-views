import { assert } from 'chai';
import mod from './mod';

describe('mod', () => {
  it('should work when the integer is zero', () => {
    assert.strictEqual(mod(0, 4), 0);
  });

  it('should work when the integer is withing the bounds', () => {
    assert.strictEqual(mod(1, 4), 1);
  });

  it('should work when the integer is above the bounds', () => {
    assert.strictEqual(mod(-1, 4), 3);
  });

  it('should work when the integer is under the bounds', () => {
    assert.strictEqual(mod(6, 4), 2);
  });
});
