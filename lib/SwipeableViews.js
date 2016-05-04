'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    overflowX: 'hidden'
  },
  container: {
    display: 'flex'
  },
  slide: {
    width: '100%',
    flexShrink: 0,
    overflow: 'auto'
  }
};

var RESISTANCE_COEF = 0.7;

var SwipeableViews = function (_Component) {
  _inherits(SwipeableViews, _Component);

  function SwipeableViews(props) {
    _classCallCheck(this, SwipeableViews);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeableViews).call(this, props));

    _this.handleTouchStart = function (event) {
      var touch = event.touches[0];

      _this.startWidth = _reactDom2.default.findDOMNode(_this).getBoundingClientRect().width;
      _this.indexStart = _this.state.indexCurrent;
      _this.startX = touch.pageX;
      _this.lastX = touch.pageX;
      _this.vx = 0;
      _this.startY = touch.pageY;
      _this.isScrolling = undefined;
      _this.started = true;
    };

    _this.handleTouchMove = function (event) {
      // The touch start event can be cancel.
      // Makes sure we set a starting point.
      if (!_this.started) {
        _this.handleTouchStart(event);
        return;
      }

      var touch = event.touches[0];

      // This is a one time test
      if (_this.isScrolling === undefined) {
        _this.isScrolling = Math.abs(_this.startY - touch.pageY) > Math.abs(_this.startX - touch.pageX) || event.defaultPrevented;
      }

      if (_this.isScrolling) {
        return;
      }

      // Prevent native scrolling
      event.preventDefault();

      _this.vx = _this.vx * 0.5 + (touch.pageX - _this.lastX) * 0.5;
      _this.lastX = touch.pageX;

      var indexMax = _react2.default.Children.count(_this.props.children) - 1;

      var index = _this.indexStart + (_this.startX - touch.pageX) / _this.startWidth;

      if (!_this.props.resistance) {
        // Reset the starting point
        if (index < 0) {
          index = 0;
          _this.startX = touch.pageX;
        } else if (index > indexMax) {
          index = indexMax;
          _this.startX = touch.pageX;
        }
      } else {
        if (index < 0) {
          index = Math.exp(index * RESISTANCE_COEF) - 1;
        } else if (index > indexMax) {
          index = indexMax + 1 - Math.exp((indexMax - index) * RESISTANCE_COEF);
        }
      }

      _this.setState({
        isDragging: true,
        indexCurrent: index
      }, function () {
        if (_this.props.onSwitching) {
          _this.props.onSwitching(index, 'move');
        }
      });
    };

    _this.handleTouchEnd = function () {
      // The touch start event can be cancel.
      // Makes sure that a starting point is set.
      if (!_this.started) {
        return;
      }

      _this.started = false;

      if (_this.isScrolling) {
        return;
      }

      var indexStart = _this.state.indexLatest;
      var indexCurrent = _this.state.indexCurrent;

      var indexNew = void 0;

      // Quick movement
      if (Math.abs(_this.vx) > _this.props.threshold) {
        if (_this.vx > 0) {
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

      var indexMax = _react2.default.Children.count(_this.props.children) - 1;

      if (indexNew < 0) {
        indexNew = 0;
      } else if (indexNew > indexMax) {
        indexNew = indexMax;
      }

      var indexLatest = _this.state.indexLatest;

      _this.setState({
        indexCurrent: indexNew,
        indexLatest: indexNew,
        isDragging: false
      }, function () {
        if (_this.props.onSwitching) {
          _this.props.onSwitching(indexNew, 'end');
        }

        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
          _this.props.onChangeIndex(indexNew, indexLatest);
        }
      });
    };

    _this.handleScroll = function (event) {

      // ignore every other scrollevent, or else this scrollevent will trigger another one.
      // see http://stackoverflow.com/questions/1386696/make-scrollleft-scrolltop-changes-not-trigger-scroll-event
      var ignore = _this.ignoreScrollEvents;
      _this.ignoreScrollEvents = false;

      if (ignore) return;

      var nextIndex = _this.state.indexCurrent + 1;
      var indexLatest = _this.state.indexLatest;

      // set scrollLeft on the event to 0.
      _this.setScrollLeft(event, 0);

      if (_this.props.onChangeIndex && nextIndex !== indexLatest) {
        _this.props.onChangeIndex(nextIndex, indexLatest);
      }

      if (_this.props.onSwitching) {
        _this.props.onSwitching(nextIndex, 'end');
      }

      _this.setState({
        indexCurrent: nextIndex,
        indexLatest: _this.state.indexCurrent
      });
    };

    _this.setScrollLeft = function (event, x) {
      if (event.target.scrollLeft != x) {
        _this.ignoreScrollEvents = true;
        event.target.scrollLeft = x;
      }
    };

    _this.state = {
      indexCurrent: props.index,
      indexLatest: props.index,
      isDragging: false,
      isFirstRender: true,
      heightLatest: 0
    };
    return _this;
  }

  _createClass(SwipeableViews, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
        isFirstRender: false
      });
      /* eslint-enable react/no-did-mount-set-state */
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var index = nextProps.index;


      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          indexCurrent: index,
          indexLatest: index
        });
      }
    }
  }, {
    key: 'updateHeight',
    value: function updateHeight(node, index) {
      if (node !== null && index === this.state.indexLatest) {
        var child = node.children[0];
        if (child !== undefined && child.clientHeight !== undefined && this.state.heightLatest !== child.clientHeight) {
          this.setState({
            heightLatest: child.clientHeight
          });
        }
      }
    }
  }, {
    key: 'renderContainer',
    value: function renderContainer(interpolatedStyle, updateHeight, childrenToRender) {
      var containerStyle = this.props.containerStyle;


      var translate = -interpolatedStyle.translate;

      var styleNew = {
        WebkitTransform: 'translate3d(' + translate + '%, 0, 0)',
        transform: 'translate3d(' + translate + '%, 0, 0)'
      };

      if (updateHeight) {
        styleNew.height = interpolatedStyle.height;
      }

      return _react2.default.createElement(
        'div',
        { style: _extends(styleNew, styles.container, containerStyle) },
        childrenToRender
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var
      /* eslint-disable no-unused-vars */
      index = _props.index;
      var onChangeIndex = _props.onChangeIndex;
      var onSwitching = _props.onSwitching;
      var resistance = _props.resistance;
      var threshold = _props.threshold;
      var
      /* eslint-enable no-unused-vars */
      children = _props.children;
      var containerStyle = _props.containerStyle;
      var slideStyle = _props.slideStyle;
      var disabled = _props.disabled;
      var springConfig = _props.springConfig;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['index', 'onChangeIndex', 'onSwitching', 'resistance', 'threshold', 'children', 'containerStyle', 'slideStyle', 'disabled', 'springConfig', 'style']);

      var _state = this.state;
      var indexCurrent = _state.indexCurrent;
      var isDragging = _state.isDragging;
      var isFirstRender = _state.isFirstRender;
      var heightLatest = _state.heightLatest;


      var translate = indexCurrent * 100;
      var height = heightLatest;

      var motionStyle = isDragging ? {
        translate: translate,
        height: height
      } : {
        translate: (0, _reactMotion.spring)(translate, springConfig),
        height: height !== 0 ? (0, _reactMotion.spring)(height, springConfig) : 0
      };

      var touchEvents = disabled ? {} : {
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onScroll: this.handleScroll
      };

      var updateHeight = true;
      // There is no point to animate if we already provide a height
      if (containerStyle && (containerStyle.height || containerStyle.maxHeight || containerStyle.minHeight)) {
        updateHeight = false;
      }

      var slideStyleObj = _extends({}, styles.slide, slideStyle);

      var childrenToRender = _react2.default.Children.map(children, function (child, index2) {
        if (isFirstRender && index2 > 0) {
          return null;
        }

        var ref = void 0;

        if (updateHeight) {
          ref = function ref(node) {
            return _this2.updateHeight(node, index2);
          };
        }

        return _react2.default.createElement(
          'div',
          { ref: ref, style: slideStyleObj },
          child
        );
      });

      return _react2.default.createElement(
        'div',
        _extends({}, other, {
          style: _extends({}, styles.root, style)
        }, touchEvents),
        _react2.default.createElement(
          _reactMotion.Motion,
          { style: motionStyle },
          function (interpolatedStyle) {
            return _this2.renderContainer(interpolatedStyle, updateHeight, childrenToRender);
          }
        )
      );
    }
  }]);

  return SwipeableViews;
}(_react.Component);

SwipeableViews.propTypes = {
  /**
   * Use this property to provide your slides.
   */
  children: _react.PropTypes.node.isRequired,
  /**
   * This is the inlined style that will be applied
   * to each slide container.
   */
  containerStyle: _react.PropTypes.object,
  /**
   * If true, it will disable touch events.
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
   * If true, it will add bounds effect on the edges.
   */
  resistance: _react.PropTypes.bool,
  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle: _react.PropTypes.object,
  /**
   * This is the config given to react-motion for the spring.
   * This is useful to change the dynamic of the transition.
   */
  springConfig: _react.PropTypes.object,
  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: _react.PropTypes.object,
  /**
   * This is the threshold used for detecting a quick swipe.
   * If the computed speed is above this value, the index change.
   */
  threshold: _react.PropTypes.number
};
SwipeableViews.defaultProps = {
  index: 0,
  threshold: 5,
  resistance: false,
  disabled: false,
  springConfig: {
    stiffness: 300,
    damping: 30
  }
};
exports.default = SwipeableViews;