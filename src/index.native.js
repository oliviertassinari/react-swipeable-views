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
      index: props.index,
      width: props.width || windowWidth,
      height: props.height || windowHeight,
    };

    //android not use offset
    if (Platform.OS === 'ios') {
      initState.offset = {
        x: initState.width * initState.index,
      };
    }

    return initState;
  }

  handleScrollEndIOS = (event) => {
    const offset = event.nativeEvent.contentOffset;

    this.setState({
      index: this.state.index + (offset.x - this.state.offset.x) / this.state.width,
      offset: offset,
    });
  };

  handleScrollEndAndroid = (event) => {
    this.setState({
      index: event.nativeEvent.position - 1,
    });
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
      index,
    } = this.state;

    const slideStyleObj = [
      {
        width: width,
        height: height / 4,
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
            horizontal={true}
            pagingEnabled={true}
            scrollsToTop={false}
            bounces={resistance}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.container, containerStyle]}
            contentOffset={this.state.offset}
            onMomentumScrollEnd={this.handleScrollEndIOS}
          >
            {childrenToRender}
          </ScrollView>
        ) : (
          <ViewPagerAndroid
            {...other}
            ref="scrollView"
            style={[{flex: 1}, containerStyle]}
            initialPage={index}
            onPageSelected={this.handleScrollEndAndroid}
          >
            {childrenToRender}
          </ViewPagerAndroid>
        )}
      </View>
    );
  }
}

export default SwipeableViews;
