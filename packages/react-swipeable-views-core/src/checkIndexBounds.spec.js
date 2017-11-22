/* eslint-disable no-console */

import React from 'react';
import { stub } from 'sinon';
import { assert } from 'chai';
import checkIndexBounds from './checkIndexBounds';

describe('checkIndexBounds', () => {
  let children;
  let consoleStub;

  beforeEach(() => {
    children = [<div key="1" />, <div key="2" />];
    consoleStub = stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  it('should not warn when the index is in the bounds', () => {
    checkIndexBounds({
      index: 0,
      children,
    });
    assert.strictEqual(consoleStub.callCount, 0);
  });

  it('should warn when the index is out of bounds', () => {
    checkIndexBounds({
      index: 3,
      children,
    });
    assert.strictEqual(consoleStub.callCount, 1);
    assert.strictEqual(
      consoleStub.args[0][0],
      'Warning: react-swipeable-view: the new index: 3 is out of bounds: [0-2].',
    );
  });
});
