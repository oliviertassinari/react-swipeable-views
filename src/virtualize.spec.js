// @flow weak
/* eslint-disable react/no-multi-comp */

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import virtualize from './virtualize';

const Empty = () => <div />;
const VirtualizeSwipeableViews = virtualize(Empty);
const slideRenderer = (params) => {
  const {key} = params;

  return <div key={key} />;
};

describe('virtualize', () => {
  describe('window', () => {
    it('should use a correct window when mounting', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
      );

      assert.deepEqual(wrapper.state(), {
        index: 0,
        indexContainer: 3,
        indexStart: -3,
        indexStop: 2,
      });
    });

    it('should update the state when swipping forward', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
      );

      wrapper.find(Empty).simulate('changeIndex', 4, 3);

      assert.deepEqual(wrapper.state(), {
        index: 1,
        indexContainer: 4,
        indexStart: -3,
        indexStop: 3,
      });

      wrapper.instance().setWindow();
      wrapper.instance().componentWillUnmount();

      assert.deepEqual(wrapper.state(), {
        index: 1,
        indexContainer: 3,
        indexStart: -2,
        indexStop: 3,
      });
    });

    it('should update the state when swipping backward', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
      );

      wrapper.find(Empty).simulate('changeIndex', 2, 3);

      assert.deepEqual(wrapper.state(), {
        index: -1,
        indexContainer: 2,
        indexStart: -3,
        indexStop: 2,
      });

      wrapper.instance().setWindow();
      wrapper.instance().componentWillUnmount();

      assert.deepEqual(wrapper.state(), {
        index: -1,
        indexContainer: 3,
        indexStart: -4,
        indexStop: 1,
      });
    });
  });

  describe('prop: slideCount', () => {
    it('should use a correct window when mounting', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} slideCount={10} />
      );

      assert.deepEqual(wrapper.state(), {
        index: 0,
        indexContainer: 0,
        indexStart: 0,
        indexStop: 2,
      });
    });

    it('should update the state when swipping forward', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} slideCount={10} />
      );

      wrapper.find(Empty).simulate('changeIndex', 1, 0);

      assert.deepEqual(wrapper.state(), {
        index: 1,
        indexContainer: 1,
        indexStart: 0,
        indexStop: 3,
      });

      wrapper.instance().setWindow();
      wrapper.instance().componentWillUnmount();

      assert.deepEqual(wrapper.state(), {
        index: 1,
        indexContainer: 1,
        indexStart: 0,
        indexStop: 3,
      });
    });

    it('should no go behond the bounds', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} index={8} slideCount={10} />
      );

      wrapper.find(Empty).simulate('changeIndex', 4, 3);

      assert.deepEqual(wrapper.state(), {
        index: 9,
        indexContainer: 4,
        indexStart: 5,
        indexStop: 9,
      });

      wrapper.instance().setWindow();
      wrapper.instance().componentWillUnmount();

      assert.deepEqual(wrapper.state(), {
        index: 9,
        indexContainer: 3,
        indexStart: 6,
        indexStop: 9,
      });
    });

    it('should work with a small slideCount', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} slideCount={3} />
      );

      assert.deepEqual(wrapper.state(), {
        index: 0,
        indexContainer: 0,
        indexStart: 0,
        indexStop: 2,
      });
    });
  });

  describe('prop: index', () => {
    it('should be able to control the component', () => {
      const wrapper = shallow(
        <VirtualizeSwipeableViews index={1} slideRenderer={slideRenderer} />
      );

      assert.deepEqual(wrapper.state(), {
        index: 1,
        indexContainer: 3,
        indexStart: -2,
        indexStop: 3,
      });

      wrapper.setProps({
        index: 3,
      });

      assert.deepEqual(wrapper.state(), {
        index: 3,
        indexContainer: 5,
        indexStart: -2,
        indexStop: 4,
      });

      wrapper.instance().setWindow();
      wrapper.instance().componentWillUnmount();

      assert.deepEqual(wrapper.state(), {
        index: 3,
        indexContainer: 3,
        indexStart: 0,
        indexStop: 5,
      });
    });
  });
});
