'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = autoPlay;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function mod(n, m) {
  return (n % m + m) % m;
}

function autoPlay(MyComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(AutoPlay, _Component);

    function AutoPlay() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, AutoPlay);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AutoPlay)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        index: 0
      }, _this.handleInterval = function () {
        var _this$props = _this.props;
        var children = _this$props.children;
        var // eslint-disable-line react/prop-types
        direction = _this$props.direction;


        var indexNew = _this.state.index;

        if (direction === 'incremental') {
          indexNew += 1;
        } else {
          indexNew -= 1;
        }

        indexNew = mod(indexNew, _react2.default.Children.count(children));

        _this.setState({
          index: indexNew
        });

        /* eslint-disable react/prop-types */
        if (_this.props.onChangeIndex) {
          _this.props.onChangeIndex(indexNew);
        }
        /* eslint-enalbe react/prop-types */
      }, _this.handleChangeIndex = function (index) {
        _this.setState({
          index: index
        });

        /* eslint-disable react/prop-types */
        if (_this.props.onChangeIndex) {
          _this.props.onChangeIndex(index);
        }
        /* eslint-enalbe react/prop-types */
      }, _this.handleSwitching = function (index, type) {
        if (_this.timer) {
          clearInterval(_this.timer);
          _this.timer = null;
        } else if (type === 'end') {
          _this.startInterval();
        }

        /* eslint-disable react/prop-types */
        if (_this.props.onSwitching) {
          _this.props.onSwitching(index, type);
        }
        /* eslint-enalbe react/prop-types */
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AutoPlay, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.startInterval();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var index = nextProps.index;


        if (typeof index === 'number' && index !== this.props.index) {
          // eslint-disable-line react/prop-types
          this.setState({
            index: index
          });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.startInterval();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.timer);
      }
    }, {
      key: 'startInterval',
      value: function startInterval() {
        var _props = this.props;
        var autoplay = _props.autoplay;
        var interval = _props.interval;


        clearInterval(this.timer);

        if (autoplay) {
          this.timer = setInterval(this.handleInterval, interval);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props;
        var
        /* eslint-disable no-unused-vars */
        autoplay = _props2.autoplay;
        var direction = _props2.direction;
        var interval = _props2.interval;

        var other = _objectWithoutProperties(_props2, ['autoplay', 'direction', 'interval']);

        var index = this.state.index;


        return _react2.default.createElement(MyComponent, _extends({}, other, {
          index: index,
          onChangeIndex: this.handleChangeIndex,
          onSwitching: this.handleSwitching
        }));
      }
    }]);

    return AutoPlay;
  }(_react.Component), _class.propTypes = {
    /**
     * If `false`, the auto play behavior is disabled.
     */
    autoplay: _react.PropTypes.bool,
    /**
     * This is the auto play direction.
     */
    direction: _react.PropTypes.oneOf(['incremental', 'decremental']),
    /**
     * Delay between auto play transitions (in ms).
     */
    interval: _react.PropTypes.number
  }, _class.defaultProps = {
    autoplay: true,
    direction: 'incremental',
    interval: 3000
  }, _temp2;
}