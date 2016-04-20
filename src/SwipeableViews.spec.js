/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import SwipeableViews from './SwipeableViews';

describe('<SwipeableViews />', () => {
  it('should renders one div', () => {
    const wrapper = shallow(
      <SwipeableViews>
        <div>
          {'slide n°1'}
        </div>
        <div>
          {'slide n°2'}
        </div>
        <div>
          {'slide n°3'}
        </div>
      </SwipeableViews>
    );

    assert.strictEqual(wrapper.find('div').length, 1, 'Should render one div.');
  });
});
