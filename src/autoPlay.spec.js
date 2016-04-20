/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import autoPlay from './autoPlay';
import SwipeableViews from './SwipeableViews';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

describe('autoPlay', () => {
  describe('props: children', () => {
    it('should renders three div', () => {
      const wrapper = shallow(
        <AutoPlaySwipeableViews>
          <div>{'slide n°1'}</div>
          <div>{'slide n°2'}</div>
          <div>{'slide n°3'}</div>
        </AutoPlaySwipeableViews>
      );

      assert.strictEqual(wrapper.find('div').length, 3, 'Should render three div.');
      assert.strictEqual(wrapper.state('index'), 0, 'Should start at the beginning.');
    });
  });

  describe('props: interval', () => {
    it('should update the index after the timeout', () => {

    });
  });
});
