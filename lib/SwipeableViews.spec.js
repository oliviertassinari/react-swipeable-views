'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _reactMotion = require('react-motion');

var _SwipeableViews = require('../src/SwipeableViews');

var _SwipeableViews2 = _interopRequireDefault(_SwipeableViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('SwipeableViews', function () {
  describe('props: children', function () {
    it('should render the children', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _SwipeableViews2.default,
        null,
        _react2.default.createElement(
          'div',
          null,
          'slide n°1'
        ),
        _react2.default.createElement(
          'div',
          null,
          'slide n°2'
        ),
        _react2.default.createElement(
          'div',
          null,
          'slide n°3'
        ),
        _react2.default.createElement(
          'div',
          null,
          'slide n°4'
        ),
        _react2.default.createElement(
          'div',
          null,
          'slide n°5'
        )
      ));

      _chai.assert.strictEqual(wrapper.text(), 'slide n°1slide n°2slide n°3slide n°4slide n°5', 'Should render each slide.');
    });
  });

  describe('props: onTouchStart', function () {
    it('should trigger when we bind it', function () {
      var handleTouchStart = (0, _sinon.spy)();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _SwipeableViews2.default,
        { onTouchStart: handleTouchStart },
        _react2.default.createElement(
          'div',
          null,
          'slide n°1'
        )
      ));

      wrapper.simulate('touchStart', {
        touches: [{}]
      });
      _chai.assert.strictEqual(handleTouchStart.callCount, 1, 'Should be called');
    });

    it('should trigger when we disable the swipe', function () {
      var handleTouchStart = (0, _sinon.spy)();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _SwipeableViews2.default,
        { disabled: true, onTouchStart: handleTouchStart },
        _react2.default.createElement(
          'div',
          null,
          'slide n°1'
        )
      ));

      wrapper.simulate('touchStart', {
        touches: [{}]
      });
      _chai.assert.strictEqual(handleTouchStart.callCount, 1, 'Should be called');
    });
  });

  describe('props: onTouchEnd', function () {
    it('should trigger when we bind it', function () {
      var handleTouchEnd = (0, _sinon.spy)();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _SwipeableViews2.default,
        { onTouchEnd: handleTouchEnd },
        _react2.default.createElement(
          'div',
          null,
          'slide n°1'
        )
      ));

      wrapper.simulate('touchEnd');
      _chai.assert.strictEqual(handleTouchEnd.callCount, 1, 'Should be called');
    });
  });

  describe('props: animateTransitions', function () {
    it('should not use a spring if animateTransitions is false', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _SwipeableViews2.default,
        { animateTransitions: false },
        _react2.default.createElement(
          'div',
          null,
          'slide n°1'
        )
      ));

      _chai.assert.deepEqual(wrapper.find(_reactMotion.Motion).at(0).props().style, {
        translate: 0,
        height: 0
      });
    });
  });

  describe('swipe detection', function () {
    var instance = void 0;

    beforeEach(function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _SwipeableViews2.default,
        null,
        _react2.default.createElement(
          'div',
          null,
          'slide n°1'
        )
      ));

      instance = wrapper.instance();
      instance.handleTouchStart({
        touches: [{
          pageX: 0,
          pageY: 0
        }]
      });
      instance.startWidth = 100;
    });

    it('should not detect a swipe when scrolling', function () {
      instance.handleTouchMove({
        touches: [{
          pageX: 0,
          pageY: 10
        }]
      });
      _chai.assert.strictEqual(instance.isSwiping, false, 'Should not detect a swipe');
    });

    it('should detect a swipe when doing a clear movement', function () {
      instance.handleTouchMove({
        touches: [{
          pageX: 10,
          pageY: 0
        }],
        preventDefault: function preventDefault() {}
      });
      _chai.assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });

    it('should wait for a clear movement to detect a swipe', function () {
      instance.handleTouchMove({
        touches: [{
          pageX: 2,
          pageY: 0
        }]
      });
      _chai.assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      instance.handleTouchMove({
        touches: [{
          pageX: 0,
          pageY: 2
        }]
      });
      _chai.assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      instance.handleTouchMove({
        touches: [{
          pageX: 0,
          pageY: 2
        }]
      });
      _chai.assert.strictEqual(instance.isSwiping, undefined, 'We do not know yet');

      instance.handleTouchMove({
        touches: [{
          pageX: 10,
          pageY: 0
        }],
        preventDefault: function preventDefault() {}
      });
      _chai.assert.strictEqual(instance.isSwiping, true, 'Should detect a swipe');
    });
  });
});