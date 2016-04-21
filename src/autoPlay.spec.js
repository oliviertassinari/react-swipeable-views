/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import autoPlay from './autoPlay';

const Empty = () => <div />;
const AutoPlaySwipeableViews = autoPlay(Empty);

describe('autoPlay', () => {
  describe('props: children', () => {
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
});
