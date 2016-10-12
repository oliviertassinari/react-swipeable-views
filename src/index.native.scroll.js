// @flow weak
/**
 * This is an alternative version that use `ScrollView` and `ViewPagerAndroid`.
 * I'm not sure what version give the best UX experience.
 * I'm keeping the two versions here until we figured out.
 */

import React, { Component, PropTypes, Children } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ViewPagerAndroid,
  Platform,
} from 'react-native';
import warning from 'warning';
import checkIndexBounds from './utils/checkIndexBounds';

const {
  width: windowWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
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
    children: PropTypes.node,
    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    containerStyle: ScrollView.propTypes.style,
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
  };

  static defaultProps = {
    animateTransitions: true,
    disabled: false,
    index: 0,
    resistance: false,
  };

  state = {};

  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      checkIndexBounds(this.props);
    }

    const initState = {
      indexLatest: this.props.index,
      viewWidth: windowWidth,
      offset: {},
    };

    // android not use offset
    if (Platform.OS === 'ios') {
      initState.offset = {
        x: initState.viewWidth * initState.indexLatest,
      };
    }

    this.setState(initState);

    warning(!this.props.animateHeight,
      'react-swipeable-view: The animateHeight property is not implement yet.');
    warning(!this.props.axis, 'react-swipeable-view: The axis property is not implement yet.');
  }

  componentWillReceiveProps(nextProps) {
    const {
      index,
    } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      checkIndexBounds(nextProps);

      this.setState({
        indexLatest: index,
        offset: {
          x: this.state.viewWidth * index,
        },
      }, () => {
        if (Platform.OS === 'android') {
          if (this.props.animateTransitions) {
            this.refs.scrollView.setPage(index);
          } else {
            this.refs.scrollView.setPageWithoutAnimation(index);
          }
        }
      });
    }
  }

  handleScroll = (event) => {
    if (this.props.onSwitching) {
      this.props.onSwitching(event.nativeEvent.contentOffset.x / this.state.viewWidth, 'move');
    }
  };

  handleMomentumScrollEnd = (event) => {
    const offset = event.nativeEvent.contentOffset;

    const indexNew = offset.x / this.state.viewWidth;
    const indexLatest = this.state.indexLatest;

    this.setState({
      indexLatest: indexNew,
      offset,
    }, () => {
      if (this.props.onSwitching) {
        this.props.onSwitching(indexNew, 'end');
      }

      if (this.props.onChangeIndex && indexNew !== indexLatest) {
        this.props.onChangeIndex(indexNew, indexLatest);
      }
    });
  };

  handlePageSelected = (event) => {
    const indexLatest = this.state.indexLatest;
    const indexNew = event.nativeEvent.position;

    this.setState({
      indexLatest: indexNew,
    }, () => {
      if (this.props.onSwitching) {
        this.props.onSwitching(indexNew, 'end');
      }

      if (this.props.onChangeIndex && indexNew !== indexLatest) {
        this.props.onChangeIndex(indexNew, indexLatest);
      }
    });
  };

  handlePageScroll = (event) => {
    if (this.props.onSwitching) {
      this.props.onSwitching(event.nativeEvent.offset + event.nativeEvent.position, 'move');
    }
  };

  handleLayout = (event) => {
    const {
      width,
    } = event.nativeEvent.layout;

    if (width) {
      this.setState({
        viewWidth: width,
        offset: {
          x: this.state.indexLatest * width,
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
      ...other,
    } = this.props;

    const {
      viewWidth,
      indexLatest,
      offset,
    } = this.state;

    const slideStyleObj = [
      styles.slide,
      {
        width: viewWidth,
      },
      slideStyle,
    ];

    const childrenToRender = Children.map(children, (element, index) => {
      if (disabled && indexLatest !== index) {
        return null;
      }

      return (
        <View style={slideStyleObj}>
          {element}
        </View>
      );
    });

    return (
      <View
        onLayout={this.handleLayout}
        style={[
          styles.root,
          style,
        ]}
      >
        {(Platform.OS === 'ios') ? (
          <ScrollView
            {...other}
            ref="scrollView"
            style={[styles.container, containerStyle]}
            horizontal
            pagingEnabled
            scrollsToTop={false}
            bounces={resistance}
            onScroll={this.handleScroll}
            scrollEventThrottle={200}
            showsHorizontalScrollIndicator={false}
            contentOffset={offset}
            onMomentumScrollEnd={this.handleMomentumScrollEnd}
          >
            {childrenToRender}
          </ScrollView>
        ) : (
          <ViewPagerAndroid
            {...other}
            ref="scrollView"
            style={[styles.container, containerStyle]}
            initialPage={indexLatest}
            onPageSelected={this.handlePageSelected}
            onPageScroll={this.handlePageScroll}
          >
            {childrenToRender}
          </ViewPagerAndroid>
        )}
      </View>
    );
  }
}

export default SwipeableViews;
