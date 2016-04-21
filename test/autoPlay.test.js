/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {assert} from 'chai';
import autoPlay from '../src/autoPlay';

const Empty = () => <div />;
const AutoPlaySwipeableViews = autoPlay(Empty);

let wrapper;

describe('autoPlay', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  describe('props: direction', () => {
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
      }, 300);
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
      }, 300);
    });
  });

  describe('props: onChangeIndex', () => {
    it('should be called each time', (done) => {
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
        done();
      }, 300);
    });
  });
});
