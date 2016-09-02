// @flow weak

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
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
      </BindKeyboardSwipeableViews>
    );
  });

  describe('props: children', () => {
    it('should start at the beginning', () => {
      assert.strictEqual(wrapper.state('index'), 0, 'Should start at the beginning.');
    });
  });

  describe('keyboard strokes', () => {
    it('should increment the index', () => {
      wrapper.simulate('keydown', {
        keyCode: keycode('right'),
      });

      assert.strictEqual(wrapper.state('index'), 1, 'Should have the right index.');
    });

    it('should decrement the index using a modulo', () => {
      wrapper.simulate('keydown', {
        keyCode: keycode('left'),
      });

      assert.strictEqual(wrapper.state('index'), 2, 'Should have the right index.');
    });
  });
});
