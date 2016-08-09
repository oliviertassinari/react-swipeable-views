'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _chai = require('chai');

var _autoPlay = require('./autoPlay');

var _autoPlay2 = _interopRequireDefault(_autoPlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = function Empty() {
  return _react2.default.createElement('div', null);
}; /* eslint-env mocha */

var AutoPlaySwipeableViews = (0, _autoPlay2.default)(Empty);

describe('autoPlay', function () {
  describe('props: children', function () {
    it('should start at the beginning', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        AutoPlaySwipeableViews,
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
        )
      ));

      _chai.assert.strictEqual(wrapper.state('index'), 0, 'Should start at the beginning.');
    });
  });

  var wrapper = void 0;

  describe('dom', function () {
    afterEach(function () {
      wrapper.unmount();
    });

    describe('props: direction', function () {
      it('should increment the index', function (done) {
        wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          AutoPlaySwipeableViews,
          { interval: 100 },
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

        setTimeout(function () {
          _chai.assert.strictEqual(wrapper.state('index'), 2, 'Should have the right index.');
          done();
        }, 300);
      });

      it('should decrement the index', function (done) {
        wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          AutoPlaySwipeableViews,
          { interval: 100, direction: 'decremental' },
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

        setTimeout(function () {
          _chai.assert.strictEqual(wrapper.state('index'), 3, 'Should have the right index.');
          done();
        }, 300);
      });
    });

    describe('props: onChangeIndex', function () {
      it('should be called each time', function (done) {
        var handleChangeIndex = (0, _sinon.spy)();
        wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          AutoPlaySwipeableViews,
          { interval: 100, onChangeIndex: handleChangeIndex },
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

        setTimeout(function () {
          _chai.assert.strictEqual(handleChangeIndex.callCount, 2, 'Should be called the right number of time.');
          done();
        }, 300);
      });
    });
  });
});