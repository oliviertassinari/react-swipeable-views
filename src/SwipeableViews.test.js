import React from 'react';
import { mount, shallow } from 'enzyme';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import SwipeableViews, { findNativeHandler, getDomTreeShapes } from './SwipeableViews';

function simulateSwipeMove(wrapper, event) {
  return wrapper.instance().handleSwipeMove({
    preventDefault: () => {},
    ...event,
  });
}

function noop() {}

describe('SwipeableViews', () => {
  describe('prop: children', () => {
    it('should render the children', () => {
      const wrapper = mount(
        <SwipeableViews disableLazyLoading>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
          <div>{'slide n°4'}</div>
          <div>{'slide n°5'}</div>
        </SwipeableViews>,
      );

      assert.strictEqual(wrapper.text(), 'slide n°1slide n°2slide n°3slide n°4slide n°5');
    });
  });

  describe('prop: hysteresis', () => {
    function createWrapper(hysteresis) {
      const wrapper = mount(
        <SwipeableViews hysteresis={hysteresis} onChangeIndex={spy()}>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
        </SwipeableViews>,
      );

      wrapper.simulate('touchStart', {
        touches: [
          {
            pageX: 155,
            pageY: 50,
          },
        ],
      });
      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 150,
            pageY: 50,
          },
        ],
      });
      const instance = wrapper.instance();
      instance.viewLength = 200;
      return wrapper;
    }

    it('should not change slide when swipe was not enough', () => {
      const wrapper = createWrapper();
      const instance = wrapper.instance();

      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 80,
            pageY: 50,
          },
        ],
      });
      instance.vx = 0;
      wrapper.simulate('touchEnd');
      assert.strictEqual(instance.indexCurrent, 0);
    });

    it('should change slide after long swipe', () => {
      const wrapper = createWrapper();
      const instance = wrapper.instance();

      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 20,
            pageY: 50,
          },
        ],
      });

      instance.vx = 0;
      wrapper.simulate('touchEnd');
      assert.strictEqual(instance.indexCurrent, 1);
      assert.deepEqual(wrapper.props().onChangeIndex.args, [
        [
          1,
          0,
          {
            reason: 'swipe',
          },
        ],
      ]);
    });

    it('should change slider hysteresis via prop', () => {
      const wrapper = createWrapper(0.3);
      const instance = wrapper.instance();

      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 80,
            pageY: 50,
          },
        ],
      });

      instance.vx = 0;
      wrapper.simulate('touchEnd');
      assert.strictEqual(instance.indexCurrent, 1);
    });
  });

  describe('prop: onTouchStart', () => {
    it('should trigger when we bind it', () => {
      const handleTouchStart = spy();
      const wrapper = mount(
        <SwipeableViews onTouchStart={handleTouchStart}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>,
      );

      wrapper.simulate('touchStart', {
        touches: [{}],
      });
      assert.strictEqual(handleTouchStart.callCount, 1);
    });

    it('should trigger when we disable the swipe', () => {
      const handleTouchStart = spy();
      const wrapper = mount(
        <SwipeableViews disabled onTouchStart={handleTouchStart}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>,
      );

      wrapper.simulate('touchStart', {
        touches: [{}],
      });
      assert.strictEqual(handleTouchStart.callCount, 1);
    });
  });

  describe('prop: onTouchEnd', () => {
    it('should trigger when we bind it', () => {
      const handleTouchEnd = spy();
      const wrapper = mount(
        <SwipeableViews onTouchEnd={handleTouchEnd}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>,
      );

      wrapper.simulate('touchEnd');
      assert.strictEqual(handleTouchEnd.callCount, 1);
    });
  });

  describe('prop: animateTransitions', () => {
    it('should use a spring if animateTransitions is true', () => {
      const wrapper = mount(
        <SwipeableViews disableLazyLoading>
          <div>{'slide n°1'}</div>
        </SwipeableViews>,
      );

      wrapper.setProps({
        index: 1,
      });

      assert.include(
        wrapper
          .childAt(0)
          .childAt(0)
          .props().style,
        {
          WebkitFlexDirection: 'row',
          transform: 'translate(-100%, 0)',
          WebkitTransform: 'translate(-100%, 0)',
          WebkitTransition: '-webkit-transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
          transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
        },
      );
    });

    it('should not use a spring if animateTransitions is false', () => {
      const wrapper = shallow(
        <SwipeableViews animateTransitions={false} index={1} onTransitionEnd={noop}>
          <div>{'slide n°1'}</div>
        </SwipeableViews>,
        { disableLifecycleMethods: true },
      );
      assert.include(
        wrapper
          .childAt(0)
          .childAt(0)
          .props().style,
        {
          transition: 'all 0s ease 0s',
        },
      );
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
        </SwipeableViews>,
      );

      wrapper.simulate('touchStart', {
        touches: [
          {
            pageX: 50,
            pageY: 50,
          },
        ],
      });
      instance = wrapper.instance();
      instance.viewLength = 200;
    });

    it('should not detect a swipe when scrolling', () => {
      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 50,
            pageY: 60,
          },
        ],
      });
      assert.strictEqual(instance.isSwiping, false, 'Should not detect a swipe');
    });

    it('should detect a swipe when doing a clear movement', () => {
      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 60,
            pageY: 50,
          },
        ],
      });
      assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });

    it('should wait for a clear movement to detect a swipe', () => {
      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 48,
            pageY: 50,
          },
        ],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 50,
            pageY: 48,
          },
        ],
      });
      assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 40,
            pageY: 50,
          },
        ],
      });
      assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });
  });

  describe('vertical swipe detection', () => {
    let instance;
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwipeableViews axis="y">
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
        </SwipeableViews>,
      );

      wrapper.simulate('touchStart', {
        touches: [
          {
            pageX: 50,
            pageY: 50,
          },
        ],
      });
      instance = wrapper.instance();
      instance.viewLength = 200;
    });

    it('should let the parent handle the swipe', () => {
      simulateSwipeMove(wrapper, {
        touches: [
          {
            pageX: 50,
            pageY: 51,
          },
        ],
      });
      assert.strictEqual(instance.isSwiping, false);
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
        </SwipeableViews>,
      );

      wrapperNester = mount(
        <SwipeableViews index={0}>
          <div>{'slide n°4'}</div>
          <div>{'slide n°5'}</div>
          <div>{'slide n°6'}</div>
        </SwipeableViews>,
      );

      const touchStartEvent = {
        touches: [
          {
            pageX: 50,
            pageY: 0,
          },
        ],
      };

      wrapperNester.simulate('touchStart', touchStartEvent);
      wrapperParent.simulate('touchStart', touchStartEvent);

      const instance1 = wrapperParent.instance();
      instance1.viewLength = 200;
      instance1.startIndex = 1;

      const instance2 = wrapperNester.instance();
      instance2.viewLength = 200;
    });

    afterEach(() => {
      wrapperNester.simulate('touchEnd');
      wrapperParent.simulate('touchEnd');
    });

    it('only the nested swipe should respond to the touch', () => {
      const touchMoveEvent1 = {
        touches: [
          {
            pageX: 45,
            pageY: 0,
          },
        ],
      };
      const instanceNester = wrapperNester.instance();
      const instanceParent = wrapperParent.instance();

      simulateSwipeMove(wrapperNester, touchMoveEvent1);
      simulateSwipeMove(wrapperParent, touchMoveEvent1);

      const touchMoveEvent2 = {
        touches: [
          {
            pageX: 40,
            pageY: 0,
          },
        ],
      };

      simulateSwipeMove(wrapperNester, touchMoveEvent2);
      simulateSwipeMove(wrapperParent, touchMoveEvent2);

      assert.strictEqual(instanceNester.indexCurrent, 0.025);
      assert.strictEqual(instanceParent.indexCurrent, 1);
    });

    it('only the parent swipe should respond to the touch', () => {
      const touchMoveEvent1 = {
        touches: [
          {
            pageX: 55,
            pageY: 0,
          },
        ],
      };
      const instanceNester = wrapperNester.instance();
      const instanceParent = wrapperParent.instance();

      simulateSwipeMove(wrapperNester, touchMoveEvent1);
      simulateSwipeMove(wrapperParent, touchMoveEvent1);

      const touchMoveEvent2 = {
        touches: [
          {
            pageX: 60,
            pageY: 0,
          },
        ],
      };

      simulateSwipeMove(wrapperNester, touchMoveEvent2);
      simulateSwipeMove(wrapperParent, touchMoveEvent2);

      assert.strictEqual(instanceNester.indexCurrent, 0);
      assert.strictEqual(instanceParent.indexCurrent, 0.975);
    });
  });

  describe('prop: index', () => {
    it('should only update the state when the index change', () => {
      const wrapper = mount(
        <SwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
        </SwipeableViews>,
      );
      const instance = wrapper.instance();
      assert.strictEqual(instance.indexCurrent, 0, 'should start at the begining');

      wrapper.setProps({
        index: 1,
      });
      assert.strictEqual(instance.indexCurrent, 1, 'should update the state');

      instance.indexCurrent = 0;
      wrapper.setProps({
        index: 1,
      });
      assert.strictEqual(instance.indexCurrent, 0, 'should keep the same state');
    });
  });

  describe('findNativeHandler', () => {
    it('should work in a simple case', () => {
      const hasFoundNativeHandler = findNativeHandler({
        domTreeShapes: [
          {
            scrollLeft: 0,
            scrollWidth: 200,
            clientWidth: 100,
          },
        ],
        indexCurrent: 1,
        index: 1.1,
        axis: 'x',
      });

      assert.strictEqual(hasFoundNativeHandler, true);
    });

    it('should work with different axis', () => {
      const hasFoundNativeHandler = findNativeHandler({
        domTreeShapes: [
          {
            scrollTop: 0,
            scrollHeight: 100,
            clientHeight: 100,
          },
        ],
        indexCurrent: 1,
        index: 1.1,
        axis: 'y',
      });

      assert.strictEqual(hasFoundNativeHandler, false);
    });
  });

  describe('getDomTreeShapes', () => {
    beforeEach(() => {
      stub(window, 'getComputedStyle').returns({
        getPropertyValue: () => {
          return '';
        },
      });
    });

    afterEach(() => {
      window.getComputedStyle.restore();
    });

    it('should stop at the data-swipeable attribute', () => {
      const rootNode = {};

      const optionNode = {
        hasAttribute: () => true,
        parentNode: rootNode,
      };

      const targetNode = {
        hasAttribute: () => false,
        parentNode: optionNode,
        clientWidth: 10,
        scrollWidth: 20,
        style: {},
      };

      const domTreeShapes = getDomTreeShapes(targetNode, optionNode);

      assert.strictEqual(domTreeShapes.length, 1);
      assert.strictEqual(domTreeShapes[0].clientWidth, 10);
    });
  });

  describe('prop: slideClassName', () => {
    it('should apply a className prop to every rendered slide component', () => {
      const Slide = () => <div />;
      const classNameToApply = 'someclassname';
      const wrapper = mount(
        <SwipeableViews slideClassName={classNameToApply}>
          <Slide />
          <Slide />
        </SwipeableViews>,
      );

      assert.strictEqual(
        wrapper
          .find(Slide)
          .everyWhere(slide => slide.parent().props().className === classNameToApply),
        true,
        'should apply the className prop',
      );
    });
  });

  describe('tabs', () => {
    it('should reset the scroll position and call onChangeIndex', () => {
      const handleScroll = spy();
      const handleChangeIndex = spy();
      const wrapper = shallow(
        <SwipeableViews index={1} onScroll={handleScroll} onChangeIndex={handleChangeIndex}>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </SwipeableViews>,
        { disableLifecycleMethods: true },
      );

      const rootNode = {
        scrollLeft: 80,
        clientWidth: 100,
      };
      wrapper.instance().rootNode = rootNode;
      wrapper.instance().handleScroll({
        target: rootNode,
      });
      assert.strictEqual(handleScroll.callCount, 1, 'should forward the event');
      assert.strictEqual(rootNode.scrollLeft, 0, 'should reset the scroll position');
      assert.strictEqual(handleChangeIndex.callCount, 1, 'should detect a new index');
      assert.deepEqual(handleChangeIndex.args[0], [2, 1, { reason: 'focus' }]);
    });
  });

  describe('prop: disableLazyLoading', () => {
    describe('false', () => {
      let clock;

      beforeEach(() => {
        clock = useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should render the right child', () => {
        const wrapper = shallow(
          <SwipeableViews index={1}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </SwipeableViews>,
          { disableLifecycleMethods: true },
        );

        assert.strictEqual(wrapper.text(), 'slide n°2');
        assert.shallowDeepEqual(
          wrapper
            .childAt(0)
            .childAt(0)
            .props().style,
          {
            transition: 'all 0s ease 0s',
            transform: undefined,
          },
        );
      });

      it('should render all the children during the second render', () => {
        const wrapper = mount(
          <SwipeableViews index={1}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </SwipeableViews>,
        );

        assert.strictEqual(wrapper.text(), 'slide n°2');
        clock.tick(1);
        wrapper.update();
        assert.strictEqual(wrapper.text(), 'slide n°1slide n°2slide n°3slide n°4slide n°5');
        assert.shallowDeepEqual(
          wrapper
            .childAt(0)
            .childAt(0)
            .props().style,
          {
            transition: 'all 0s ease 0s',
            transform: 'translate(-100%, 0)',
          },
        );
      });
    });

    describe('true', () => {
      it('should render the right child', () => {
        const wrapper = shallow(
          <SwipeableViews index={1} disableLazyLoading>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </SwipeableViews>,
          { disableLifecycleMethods: true },
        );

        assert.strictEqual(wrapper.text(), 'slide n°1slide n°2slide n°3slide n°4slide n°5');
        assert.shallowDeepEqual(
          wrapper
            .childAt(0)
            .childAt(0)
            .props().style,
          {
            transition: 'all 0s ease 0s',
            transform: 'translate(-100%, 0)',
          },
        );
      });
    });
  });

  describe('prop: action', () => {
    it('should be able to access updateHeight function', () => {
      let swipeableActions = {};
      mount(
        <SwipeableViews
          action={actions => {
            swipeableActions = actions;
          }}
        >
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </SwipeableViews>,
      );

      assert.strictEqual(
        typeof swipeableActions.updateHeight === 'function',
        true,
        'Should be a function.',
      );
      swipeableActions.updateHeight();
    });
  });
});
