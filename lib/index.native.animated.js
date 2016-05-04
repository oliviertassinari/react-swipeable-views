'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is an alternative version that use `Animated.View`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * I'm not sure what version give the best UX experience.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * I'm keeping the two versions here until we figured out.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RESISTANCE_COEF = 0.7;

var styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  slide: {
    flex: 1
  }
});

var SwipeableViews = function (_Component) {
  _inherits(SwipeableViews, _Component);

  function SwipeableViews(props) {
    _classCallCheck(this, SwipeableViews);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeableViews).call(this, props));

    _this.handleTouchStart = function (event, gestureState) {
      _this.startX = gestureState.x0;
    };

    _this.handleTouchMove = function (event, gestureState) {
      var moveX = gestureState.moveX;


      var index = _this.state.indexLatest + (_this.startX - moveX) / _this.state.viewWidth;

      var indexMax = _reactNative2.default.Children.count(_this.props.children) - 1;

      if (!_this.props.resistance) {
        // Reset the starting point
        if (index < 0) {
          index = 0;
          _this.startX = moveX;
        } else if (index > indexMax) {
          index = indexMax;
          _this.startX = moveX;
        }
      } else {
        if (index < 0) {
          index = Math.exp(index * RESISTANCE_COEF) - 1;
        } else if (index > indexMax) {
          index = indexMax + 1 - Math.exp((indexMax - index) * RESISTANCE_COEF);
        }
      }

      _this.state.indexCurrent.setValue(index);

      if (_this.props.onSwitching) {
        _this.props.onSwitching(index, 'move');
      }
    };

    _this.handleTouchEnd = function (event, gestureState) {
      var vx = gestureState.vx;
      var moveX = gestureState.moveX;


      var indexStart = _this.state.indexLatest;
      var indexCurrent = indexStart + (_this.startX - moveX) / _this.state.viewWidth;

      var indexNew = void 0;

      // Quick movement
      if (Math.abs(vx) * 10 > _this.props.threshold) {
        if (vx > 0) {
          indexNew = Math.floor(indexCurrent);
        } else {
          indexNew = Math.ceil(indexCurrent);
        }
      } else {
        // Some hysteresis with indexStart
        if (Math.abs(indexStart - indexCurrent) > 0.6) {
          indexNew = Math.round(indexCurrent);
        } else {
          indexNew = indexStart;
        }
      }

      var indexMax = _reactNative2.default.Children.count(_this.props.children) - 1;

      if (indexNew < 0) {
        indexNew = 0;
      } else if (indexNew > indexMax) {
        indexNew = indexMax;
      }

      var indexLatest = _this.state.indexLatest;

      _this.setState({
        indexLatest: indexNew
      }, function () {
        _reactNative.Animated.spring(_this.state.indexCurrent, {
          toValue: indexNew,
          tension: 300,
          friction: 30
        }).start();

        if (_this.props.onSwitching) {
          _this.props.onSwitching(indexNew, 'end');
        }

        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
          _this.props.onChangeIndex(indexNew, indexLatest);
        }
      });
    };

    _this.handleLayout = function (event) {
      var width = event.nativeEvent.layout.width;


      if (width) {
        _this.setState({
          viewWidth: width
        });
      }
    };

    _this.state = {
      indexLatest: props.index,
      indexCurrent: new _reactNative.Animated.Value(props.index),
      viewWidth: _reactNative.Dimensions.get('window').width
    };
    return _this;
  }

  _createClass(SwipeableViews, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.panResponder = _reactNative.PanResponder.create({
        // Claim responder if it's a horizontal pan
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(event, gestureState) {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        },
        onPanResponderRelease: this.handleTouchEnd,
        onPanResponderTerminate: this.handleTouchEnd,
        onPanResponderMove: this.handleTouchMove,
        onPanResponderGrant: this.handleTouchStart
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var index = nextProps.index;


      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          indexLatest: index
        }, function () {
          _reactNative.Animated.spring(_this2.state.indexCurrent, {
            toValue: index,
            tension: 300,
            friction: 30
          }).start();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var style = _props.style;
      var slideStyle = _props.slideStyle;
      var containerStyle = _props.containerStyle;
      var disabled = _props.disabled;
      var _state = this.state;
      var indexCurrent = _state.indexCurrent;
      var viewWidth = _state.viewWidth;


      var slideStyleObj = [styles.slide, slideStyle];

      var childrenToRender = _reactNative2.default.Children.map(children, function (child) {
        return _reactNative2.default.createElement(
          _reactNative.View,
          { style: slideStyleObj },
          child
        );
      });

      var sceneContainerStyle = [styles.container, {
        width: viewWidth * _reactNative2.default.Children.count(children),
        transform: [{
          translateX: indexCurrent.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -viewWidth]
          })
        }]
      }, containerStyle];

      var panHandlers = disabled ? {} : this.panResponder.panHandlers;

      return _reactNative2.default.createElement(
        _reactNative.View,
        {
          style: [styles.root, style],
          onLayout: this.handleLayout
        },
        _reactNative2.default.createElement(
          _reactNative.Animated.View,
          _extends({}, panHandlers, {
            style: sceneContainerStyle
          }),
          childrenToRender
        )
      );
    }
  }]);

  return SwipeableViews;
}(_reactNative.Component);

SwipeableViews.propTypes = {
  /**
   * Use this property to provide your slides.
   */
  children: _reactNative2.default.PropTypes.node.isRequired,
  /**
   * This is the inlined style that will be applied
   * to each slide container.
   */
  containerStyle: _reactNative.Animated.View.propTypes.style,
  /**
   * If true, it will disable touch events.
   * This is useful when you want to prohibit the user from changing slides.
   */
  disabled: _reactNative2.default.PropTypes.bool,
  /**
   * This is the index of the slide to show.
   * This is useful when you want to change the default slide shown.
   * Or when you have tabs linked to each slide.
   */
  index: _reactNative2.default.PropTypes.number,
  /**
   * This is callback prop. It's call by the
   * component when the shown slide change after a swipe made by the user.
   * This is useful when you have tabs linked to each slide.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {integer} fromIndex This is the oldest index of the slide.
   */
  onChangeIndex: _reactNative2.default.PropTypes.func,
  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something corresponding to the current slide position.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {string} type Can be either `move` or `end`.
   */
  onSwitching: _reactNative2.default.PropTypes.func,
  /**
   * If true, it will add bounds effect on the edges.
   */
  resistance: _reactNative2.default.PropTypes.bool,
  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle: _reactNative.View.propTypes.style,
  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: _reactNative.View.propTypes.style,
  /**
   * This is the threshold used for detecting a quick swipe.
   * If the computed speed is above this value, the index change.
   */
  threshold: _reactNative2.default.PropTypes.number
};
SwipeableViews.defaultProps = {
  index: 0,
  threshold: 5,
  resistance: false,
  disabled: false
};
exports.default = SwipeableViews;