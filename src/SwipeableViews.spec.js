/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import SwipeableViews from '../src/SwipeableViews';

describe('SwipeableViews', () => {
  describe('props: children', () => {
    it('should render the children', () => {
      const wrapper = mount(
        <SwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
          <div>{'slide n°4'}</div>
          <div>{'slide n°5'}</div>
        </SwipeableViews>
      );

      assert.strictEqual(
        wrapper.text(),
        'slide n°1slide n°2slide n°3slide n°4slide n°5',
        'Should render each slide.'
      );
    });
  });

  describe('props: onTouchStart', () => {
    it('should trigger when we bind it', () => {
      const handleTouchStart = spy();
      const wrapper = mount(
        <SwipeableViews onTouchStart={handleTouchStart}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>
      );

      wrapper.simulate('touchStart', {
        touches: [{}],
      });
      assert.strictEqual(handleTouchStart.callCount, 1, 'Should be called');
    });

    it('should trigger when we disable the swipe', () => {
      const handleTouchStart = spy();
      const wrapper = mount(
        <SwipeableViews disable={true} onTouchStart={handleTouchStart}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>
      );

      wrapper.simulate('touchStart', {
        touches: [{}],
      });
      assert.strictEqual(handleTouchStart.callCount, 1, 'Should be called');
    });
  });

  describe('props: onTouchEnd', () => {
    it('should trigger when we bind it', () => {
      const handleTouchEnd = spy();
      const wrapper = mount(
        <SwipeableViews onTouchEnd={handleTouchEnd}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>
      );

      wrapper.simulate('touchEnd');
      assert.strictEqual(handleTouchEnd.callCount, 1, 'Should be called');
    });
  });
});
