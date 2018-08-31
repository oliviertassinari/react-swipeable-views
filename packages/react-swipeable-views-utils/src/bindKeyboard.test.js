import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import { spy } from 'sinon';
import keycode from 'keycode';
import bindKeyboard from './bindKeyboard';

const Empty = () => <div />;
const BindKeyboardSwipeableViews = bindKeyboard(Empty);

describe('bindKeyboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BindKeyboardSwipeableViews>
        <div>{'slide n°1'}</div>
        <div>{'slide n°2'}</div>
        <div>{'slide n°3'}</div>
      </BindKeyboardSwipeableViews>,
    );
  });

  describe('prop: children', () => {
    it('should start at the beginning', () => {
      assert.strictEqual(wrapper.state().index, 0, 'Should start at the beginning.');
    });
  });

  describe('prop: slideCount', () => {
    it('should use the slideCount to compute the index limit', () => {
      wrapper.setProps({
        slideCount: 2,
      });
      wrapper.simulate('keydown', {
        keyCode: keycode('right'),
      });
      assert.strictEqual(wrapper.state().index, 1, 'Should increment the index.');
      wrapper.simulate('keydown', {
        keyCode: keycode('right'),
      });
      assert.strictEqual(wrapper.state().index, 0, 'Should go back to the beginning.');
    });
  });

  describe('keyboard strokes', () => {
    it('should increment the index', () => {
      wrapper.simulate('keydown', {
        keyCode: keycode('right'),
      });

      assert.strictEqual(wrapper.state().index, 1, 'Should have the right index.');
    });

    it('should decrement the index using a modulo', () => {
      wrapper.simulate('keydown', {
        keyCode: keycode('left'),
      });

      assert.strictEqual(wrapper.state().index, 2, 'Should have the right index.');
    });
  });

  describe('prop: onChangeIndex', () => {
    it('should be called and with the right arguments when using the keyboard', () => {
      const handleChangeIndex = spy();

      wrapper.setProps({
        onChangeIndex: handleChangeIndex,
      });
      wrapper.simulate('keydown', {
        keyCode: keycode('right'),
      });

      assert.strictEqual(
        handleChangeIndex.callCount,
        1,
        'Should be called the right number of time.',
      );
      assert.deepEqual(handleChangeIndex.args, [[1, 0]]);
    });

    it('should be called with the right value when swiping', () => {
      const handleChangeIndex = spy();

      wrapper.setProps({
        index: 0,
        onChangeIndex: handleChangeIndex,
      });
      wrapper.find(Empty).simulate('changeIndex', 1, 0);
      assert.deepEqual(handleChangeIndex.args, [[1, 0]]);
      assert.strictEqual(wrapper.state().index, 0, 'should no update the state index');
    });
  });

  describe('uncontrolled', () => {
    it('should update the state index when swiping', () => {
      wrapper.setProps({});
      wrapper.find(Empty).simulate('changeIndex', 1, 0);
      assert.strictEqual(wrapper.state().index, 1, 'should update the state index');
    });
  });
});
