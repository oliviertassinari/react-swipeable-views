// @flow weak
/**
 * This is an alternative version that use `Animated.View`.
 * I'm not sure what version give the best UX experience.
 * I'm keeping the two versions here until we figured out.
 */

import React, {Component, PropTypes, Children} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import warning from 'warning';
import {UNCERTAINTY_THRESHOLD} from './constant';
import computeIndex from './utils/computeIndex';
import checkIndexBounds from './utils/checkIndexBounds';
import getDisplaySameSlide from './utils/getDisplaySameSlide';

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
     * This is useful when you want to implement something corresponding to the current slide position.
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
     * If `true`, it will add bounds effect on the edges.
     */
    resistance: PropTypes.bool,
    /**
     * This is the inlined style that will be applied
     * on the slide component.
     */
    slideStyle: View.propTypes.style,
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
    index: 0,
    threshold: 5,
    resistance: false,
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
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);

        return dx > dy && dx > UNCERTAINTY_THRESHOLD;
      },
      onPanResponderRelease: this.handleTouchEnd,
      onPanResponderTerminate: this.handleTouchEnd,
      onPanResponderMove: this.handleTouchMove,
      onPanResponderGrant: this.handleTouchStart,
    });

    warning(!this.props.animateHeight, 'react-swipeable-view: The animateHeight property is not implement yet.');
    warning(!this.props.axis, 'react-swipeable-view: The axis property is not implement yet.');
  }

  componentWillReceiveProps(nextProps) {
    const {
      index,
      animateTransitions,
    } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      if (process.env.NODE_ENV !== 'production') {
        checkIndexBounds(nextProps);
      }

      // If true, we are going to display the same slide. We shoudn't animate it.
      const displaySameSlide = getDisplaySameSlide(this.props, nextProps);

      if (animateTransitions && !displaySameSlide) {
        this.setState({
          indexLatest: index,
        }, () => {
          Animated.spring(this.state.indexCurrent, {
            toValue: index,
            tension: 300,
            friction: 30,
          }).start();
        });
      } else {
        this.setState({
          indexLatest: index,
          indexCurrent: new Animated.Value(index),
        });
      }
    }
  }

  panResponder = undefined;
  startX = 0;

  handleTouchStart = (event, gestureState) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event, gestureState);
    }

    this.startX = gestureState.x0;
  };

  handleTouchMove = (event, gestureState) => {
    const {
      children,
      onSwitching,
      resistance,
    } = this.props;

    const {
      index,
      startX,
    } = computeIndex({
      children: children,
      resistance: resistance,
      pageX: gestureState.moveX,
      indexLatest: this.state.indexLatest,
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

    const {
      vx,
      moveX,
    } = gestureState;

    const indexLatest = this.state.indexLatest;
    const indexCurrent = indexLatest + (this.startX - moveX) / this.state.viewLength;

    let indexNew;

    // Quick movement
    if (Math.abs(vx) * 10 > this.props.threshold) {
      if (vx > 0) {
        indexNew = Math.floor(indexCurrent);
      } else {
        indexNew = Math.ceil(indexCurrent);
      }
    } else {
      // Some hysteresis with indexLatest
      if (Math.abs(indexLatest - indexCurrent) > 0.6) {
        indexNew = Math.round(indexCurrent);
      } else {
        indexNew = indexLatest;
      }
    }

    const indexMax = Children.count(this.props.children) - 1;

    if (indexNew < 0) {
      indexNew = 0;
    } else if (indexNew > indexMax) {
      indexNew = indexMax;
    }

    this.setState({
      indexLatest: indexNew,
    }, () => {
      Animated.spring(this.state.indexCurrent, {
        toValue: indexNew,
        tension: 300,
        friction: 30,
      }).start();

      if (this.props.onSwitching) {
        this.props.onSwitching(indexNew, 'end');
      }

      if (this.props.onChangeIndex && indexNew !== indexLatest) {
        this.props.onChangeIndex(indexNew, indexLatest);
      }
    });
  };

  handleLayout = (event) => {
    const {width} = event.nativeEvent.layout;

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
    } = this.props;

    const {
      indexCurrent,
      viewLength,
    } = this.state;

    const slideStyleObj = [styles.slide, slideStyle];

    const childrenToRender = Children.map(children, (child) => {
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
      <View
        style={[styles.root, style]}
        onLayout={this.handleLayout}
      >
        <Animated.View
          {...panHandlers}
          style={sceneContainerStyle}
        >
          {childrenToRender}
        </Animated.View>
      </View>
    );
  }
}

export default SwipeableViews;
