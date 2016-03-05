import React, {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ViewPagerAndroid,
  Platform,
} from 'react-native';

const {
  width: windowWidth,
  height: windowHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
  },
  container: {
    flex: 1,
  },
  slide: {
  },
});

class SwipeableViews extends React.Component {
  static propTypes = {
    /**
     * Use this property to provide your slides.
     */
    children: React.PropTypes.node,

    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    containerStyle: React.PropTypes.object,

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
    slideStyle: React.PropTypes.object,

    /**
     * This is the inlined style that will be applied
     * on the root component.
     */
    style: View.propTypes.style,
  };

  static defaultProps = {
    index: 0,
    resistance: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = this.initState(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState(this.initState(props));
  }

  initState(props) {
    const initState = {
      indexLatest: props.index,
      width: props.width || windowWidth,
      height: props.height || windowHeight,
    };

    //android not use offset
    if (Platform.OS === 'ios') {
      initState.offset = {
        x: initState.width * initState.indexLatest,
      };
    }

    return initState;
  }

  handleScroll = (event) => {
    if (this.props.onSwitching) {
      this.props.onSwitching(event.nativeEvent.contentOffset.x / this.state.width);
    }
  };

  handleMomentumScrollEnd = (event) => {
    const offset = event.nativeEvent.contentOffset;

    const indexNew = offset.x / this.state.width;
    const indexLatest = this.state.indexLatest;

    this.setState({
      indexLatest: indexNew,
      offset: offset,
    }, () => {
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
      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(indexNew, indexLatest);
      }
    });
  };

  handlePageScroll = (event) => {
    if (this.props.onSwitching) {
      this.props.onSwitching(event.nativeEvent.offset + event.nativeEvent.position);
    }
  };

  render() {
    const {
      resistance,
      children,
      slideStyle,
      style,
      containerStyle,
      ...other,
    } = this.props;

    const {
      width,
      height,
      indexLatest,
      offset,
    } = this.state;

    const slideStyleObj = [
      {
        width: width,
      },
      styles.slide,
      slideStyle,
    ];

    const childrenToRender = React.Children.map(children, (element) => {
      return (
        <View style={slideStyleObj}>
          {element}
        </View>
      );
    });

    return (
      <View
        style={[
          styles.root,
          {
            width: width,
            height: height / 4,
          },
          style,
        ]}
      >
        {(Platform.OS === 'ios') ? (
          <ScrollView
            {...other}
            ref="scrollView"
            style={[styles.container, containerStyle]}
            horizontal={true}
            pagingEnabled={true}
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
