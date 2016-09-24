// @flow weak

import React from 'react';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import {assert} from 'chai';
import autoPlay from './autoPlay';

const Empty = () => <div />;
const AutoPlaySwipeableViews = autoPlay(Empty);

describe('autoPlay', () => {
  describe('prop: children', () => {
    it('should start at the beginning', () => {
      const wrapper = shallow(
        <AutoPlaySwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </AutoPlaySwipeableViews>
      );

      assert.strictEqual(wrapper.state('index'), 0, 'Should start at the beginning.');
    });
  });

  describe('prop: onChangeIndex', () => {
    it('should be called with the right arguments', () => {
      const handleChangeIndex = spy();
      const wrapper = shallow(
        <AutoPlaySwipeableViews onChangeIndex={handleChangeIndex}>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </AutoPlaySwipeableViews>
      );

      wrapper.find(Empty).simulate('changeIndex', 1, 0);
      assert.deepEqual(handleChangeIndex.args, [
        [1, 0],
      ]);
      assert.strictEqual(wrapper.state().index, 0, 'should not update the state index');
    });
  });

  describe('uncontrolled', () => {
    it('should update the state index when swiping', () => {
      const wrapper = shallow(
        <AutoPlaySwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </AutoPlaySwipeableViews>
      );
      wrapper.find(Empty).simulate('changeIndex', 1, 0);
      assert.strictEqual(wrapper.state().index, 1, 'should update the state index');
    });
  });

  let wrapper;

  describe('interval', () => {
    afterEach(() => {
      wrapper.unmount(); // Unmount to clear the setInterval of the autoPlay HOC.
    });

    describe('prop: interval', () => {
      it('should be able to update the interval', (done) => {
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>
        );

        // Disturb the interval.
        setTimeout(() => {
          assert.strictEqual(wrapper.state('index'), 1, 'Should have the right index.');
          wrapper.update();
        }, 150);

        setTimeout(() => {
          assert.strictEqual(wrapper.state('index'), 2, 'Should have the right index.');
          wrapper.setProps({
            interval: 200,
          });
        }, 250);

        setTimeout(() => {
          assert.strictEqual(wrapper.state('index'), 2, 'Should have the right index.');
          done();
        }, 400);
      });
    });

    describe('prop: direction', () => {
      it('should increment the index', (done) => {
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>
        );

        setTimeout(() => {
          assert.strictEqual(wrapper.state('index'), 2, 'Should have the right index.');
          done();
        }, 250);
      });

      it('should decrement the index', (done) => {
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100} direction="decremental">
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>
        );

        setTimeout(() => {
          assert.strictEqual(wrapper.state('index'), 3, 'Should have the right index.');
          done();
        }, 250);
      });
    });

    describe('prop: onChangeIndex', () => {
      it('should be called each time by the interval', (done) => {
        const handleChangeIndex = spy();
        wrapper = mount(
          <AutoPlaySwipeableViews interval={100} onChangeIndex={handleChangeIndex}>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
            <div>{'slide n°4'}</div>
            <div>{'slide n°5'}</div>
          </AutoPlaySwipeableViews>
        );

        setTimeout(() => {
          assert.strictEqual(handleChangeIndex.callCount, 2, 'Should be called the right number of time.');
          assert.deepEqual(handleChangeIndex.args, [
            [1, 0],
            [1, 0],
          ]);
          done();
        }, 250);
      });
    });

    describe('prop: slideCount', (done) => {
      it('should use the slideCount to compute the index limit', () => {
        wrapper = shallow(
          <AutoPlaySwipeableViews>
            <div>{'slide n°1'}</div>
            <div>{'slide n°2'}</div>
            <div>{'slide n°3'}</div>
          </AutoPlaySwipeableViews>
        );
        wrapper.setProps({
          index: 1,
          slideCount: 2,
          interval: 100,
        });

        setTimeout(() => {
          assert.strictEqual(wrapper.state('index'), 0, 'Should go back to the beginning.');
          done();
        }, 150);
      });
    });
  });
});
