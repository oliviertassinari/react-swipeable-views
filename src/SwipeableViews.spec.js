/* eslint-env mocha */
import React from 'react';
import {mount, shallow} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import {Motion} from 'react-motion';

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
        <SwipeableViews disabled={true} onTouchStart={handleTouchStart}>
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

  describe('props: animateTransitions', () => {
    it('should not use a spring if animateTransitions is false', () => {
      const wrapper = shallow(
        <SwipeableViews animateTransitions={false}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>
      );

      assert.deepEqual(wrapper.find(Motion).at(0).props().style, {
        translate: 0,
        height: 0,
      });
    });
  });

  describe('swipe detection', () => {
    let instance;

    beforeEach(() => {
      const wrapper = mount(
        <SwipeableViews>
          <div>{'slide n°1'}</div>
        </SwipeableViews>
      );

      instance = wrapper.instance();
      instance.handleTouchStart({
        touches: [{
          pageX: 0,
          pageY: 0,
        }],
      });
      instance.startWidth = 100;
    });

    it('should not detect a swipe when scrolling', () => {
      instance.handleTouchMove({
        touches: [{
          pageX: 0,
          pageY: 10,
        }],
      });
      assert.strictEqual(instance.isSwiping, false, 'Should not detect a swipe');
    });

    it('should detect a swipe when doing a clear movement', () => {
      instance.handleTouchMove({
        touches: [{
          pageX: 10,
          pageY: 0,
        }],
        preventDefault: () => {},
      });
      assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });

    it('should wait for a clear movement to detect a swipe', () => {
      instance.handleTouchMove({
        touches: [{
          pageX: 2,
          pageY: 0,
        }],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      instance.handleTouchMove({
        touches: [{
          pageX: 0,
          pageY: 2,
        }],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      instance.handleTouchMove({
        touches: [{
          pageX: 0,
          pageY: 2,
        }],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      instance.handleTouchMove({
        touches: [{
          pageX: 10,
          pageY: 0,
        }],
        preventDefault: () => {},
      });
      assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });
  });
});
