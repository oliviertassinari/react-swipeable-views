// This is an alternative version that use `ScrollView` and `ViewPagerAndroid`.
// I'm not sure what version give the best UX experience.
// I'm keeping the two versions here until we figured out.

import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ViewStyle } from 'react-native';
import { checkIndexBounds, getDisplaySameSlide } from 'react-swipeable-views-core';

const { width: windowWidth } = Dimensions.get('window');

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

interface Props {
  /**
   * If `true`, the height of the container will be animated to match the current slide height.
   * Animating another style property has a negative impact regarding performance.
   */
  animateHeight?: boolean;
  /**
   * If `false`, changes to the index prop will not cause an animated transition.
   */
  animateTransitions?: boolean;
  /**
   * The axis on which the slides will slide.
   */
  axis?: 'x' | 'x-reverse' | 'y' | 'y-reverse';
  /**
   * This is the inlined style that will be applied
   * to each slide container.
   */
  containerStyle?: ViewStyle;
  /**
   * If `true`, it will disable touch events.
   * This is useful when you want to prohibit the user from changing slides.
   */
  disabled?: boolean;
  /**
   * This is the index of the slide to show.
   * This is useful when you want to change the default slide shown.
   * Or when you have tabs linked to each slide.
   */
  index?: number;
  /**
   * This is callback prop. It's call by the
   * component when the shown slide change after a swipe made by the user.
   * This is useful when you have tabs linked to each slide.
   */
  onChangeIndex?: (index: number, fromIndex: number) => void;
  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something
   * corresponding to the current slide position.
   */
  onSwitching?: (index: number, type: 'move' | 'end') => void,
  /**
   * The callback that fires when the animation comes to a rest.
   * This is useful to defer CPU intensive task.
   */
  onTransitionEnd?: () => void,
  /**
   * If `true`, it will add bounds effect on the edges.
   */
  resistance?: boolean;
  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle?: ViewStyle;
  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style?: ViewStyle;
}

interface State {
  indexLatest: number;
  viewWidth: number;
  displaySameSlide?: boolean;
  offset: {
    x: number;
    y: number;
  }
}

class SwipeableViews extends React.Component<Props, State> {
  scrollViewNode: any = null;

  static defaultProps = {
    animateTransitions: true,
    disabled: false,
    index: 0,
    resistance: false,
  }

  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      checkIndexBounds(this.props);
    }

    const { index = 0 } = this.props;

    this.setState({
      indexLatest: index,
      viewWidth: windowWidth,
      offset: {
        x: windowWidth * index,
        y: 0,
      },
    });

    if (this.props.animateHeight !== undefined) {
      console.warn('react-swipeable-view-native: The animateHeight property is not implement yet.')
    }
    if (this.props.axis !== undefined) {
      console.warn('react-swipeable-view-native: The axis property is not implement yet.')
    }
  }

  componentWillReceiveProps(nextProps) {
    const { index } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      if (process.env.NODE_ENV !== 'production') {
        checkIndexBounds(nextProps);
      }

      // If true, we are going to change the children. We shoudn't animate it.
      const displaySameSlide = getDisplaySameSlide(this.props, nextProps);

      this.setState(
        {
          displaySameSlide,
          indexLatest: index,
        },
        () => {
          if (this.scrollViewNode) {
            this.scrollViewNode.scrollTo({
              x: this.state.viewWidth * index,
              y: 0,
              animated: this.props.animateTransitions && !displaySameSlide,
            });
          }
        },
      );
    }
  }

  handleScroll = event => {
    // Filters out when changing the children
    if (this.state.displaySameSlide) {
      return;
    }

    if (this.props.onSwitching) {
      this.props.onSwitching(event.nativeEvent.contentOffset.x / this.state.viewWidth, 'move');
    }
  };

  handleMomentumScrollEnd = event => {
    const indexNew = event.nativeEvent.contentOffset.x / this.state.viewWidth;
    const indexLatest = this.state.indexLatest;

    this.setState(
      {
        indexLatest: indexNew,
      },
      () => {
        if (this.props.onSwitching) {
          this.props.onSwitching(indexNew, 'end');
        }

        if (this.props.onChangeIndex && indexNew !== indexLatest) {
          this.props.onChangeIndex(indexNew, indexLatest);
        }

        if (this.props.onTransitionEnd) {
          this.props.onTransitionEnd();
        }
      },
    );
  };

  handleLayout = event => {
    const { width } = event.nativeEvent.layout;

    if (width) {
      this.setState({
        viewWidth: width,
        offset: {
          x: this.state.indexLatest * width, // Update without animation.
          y: 0,
        },
      });
    }
  };

  render() {
    const {
      resistance,
      children,
      slideStyle,
      style,
      containerStyle,
      disabled,
      onTransitionEnd,
      ...other
    } = this.props;

    const { viewWidth, indexLatest, offset } = this.state;

    const slideStyleObj = [
      styles.slide,
      {
        width: viewWidth,
      },
      slideStyle,
    ];

    const childrenToRender = React.Children.map(children, (child, index) => {
      if (disabled && indexLatest !== index) {
        return null;
      }
      if (!React.isValidElement(child)){
        console.warn(`react-swipeable-view-native: one of the children provided is invalid: ${child}. We are expecting a valid React Element.`)
      }

      return <View style={slideStyleObj}>{child}</View>;
    });

    return (
      <View onLayout={this.handleLayout} style={[styles.root, style]} {...other}>
        <ScrollView
          ref={node => {
            this.scrollViewNode = node;
          }}
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          scrollsToTop={false}
          bounces={resistance}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled
          contentOffset={offset}
          onMomentumScrollEnd={this.handleMomentumScrollEnd}
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          style={[styles.container, containerStyle]}
        >
          {childrenToRender}
        </ScrollView>
      </View>
    );
  }
}

export default SwipeableViews;
