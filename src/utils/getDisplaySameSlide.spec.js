// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import SwipeableViews from '../SwipeableViews';
import getDisplaySameSlide from './getDisplaySameSlide';

describe('getDisplaySameSlide', () => {
  it('should return false if there is no key', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div>{'slide n°1'}</div>
        <div>{'slide n°2'}</div>
        <div>{'slide n°3'}</div>
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div>{'slide n°2'}</div>
        <div>{'slide n°3'}</div>
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), false);
  });

  it('should return true if we display the same slide', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), true);
  });

  it('should return false if we do not display the same slide', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), false);
  });
});
