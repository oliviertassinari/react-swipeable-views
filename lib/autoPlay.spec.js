'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _autoPlay = require('./autoPlay');

var _autoPlay2 = _interopRequireDefault(_autoPlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */


var Empty = function Empty() {
  return _react2.default.createElement('div', null);
};
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
});