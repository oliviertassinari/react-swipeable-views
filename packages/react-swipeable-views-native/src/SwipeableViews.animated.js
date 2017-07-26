// @flow weak
/**
 * This is an alternative version that use `Animated.View`.
 * I'm not sure what version give the best UX experience.
 * I'm keeping the two versions here until we figured out.
 */

import React, { Component, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native';
import warning from 'warning';
import {
  constant,
  checkIndexBounds,
  computeIndex,
  getDisplaySameSlide,
} from 'react-swipeable-views-core';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  slide: {
    flex: 1,
  },
});

// I couldn't find a public API to get this value.
function getAnimatedValue(animated) {
  return animated._value; // eslint-disable-line no-underscore-dangle
}

class SwipeableViews extends Component {
  static propTypes = {
    /**
     * If `true`, the height of the container will be animated to match the current slide height.
     * Animating another style property has a negative impact regarding performance.
     */
    animateHeight: PropTypes.bool,
    /**
     * If `false`, changes to the index prop will not cause an animated transition.
     */
    animateTransitions: PropTypes.bool,
    /**
     * The axis on which the slides will slide.
     */
    axis: PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
    /**
     * Use this property to provide your slides.
     */
    children: PropTypes.node.isRequired,
    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    containerStyle: Animated.View.propTypes.style,
    /**
     * If `true`, it will disable touch events.
     * This is useful when you want to prohibit the user from changing slides.
     */
    disabled: PropTypes.bool,
    /**
     * Configure hysteresis between slides. This value determines how far
     * should user swipe to switch slide.
     */
    hysteresis: PropTypes.number,
    /**
     * This is the index of the slide to show.
     * This is useful when you want to change the default slide shown.
     * Or when you have tabs linked to each slide.
     */
    index: PropTypes.number,
    /**
     * This is callback prop. It's call by the
     * component when the shown slide change after a swipe made by the user.
     * This is useful when you have tabs linked to each slide.
     *
     * @param {integer} index This is the current index of the slide.
     * @param {integer} fromIndex This is the oldest index of the slide.
     */
    onChangeIndex: PropTypes.func,
    /**
     * This is callback prop. It's called by the
     * component when the slide switching.
     * This is useful when you want to implement something
     * corresponding to the current slide position.
     *
     * @param {integer} index This is the current index of the slide.
     * @param {string} type Can be either `move` or `end`.
     */
    onSwitching: PropTypes.func,
    /**
     * @ignore
     */
    onTouchEnd: React.PropTypes.func,
    /**
     * @ignore
     */
    onTouchStart: React.PropTypes.func,
    /**
     * The callback that fires when the animation comes to a rest.
     * This is useful to defer CPU intensive task.
     */
    onTransitionEnd: PropTypes.func,
    /**
     * If `true`, it will add bounds effect on the edges.
     */
    resistance: PropTypes.bool,
    /**
     * This is the inlined style that will be applied
     * on the slide component.
     */
    slideStyle: View.propTypes.style,
    /**
     * This is the config given to Animated for the spring.
     * This is useful to change the dynamic of the transition.
     */
    springConfig: PropTypes.shape({
      tension: PropTypes.number,
      friction: PropTypes.number,
    }),
    /**
     * This is the inlined style that will be applied
     * on the root component.
     */
    style: View.propTypes.style,
    /**
     * This is the threshold used for detecting a quick swipe.
     * If the computed speed is above this value, the index change.
     */
    threshold: PropTypes.number,
  };

  static defaultProps = {
    animateTransitions: true,
    disabled: false,
    hysteresis: 0.6,
    index: 0,
    resistance: false,
    springConfig: {
      tension: 300,
      friction: 30,
    },
    threshold: 5,
  };

  state = {};

  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      checkIndexBounds(this.props);
    }

    this.setState({
      indexLatest: this.props.index,
      indexCurrent: new Animated.Value(this.props.index),
      viewLength: Dimensions.get('window').width,
    });

    this.panResponder = PanResponder.create({
      // So it's working inside a Modal
      onStartShouldSetPanResponder: () => true,
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);

        return dx > dy && dx > constant.UNCERTAINTY_THRESHOLD;
      },
      onPanResponderRelease: this.handleTouchEnd,
      onPanResponderTerminate: this.handleTouchEnd,
      onPanResponderMove: this.handleTouchMove,
      onPanResponderGrant: this.handleTouchStart,
    });

    warning(
      !this.props.animateHeight,
      'react-swipeable-view: The animateHeight property is not implement yet.',
    );
    warning(!this.props.axis, 'react-swipeable-view: The axis property is not implement yet.');
  }

  componentWillReceiveProps(nextProps) {
    const { index, animateTransitions } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      if (process.env.NODE_ENV !== 'production') {
        checkIndexBounds(nextProps);
      }

      // If true, we are going to change the children. We shoudn't animate it.
      const displaySameSlide = getDisplaySameSlide(this.props, nextProps);

      if (animateTransitions && !displaySameSlide) {
        this.setState(
          {
            indexLatest: index,
          },
          () => {
            this.animateIndexCurrent(index);
          },
        );
      } else {
        this.setState({
          indexLatest: index,
          indexCurrent: new Animated.Value(index),
        });
      }
    }
  }

  animateIndexCurrent(index) {
    // Avoid starting an animation when we are already on the right value.
    if (getAnimatedValue(this.state.indexCurrent) !== index) {
      Animated.spring(this.state.indexCurrent, {
        toValue: index,
        ...this.props.springConfig,
      }).start(this.handleAnimationFinished);
    } else {
      this.handleAnimationFinished({
        finished: true,
      });
    }
  }

  handleAnimationFinished = params => {
    // The animation can be aborted.
    // We only want to call onTransitionEnd when the animation is finished.
    if (this.props.onTransitionEnd && params.finished) {
      this.props.onTransitionEnd();
    }
  };

  panResponder = undefined;
  startX = 0;
  startIndex = 0;

  handleTouchStart = (event, gestureState) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event, gestureState);
    }

    this.startX = gestureState.x0;
    this.startIndex = getAnimatedValue(this.state.indexCurrent);
  };

  handleTouchMove = (event, gestureState) => {
    const { children, onSwitching, resistance } = this.props;

    const { index, startX } = computeIndex({
      children,
      resistance,
      pageX: gestureState.moveX,
      startIndex: this.startIndex,
      startX: this.startX,
      viewLength: this.state.viewLength,
    });

    if (startX) {
      this.startX = startX;
    }

    this.state.indexCurrent.setValue(index);

    if (onSwitching) {
      onSwitching(index, 'move');
    }
  };

  handleTouchEnd = (event, gestureState) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event, gestureState);
    }

    const { vx, moveX } = gestureState;

    const indexLatest = this.state.indexLatest;
    const indexCurrent = indexLatest + (this.startX - moveX) / this.state.viewLength;
    const delta = indexLatest - indexCurrent;

    let indexNew;

    // Quick movement
    if (Math.abs(vx) * 10 > this.props.threshold) {
      if (vx > 0) {
        indexNew = Math.floor(indexCurrent);
      } else {
        indexNew = Math.ceil(indexCurrent);
      }
    } else if (Math.abs(delta) > this.props.hysteresis) {
      // Some hysteresis with indexLatest.
      indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent);
    } else {
      indexNew = indexLatest;
    }

    const indexMax = Children.count(this.props.children) - 1;

    if (indexNew < 0) {
      indexNew = 0;
    } else if (indexNew > indexMax) {
      indexNew = indexMax;
    }

    this.setState(
      {
        indexLatest: indexNew,
      },
      () => {
        this.animateIndexCurrent(indexNew);

        if (this.props.onSwitching) {
          this.props.onSwitching(indexNew, 'end');
        }

        if (this.props.onChangeIndex && indexNew !== indexLatest) {
          this.props.onChangeIndex(indexNew, indexLatest);
        }
      },
    );
  };

  handleLayout = event => {
    const { width } = event.nativeEvent.layout;

    if (width) {
      this.setState({
        viewLength: width,
      });
    }
  };

  render() {
    const {
      children,
      style,
      slideStyle,
      containerStyle,
      disabled,
      hysteresis, // eslint-disable-line no-unused-vars
      index, // eslint-disable-line no-unused-vars
      onTransitionEnd, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const { indexCurrent, viewLength } = this.state;

    const slideStyleObj = [styles.slide, slideStyle];

    const childrenToRender = Children.map(children, child => {
      warning(
        isValidElement(child),
        `react-swipeable-view: one of the children provided is invalid: ${child}.
We are expecting a valid React Element`,
      );

      return (
        <View style={slideStyleObj}>
          {child}
        </View>
      );
    });

    const sceneContainerStyle = [
      styles.container,
      {
        width: viewLength * Children.count(children),
        transform: [
          {
            translateX: indexCurrent.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -viewLength],
            }),
          },
        ],
      },
      containerStyle,
    ];

    const panHandlers = disabled ? {} : this.panResponder.panHandlers;

    return (
      <View style={[styles.root, style]} onLayout={this.handleLayout} {...other}>
        <Animated.View {...panHandlers} style={sceneContainerStyle}>
          {childrenToRender}
        </Animated.View>
      </View>
    );
  }
}

export default SwipeableViews;
