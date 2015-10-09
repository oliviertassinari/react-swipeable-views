'use strict';

const React = require('react');
const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
const {Motion, spring} = require('react-motion');
const objectAssign = require('object-assign');

const styles = {
  root: {
    overflowX: 'hidden',
  },
  container: {
    display: 'flex',
  },
  slide: {
    width: '100%',
    flexShrink: 0,
    overflow: 'auto',
  },
};

const SwipeableViews = React.createClass({
  propTypes: {
    children: React.PropTypes.node,

    /**
     * This is the index of the slide to show.
     * This is useful when you want to change the default slide shown.
     * Or when you have tabs linked to each slide
     */
    index: React.PropTypes.number,

    /**
     * This is callback prop. It's call by the
     * component when the shown slide change after a swipe made by the user.
     * This is useful when you have tabs linked to each slide.
     */
    onChangeIndex: React.PropTypes.func,

    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    style: React.PropTypes.object,

    /**
     * This is the threshold used for detecting a quick swipe.
     * If the computed speed is above this value, the index change.
     */
    threshold: React.PropTypes.number,
  },
  mixins: [
    PureRenderMixin,
  ],
  getDefaultProps: function() {
    return {
      index: 0,
      threshold: 5,
    };
  },
  getInitialState: function() {
    return {
      index: this.props.index,
      isDragging: false,
      isFirstRender: true,
    };
  },
  componentDidMount: function() {
    this.setState({
      isFirstRender: false,
    });
  },
  componentWillReceiveProps: function(nextProps) {
    const {
      index,
    } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      this.setState({
        index: index,
      });
    }
  },
  handleTouchStart: function(event) {
    const touch = event.touches[0];

    this.startWidth = React.findDOMNode(this).getBoundingClientRect().width;
    this.startIndex = this.state.index;
    this.startX = touch.pageX;
    this.lastX = touch.pageX;
    this.deltaX = 0;
    this.startY = touch.pageY;
    this.isScroll = undefined;
  },
  handleTouchMove: function(event) {
    const touch = event.touches[0];

    // This is a one time test
    if (this.isScroll === undefined) {
      this.isScroll = Math.abs(this.startY - touch.pageY) > Math.abs(this.startX - touch.pageX);
    }

    if (this.isScroll) {
      return;
    }

    // Prevent native scrolling
    event.preventDefault();

    this.deltaX = touch.pageX - this.lastX;
    this.lastX = touch.pageX;

    const indexMax = React.Children.count(this.props.children) - 1;

    let index = this.startIndex + (this.startX - touch.pageX) / this.startWidth;

    if (index < 0) {
      index = 0;
      this.startX = touch.pageX;
    } else if (index > indexMax) {
      index = indexMax;
      this.startX = touch.pageX;
    }

    this.setState({
      isDragging: true,
      index: index,
    });
  },
  handleTouchEnd: function() {
    if (this.isScroll) {
      return;
    }

    let indexNew;

    // Quick movement
    if (Math.abs(this.deltaX) > this.props.threshold) {
      if (this.deltaX > 0) {
        indexNew = Math.floor(this.state.index);
      } else {
        indexNew = Math.ceil(this.state.index);
      }
    } else {
      // Some hysteresis with startIndex
      if (Math.abs(this.startIndex - this.state.index) > 0.6) {
        indexNew = Math.round(this.state.index);
      } else {
        indexNew = this.startIndex;
      }
    }

    this.setState({
      index: indexNew,
      isDragging: false,
    });

    if (this.props.onChangeIndex && indexNew !== this.startIndex) {
      this.props.onChangeIndex(indexNew);
    }
  },
  renderContainer: function(translate) {
    const {
      children,
      style,
    } = this.props;

    const {
      isFirstRender,
    } = this.state;

    let childrenToRender;

    if (isFirstRender) {
      childrenToRender = children[0];
    } else {
      childrenToRender = React.Children.map(children, (element) => {
        return (
          <div style={styles.slide}>
            {element}
          </div>
        );
      });
    }

    return (
      <div style={objectAssign({
        WebkitTransform: `translate3d(${translate}px, 0, 0)`,
        transform: `translate3d(-${translate}%, 0, 0)`,
      }, styles.container, style)}>
        {childrenToRender}
      </div>
    );
  },
  render: function() {
    const {
      index,
      isDragging,
    } = this.state;

    const springConfig = isDragging ? [3000, 50] : [300, 30];

    const style = {
      translate: spring(index * 100, springConfig),
    };

    return (
      <div style={styles.root}
        onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        <Motion style={style}>
          {value => this.renderContainer(value.translate)}
        </Motion>
      </div>
    );
  },
});

module.exports = SwipeableViews;
