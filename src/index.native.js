import React, {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ViewPagerAndroid,
  Platform,
} from 'react-native';

const {
  width,
  height,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  slide: {
    backgroundColor: 'transparent',
  },
});

class SwipeableViews extends React.Component {
  static propTypes = {
    automaticallyAdjustContentInsets: React.PropTypes.bool,
    bounces: React.PropTypes.bool,
    children: React.PropTypes.node.isRequired,
    horizontal: React.PropTypes.bool,
    index: React.PropTypes.number,
    pagingEnabled: React.PropTypes.bool,
    removeClippedSubviews: React.PropTypes.bool,
    scrollsToTop: React.PropTypes.bool,
    showsHorizontalScrollIndicator: React.PropTypes.bool,
    showsPagination: React.PropTypes.bool,
    showsVerticalScrollIndicator: React.PropTypes.bool,
    style: View.propTypes.style,
  };

  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    index: 0,
  };

  constructor(props, context) {
    super(props, context);

    this.state = this.initState(this.props);
  }

  componentWillMount() {
    this.props = Platform.OS === 'ios' ? this.injectState(this.props) : this.injectStateAndroid(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState(this.initState(props));
  }

  initState(props) {
    const initState = {
      isScrolling: false,
    };

    initState.total = props.children ? props.children.length || 1 : 0;
    initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;

    initState.dir = props.horizontal === false ? 'y' : 'x';
    initState.width = props.width || width;
    initState.height = props.height || height;

    //android not use offset
    if (Platform.OS === 'ios' && initState.total > 1) {
      initState.offset = {};
      const setup = initState.index;
      initState.offset[initState.dir] = initState.dir === 'y'
        ? initState.height * setup
        : initState.width * setup;
    }
    return initState;
  }

  handleScrollBegin = () => {
    // update scroll state
    this.setState({
      isScrolling: true,
    });
  };

  handleScrollEnd = (event) => {
    // update scroll state
    this.setState({
      isScrolling: false,
    });

    this.updateIndexIOS(event.nativeEvent.contentOffset, this.state.dir);
  };

  handleScrollEndAndroid = (event) => {
    // update scroll state
    this.setState({
      isScrolling: false,
    });

    this.updateIndexAndroid(event.nativeEvent.position, this.state.dir);
  };

  updateIndexAndroid(position) {
    this.setState({
      index: position - 1,
    });
  }

  updateIndexIOS(offset, dir) {
    const state = this.state;
    let index = state.index;
    const diff = offset[dir] - state.offset[dir];
    const step = dir === 'x' ? state.width : state.height;

    // Do nothing if offset no change.
    if (!diff) return;

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    index = index + diff / step;

    this.setState({
      index: index,
      offset: offset,
    });
  }

  scrollTo(index) {
    if (this.state.total < 2) return;
    const state = this.state;
    const diff = index + this.state.index;
    let x = 0;
    let y = 0;
    if (state.dir === 'x') x = diff * state.width;
    if (state.dir === 'y') y = diff * state.height;
    if (Platform.OS === 'ios') {
      if (this.state.isScrolling) return;
      if (this.refs.scrollView) {
        this.refs.scrollView.scrollTo(y, x);
      }
    } else {
      this.updateIndexAndroid(diff);
      if (this.refs.scrollView) {
        this.refs.scrollView.setPage(diff);
      }
    }

    this.setState({
      isScrolling: true,
    });
  }

  renderScrollView(pages) {
    if (Platform.OS === 'ios') {
      return (
        <ScrollView ref="scrollView"
          {...this.props}
          contentContainerStyle={[styles.wrapper, this.props.style]}
          contentOffset={this.state.offset}
          onScrollBeginDrag={this.handleScrollBegin}
          onMomentumScrollEnd={this.handleScrollEnd}
        >
          {pages}
        </ScrollView>
      );
    } else {
      return (
        <ViewPagerAndroid
          ref="scrollView"
          style={{flex: 1}}
          {...this.props}
          index={this.state.index}
          onPageSelected={this.handleScrollEndAndroid}
          initialPage={1}
        >
        {pages}
        </ViewPagerAndroid>
      );
    }
  }

  injectState(props) {
    for (const prop in props) {
      if (typeof props[prop] === 'function') {
        const originResponder = props[prop];
        props[prop] = (event) => originResponder(event, this.state, this);
      }
    }

    return props;
  }

  injectStateAndroid(props) {
    for (const prop in props) {
      if (typeof props[prop] === 'function'
        && prop !== 'onPageSelected'
      ) {
        const originResponder = props[prop];
        props[prop] = (event) => originResponder(event, this.state, this);
      }
    }

    return props;
  }

  render() {
    const state = this.state;
    const props = this.props;
    const children = props.children;
    const total = state.total;

    let pages = [];
    const pageStyle = [
      {
        width: state.width,
        height: state.height,
      },
      styles.slide,
    ];

    // For make infinite at least total > 0
    if (total > 0) {
      // Re-design a loop model for avoid img flickering
      pages = Object.keys(children);

      pages = pages.map((page, i) =>
        <View style={pageStyle} key={i}>{children[page]}</View>
      );
    } else {
      pages = <View style={pageStyle}>{children}</View>;
    }

    return (
      <View
        style={[styles.container, {
          width: state.width,
          height: state.height,
        }]}
      >
        {this.renderScrollView(pages)}
      </View>
    );
  }
}

export default SwipeableViews;
