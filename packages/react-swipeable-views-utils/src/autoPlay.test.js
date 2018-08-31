import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';
import { assert } from 'chai';
import autoPlay from './autoPlay';

const Empty = () => <div />;
const AutoPlaySwipeableViews = autoPlay(Empty);

describe('autoPlay', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount(); // Unmount to clear the setInterval of the autoPlay HOC.
  });

  describe('static', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AutoPlaySwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </AutoPlaySwipeableViews>,
      );
    });

    describe('prop: children', () => {
      it('should start at the beginning', () => {
        assert.strictEqual(wrapper.state().index, 0, 'Should start at the beginning.');
      });
    });

    describe('prop: onChangeIndex', () => {
      it('should be called with the right arguments', () => {
        const handleChangeIndex = spy();
        wrapper.setProps({
          index: 0,
          onChangeIndex: handleChangeIndex,
        });
        wrapper.find(Empty).simulate('changeIndex', 1, 0);
        assert.deepEqual(handleChangeIndex.args, [[1, 0]]);
        assert.strictEqual(wrapper.state().index, 0, 'should not update the state index');
      });
    });

    describe('uncontrolled', () => {
      it('should update the state index when swiping', () => {
        wrapper.find(Empty).simulate('changeIndex', 1, 0);
        assert.strictEqual(wrapper.state().index, 1, 'should update the state index');
      });
    });
  });

  describe('interval', () => {
    describe('prop: interval', () => {
      let clock;

      before(() => {
        clock = useFakeTimers();
      });

      after(() => {
        clock.restore();
      });

      it('should be able to update the interval', () => {
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>,
        );

        // Disturb the interval.
        clock.tick(150);

        wrapper.setProps({
          interval: 200,
        });

        assert.strictEqual(wrapper.state().index, 1, 'Should have the right index.');

        clock.tick(250);
        assert.strictEqual(wrapper.state().index, 2, 'Should have the right index.');
        wrapper.setProps({
          interval: 200,
        });

        clock.tick(400);
        assert.strictEqual(wrapper.state().index, 4, 'Should have the right index.');
      });
    });

    describe('prop: direction', () => {
      it('should increment the index', done => {
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>,
        );

        setTimeout(() => {
          assert.strictEqual(wrapper.state().index, 2, 'Should have the right index.');
          done();
        }, 250);
      });

      it('should decrement the index', done => {
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100} direction="decremental">
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>,
        );

        setTimeout(() => {
          assert.strictEqual(wrapper.state().index, 3, 'Should have the right index.');
          done();
        }, 250);
      });
    });

    describe('prop: onChangeIndex', () => {
      it('should be called each time by the interval', done => {
        const handleChangeIndex = spy();
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100} onChangeIndex={handleChangeIndex}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>,
        );

        setTimeout(() => {
          assert.strictEqual(
            handleChangeIndex.callCount,
            2,
            'Should be called the right number of time.',
          );
          assert.deepEqual(handleChangeIndex.args, [[1, 0], [2, 1]]);
          done();
        }, 250);
      });
    });

    describe('prop: slideCount', () => {
      it('should use the slideCount to compute the index limit', done => {
        wrapper = mount(
          <AutoPlaySwipeableViews slideCount={2} interval={100}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
          </AutoPlaySwipeableViews>,
        );

        setTimeout(() => {
          assert.strictEqual(wrapper.state().index, 0, 'Should go back to the beginning.');
          done();
        }, 250);
      });
    });

    describe('prop: autoplay', () => {
      it('should not increment when disabled', done => {
        wrapper = mount(
          <AutoPlaySwipeableViews autoplay interval={100}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
          </AutoPlaySwipeableViews>,
        );

        setTimeout(() => {
          assert.strictEqual(wrapper.state().index, 1);

          wrapper.setProps({
            autoplay: false,
          });
        }, 150);

        setTimeout(() => {
          assert.strictEqual(wrapper.state().index, 1);

          done();
        }, 300);
      });
    });
  });
});
