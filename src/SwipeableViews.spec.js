/* eslint-disable flowtype/require-valid-file-annotation */
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
    it('should use a spring if animateTransitions is true', () => {
      const wrapper = shallow(
        <SwipeableViews>
          <div>{'slide n°1'}</div>
        </SwipeableViews>
      );

      assert.deepEqual(wrapper.find(Motion).at(0).props().style, {
        translate: {
          damping: 30,
          precision: 0.01,
          stiffness: 300,
          val: 0,
        },
        height: 0,
      });
    });

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
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
        </SwipeableViews>
      );

      wrapper.simulate('touchStart', {
        touches: [{
          pageX: 50,
          pageY: 50,
        }],
      });
      instance = wrapper.instance();
      instance.viewLength = 200;
    });

    it('should not detect a swipe when scrolling', () => {
      wrapper.simulate('touchMove', {
        touches: [{
          pageX: 50,
          pageY: 60,
        }],
      });
      assert.strictEqual(instance.isSwiping, false, 'Should not detect a swipe');
    });

    it('should detect a swipe when doing a clear movement', () => {
      wrapper.simulate('touchMove', {
        touches: [{
          pageX: 60,
          pageY: 50,
        }],
        preventDefault: () => {},
      });
      assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });

    it('should wait for a clear movement to detect a swipe', () => {
      wrapper.simulate('touchMove', {
        touches: [{
          pageX: 48,
          pageY: 50,
        }],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      wrapper.simulate('touchMove', {
        touches: [{
          pageX: 50,
          pageY: 48,
        }],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      wrapper.simulate('touchMove', {
        touches: [{
          pageX: 40,
          pageY: 50,
        }],
        preventDefault: () => {},
      });
      assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });
  });

  describe('nested views', () => {
    let wrapperParent;
    let wrapperNester;

    beforeEach(() => {
      wrapperParent = mount(
        <SwipeableViews index={1}>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </SwipeableViews>
      );

      wrapperNester = mount(
        <SwipeableViews index={0}>
          <div>{'slide n°4'}</div>
          <div>{'slide n°5'}</div>
          <div>{'slide n°6'}</div>
        </SwipeableViews>
      );

      const touchStartEvent = {
        touches: [{
          pageX: 50,
          pageY: 0,
        }],
      };

      wrapperNester.simulate('touchStart', touchStartEvent);
      wrapperParent.simulate('touchStart', touchStartEvent);

      const instance1 = wrapperParent.instance();
      instance1.viewLength = 200;

      const instance2 = wrapperNester.instance();
      instance2.viewLength = 200;
    });

    afterEach(() => {
      wrapperNester.simulate('touchEnd');
      wrapperParent.simulate('touchEnd');
    });

    it('only the nested swipe should respond to the touch', () => {
      const touchMoveEvent1 = {
        touches: [{
          pageX: 45,
          pageY: 0,
        }],
      };

      wrapperNester.simulate('touchMove', touchMoveEvent1);
      wrapperParent.simulate('touchMove', touchMoveEvent1);

      const touchMoveEvent2 = {
        touches: [{
          pageX: 40,
          pageY: 0,
        }],
      };

      wrapperNester.simulate('touchMove', touchMoveEvent2);
      wrapperParent.simulate('touchMove', touchMoveEvent2);

      assert.strictEqual(wrapperNester.state().indexCurrent, 0.025);
      assert.strictEqual(wrapperParent.state().indexCurrent, 1);
    });

    it('only the parent swipe should respond to the touch', () => {
      const touchMoveEvent1 = {
        touches: [{
          pageX: 55,
          pageY: 0,
        }],
      };

      wrapperNester.simulate('touchMove', touchMoveEvent1);
      wrapperParent.simulate('touchMove', touchMoveEvent1);

      const touchMoveEvent2 = {
        touches: [{
          pageX: 60,
          pageY: 0,
        }],
      };

      wrapperNester.simulate('touchMove', touchMoveEvent2);
      wrapperParent.simulate('touchMove', touchMoveEvent2);

      assert.strictEqual(wrapperNester.state().indexCurrent, 0);
      assert.strictEqual(wrapperParent.state().indexCurrent, 0.975);
    });
  });
});
