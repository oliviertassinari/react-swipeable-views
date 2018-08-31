import React from 'react';
import { assert } from 'chai';
import computeIndex from './computeIndex';

describe('computeIndex', () => {
  let children;

  beforeEach(() => {
    children = [<div key="1" />, <div key="2" />, <div key="3" />];
  });

  it('should compute the next index correctly', () => {
    const actual = computeIndex({
      children,
      startIndex: 0,
      startX: 50,
      pageX: 10,
      viewLength: 100,
      resistance: false,
    }).index;

    assert.strictEqual(actual, 0.4);
  });

  describe('resistance', () => {
    it('should not allow to go beyound the bounds when false', () => {
      const actual = computeIndex({
        children,
        startIndex: 0,
        startX: 10,
        pageX: 50,
        viewLength: 100,
        resistance: false,
      }).index;

      assert.strictEqual(actual, 0);
    });

    it('should allow to go beyound the bounds when true', () => {
      const actual = computeIndex({
        children,
        startIndex: 0,
        startX: 10,
        pageX: 50,
        viewLength: 100,
        resistance: true,
      }).index;

      assert.closeTo(actual, -0.21, 0.05);
    });
  });
});
