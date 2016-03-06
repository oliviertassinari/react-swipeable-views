/**
 * This is an alternative version that use `Animated.View`.
 * I'm not sure what version give the best UX experience.
 * I'm keeping the two versions here until we figured out.
 */

import React, {
  Animated,
  Component,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

const RESISTANCE_COEF = 0.7;

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
     * Use this property to provide your slides.
     */
    children: React.PropTypes.node.isRequired,

    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    containerStyle: Animated.View.propTypes.style,

    /**
     * If true, it will disable touch events.
     * This is useful when you want to prohibit the user from changing slides.
     */
    disabled: React.PropTypes.bool,

    /**
     * This is the index of the slide to show.
     * This is useful when you want to change the default slide shown.
     * Or when you have tabs linked to each slide.
     */
    index: React.PropTypes.number,

    /**
     * This is callback prop. It's call by the
     * component when the shown slide change after a swipe made by the user.
     * This is useful when you have tabs linked to each slide.
     */
    onChangeIndex: React.PropTypes.func,

    /**
     * This is callback prop. It's called by the
     * component when the slide switching.
     * This is useful when you want to implement something corresponding to the current slide position.
     */
    onSwitching: React.PropTypes.func,

    /**
     * If true, it will add bounds effect on the edges.
     */
    resistance: React.PropTypes.bool,

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
    threshold: React.PropTypes.number,
  };

  static defaultProps = {
    index: 0,
    threshold: 5,
    resistance: false,
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      indexLatest: props.index,
      indexCurrent: new Animated.Value(props.index),
      viewWidth: Dimensions.get('window').width,
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderRelease: this.handleTouchEnd,
      onPanResponderTerminate: this.handleTouchEnd,
      onPanResponderMove: this.handleTouchMove,
      onPanResponderGrant: this.handleTouchStart,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      index,
    } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      this.setState({
        indexLatest: index,
      }, () => {
        Animated.spring(this.state.indexCurrent, {
          toValue: index,
          tension: 300,
          friction: 30,
        }).start();
      });
    }
  }

  handleTouchStart = (event, gestureState) => {
    this.startX = gestureState.x0;
  };

  handleTouchMove = (event, gestureState) => {
    const {
      moveX,
    } = gestureState;

    let index = this.state.indexLatest + (this.startX - moveX) / this.state.viewWidth;

    const indexMax = React.Children.count(this.props.children) - 1;

    if (!this.props.resistance) {
      // Reset the starting point
      if (index < 0) {
        index = 0;
        this.startX = moveX;
      } else if (index > indexMax) {
        index = indexMax;
        this.startX = moveX;
      }
    } else {
      if (index < 0) {
        index = Math.exp(index * RESISTANCE_COEF) - 1;
      } else if (index > indexMax) {
        index = indexMax + 1 - Math.exp((indexMax - index) * RESISTANCE_COEF);
      }
    }

    this.state.indexCurrent.setValue(index);

    if (this.props.onSwitching) {
      this.props.onSwitching(index);
    }
  };

  handleTouchEnd = (event, gestureState) => {
    const {
      vx,
      moveX,
    } = gestureState;

    const indexStart = this.state.indexLatest;
    const indexCurrent = indexStart + (this.startX - moveX) / this.state.viewWidth;

    let indexNew;

    // Quick movement
    if (Math.abs(vx) * 10 > this.props.threshold) {
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

    const indexMax = React.Children.count(this.props.children) - 1;

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
        this.props.onSwitching(indexNew);
      }

      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(indexNew);
      }
    });
  };

  handleLayout = (event) => {
    const {width} = event.nativeEvent.layout;

    if (width) {
      this.setState({
        viewWidth: width,
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
      viewWidth,
    } = this.state;

    const slideStyleObj = [styles.slide, slideStyle];

    const childrenToRender = React.Children.map(children, (child) => {
      return (
        <View style={slideStyleObj}>
          {child}
        </View>
      );
    });

    const sceneContainerStyle = [
      styles.container,
      {
        width: viewWidth * React.Children.count(children),
        transform: [
          {
            translateX: indexCurrent.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -viewWidth],
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
