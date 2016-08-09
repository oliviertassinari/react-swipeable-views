'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is an alternative version that use `ScrollView` and `ViewPagerAndroid`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * I'm not sure what version give the best UX experience.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * I'm keeping the two versions here until we figured out.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _Dimensions$get = _reactNative.Dimensions.get('window');

var windowWidth = _Dimensions$get.width;


var styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden'
  },
  container: {
    flex: 1
  },
  slide: {
    flex: 1
  }
});

var SwipeableViews = function (_Component) {
  _inherits(SwipeableViews, _Component);

  function SwipeableViews() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SwipeableViews);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SwipeableViews)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleScroll = function (event) {
      if (_this.props.onSwitching) {
        _this.props.onSwitching(event.nativeEvent.contentOffset.x / _this.state.viewWidth, 'move');
      }
    }, _this.handleMomentumScrollEnd = function (event) {
      var offset = event.nativeEvent.contentOffset;

      var indexNew = offset.x / _this.state.viewWidth;
      var indexLatest = _this.state.indexLatest;

      _this.setState({
        indexLatest: indexNew,
        offset: offset
      }, function () {
        if (_this.props.onSwitching) {
          _this.props.onSwitching(indexNew, 'end');
        }

        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
          _this.props.onChangeIndex(indexNew, indexLatest);
        }
      });
    }, _this.handlePageSelected = function (event) {
      var indexLatest = _this.state.indexLatest;
      var indexNew = event.nativeEvent.position;

      _this.setState({
        indexLatest: indexNew
      }, function () {
        if (_this.props.onSwitching) {
          _this.props.onSwitching(indexNew, 'end');
        }

        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
          _this.props.onChangeIndex(indexNew, indexLatest);
        }
      });
    }, _this.handlePageScroll = function (event) {
      if (_this.props.onSwitching) {
        _this.props.onSwitching(event.nativeEvent.offset + event.nativeEvent.position, 'move');
      }
    }, _this.handleLayout = function (event) {
      var width = event.nativeEvent.layout.width;


      if (width) {
        _this.setState({
          viewWidth: width,
          offset: {
            x: _this.state.indexLatest * width
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SwipeableViews, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var initState = {
        indexLatest: this.props.index,
        viewWidth: windowWidth
      };

      // android not use offset
      if (_reactNative.Platform.OS === 'ios') {
        initState.offset = {
          x: initState.viewWidth * initState.indexLatest
        };
      }

      this.setState(initState);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var index = nextProps.index;


      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          indexLatest: index,
          offset: {
            x: this.state.viewWidth * index
          }
        }, function () {
          if (_reactNative.Platform.OS === 'android') {
            if (_this2.props.animateTransitions) {
              _this2.refs.scrollView.setPage(index);
            } else {
              _this2.refs.scrollView.setPageWithoutAnimation(index);
            }
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var resistance = _props.resistance;
      var children = _props.children;
      var slideStyle = _props.slideStyle;
      var style = _props.style;
      var containerStyle = _props.containerStyle;
      var disabled = _props.disabled;

      var other = _objectWithoutProperties(_props, ['resistance', 'children', 'slideStyle', 'style', 'containerStyle', 'disabled']);

      var _state = this.state;
      var viewWidth = _state.viewWidth;
      var indexLatest = _state.indexLatest;
      var offset = _state.offset;


      var slideStyleObj = [styles.slide, {
        width: viewWidth
      }, slideStyle];

      var childrenToRender = _react.Children.map(children, function (element, index) {
        if (disabled && indexLatest !== index) {
          return null;
        }

        return _react2.default.createElement(
          _reactNative.View,
          { style: slideStyleObj },
          element
        );
      });

      return _react2.default.createElement(
        _reactNative.View,
        {
          onLayout: this.handleLayout,
          style: [styles.root, style]
        },
        _reactNative.Platform.OS === 'ios' ? _react2.default.createElement(
          _reactNative.ScrollView,
          _extends({}, other, {
            ref: 'scrollView',
            style: [styles.container, containerStyle],
            horizontal: true,
            pagingEnabled: true,
            scrollsToTop: false,
            bounces: resistance,
            onScroll: this.handleScroll,
            scrollEventThrottle: 200,
            showsHorizontalScrollIndicator: false,
            contentOffset: offset,
            onMomentumScrollEnd: this.handleMomentumScrollEnd
          }),
          childrenToRender
        ) : _react2.default.createElement(
          _reactNative.ViewPagerAndroid,
          _extends({}, other, {
            ref: 'scrollView',
            style: [styles.container, containerStyle],
            initialPage: indexLatest,
            onPageSelected: this.handlePageSelected,
            onPageScroll: this.handlePageScroll
          }),
          childrenToRender
        )
      );
    }
  }]);

  return SwipeableViews;
}(_react.Component);

SwipeableViews.propTypes = {
  /**
   * If `false`, changes to the index prop will not cause an animated transition.
   */
  animateTransitions: _react.PropTypes.bool,
  /**
   * Use this property to provide your slides.
   */
  children: _react.PropTypes.node,
  /**
   * This is the inlined style that will be applied
   * to each slide container.
   */
  containerStyle: _reactNative.ScrollView.propTypes.style,
  /**
   * If `true`, it will disable touch events.
   * This is useful when you want to prohibit the user from changing slides.
   */
  disabled: _react.PropTypes.bool,
  /**
   * This is the index of the slide to show.
   * This is useful when you want to change the default slide shown.
   * Or when you have tabs linked to each slide.
   */
  index: _react.PropTypes.number,
  /**
   * This is callback prop. It's call by the
   * component when the shown slide change after a swipe made by the user.
   * This is useful when you have tabs linked to each slide.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {integer} fromIndex This is the oldest index of the slide.
   */
  onChangeIndex: _react.PropTypes.func,
  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something corresponding to the current slide position.
   *
   * @param {integer} index This is the current index of the slide.
   * @param {string} type Can be either `move` or `end`.
   */
  onSwitching: _react.PropTypes.func,
  /**
   * If `true`, it will add bounds effect on the edges.
   */
  resistance: _react.PropTypes.bool,
  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle: _reactNative.View.propTypes.style,
  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: _reactNative.View.propTypes.style
};
SwipeableViews.defaultProps = {
  animateTransitions: true,
  disabled: false,
  index: 0,
  resistance: false
};
exports.default = SwipeableViews;