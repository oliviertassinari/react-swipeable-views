/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
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
});
