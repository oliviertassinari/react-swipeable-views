import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import getDisplaySameSlide from './getDisplaySameSlide';

const SwipeableViews = ({
  index, // eslint-disable-line react/prop-types
  ...props
}) => <div {...props} />;

describe('getDisplaySameSlide', () => {
  it('should return false if there is no key', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div>{'slide n°1'}</div>
        <div>{'slide n°2'}</div>
        <div>{'slide n°3'}</div>
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div>{'slide n°2'}</div>
        <div>{'slide n°3'}</div>
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), false);
  });

  it('should return true if we display the same slide', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), true);
  });

  it('should return false if we do not display the same slide', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), false);
  });

  it('should work with null old children', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        {null}
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), false);
  });

  it('should work with null new children', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        <div key="3" />
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="1" />
        {null}
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), false);
  });

  it('should work with both null children', () => {
    const oldState = mount(
      <SwipeableViews index={2}>
        <div key="1" />
        <div key="2" />
        {null}
      </SwipeableViews>,
    );

    const newState = mount(
      <SwipeableViews index={1}>
        <div key="1" />
        {null}
        <div key="3" />
      </SwipeableViews>,
    );

    assert.strictEqual(getDisplaySameSlide(oldState.props(), newState.props()), true);
  });
});
