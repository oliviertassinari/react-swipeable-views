import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Motion, spring} from 'react-motion';
import objectAssign from 'object-assign';

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
     * If true disable touch events
     */
    disabled: React.PropTypes.bool,

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
  getDefaultProps() {
    return {
      index: 0,
      threshold: 5,
      disabled: false,
    };
  },
  getInitialState() {
    return {
      index: this.props.index,
      indexLatest: this.props.index,
      isDragging: false,
      isFirstRender: true,
    };
  },
  componentDidMount() {
    this.setState({
      isFirstRender: false,
    });
  },
  componentWillReceiveProps(nextProps) {
    const {
      index,
    } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      this.setState({
        index: index,
        indexLatest: index,
      });
    }
  },
  slides: [],
  handleTouchStart(event) {
    const touch = event.touches[0];

    this.startWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
    this.startIndex = this.state.index;
    this.startX = touch.pageX;
    this.lastX = touch.pageX;
    this.deltaX = 0;
    this.startY = touch.pageY;
    this.isScroll = undefined;
  },
  handleTouchMove(event) {
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

    this.deltaX = this.deltaX * 0.5 + (touch.pageX - this.lastX) * 0.5;
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
  handleTouchEnd() {
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
      indexLatest: indexNew,
      isDragging: false,
    });

    if (this.props.onChangeIndex && indexNew !== this.startIndex) {
      this.props.onChangeIndex(indexNew);
    }
  },
  getHeightSlide(index) {
    const slide = this.slides[index];
    if (slide !== undefined) {
      const child = slide.children[0];
      if (child !== undefined) {
        return child.clientHeight;
      }
    }
    return 0;
  },
  renderContainer(interpolatedStyle) {
    const {
      children,
      style,
    } = this.props;

    const {
      isFirstRender,
    } = this.state;

    this.slides = [];
    let childrenToRender;

    if (isFirstRender) {
      childrenToRender = (
        <div ref={(s) => this.slides[0] = s} style={styles.slide}>
          {React.Children.toArray(children)[0]}
        </div>
      );
    } else {
      childrenToRender = React.Children.map(children, (element, i) => {
        return (
          <div ref={(s) => this.slides[i] = s} style={styles.slide}>
            {element}
          </div>
        );
      });
    }

    return (
      <div style={objectAssign({
        WebkitTransform: `translate3d(-${interpolatedStyle.translate}%, 0, 0)`,
        transform: `translate3d(-${interpolatedStyle.translate}%, 0, 0)`,
        height: interpolatedStyle.height,
      }, styles.container, style)}>
        {childrenToRender}
      </div>
    );
  },
  render() {
    const {
      disabled,
      style,
    } = this.props;

    const {
      index,
      indexLatest,
      isDragging,
    } = this.state;

    const translate = index * 100;

    let height = 0;
    // There is no point to animate if we already provide a height
    if (!style || !style.height) {
      height = this.getHeightSlide(indexLatest);
    }

    const motionStyle = isDragging ? {
      translate: translate,
      height: height,
    } : {
      translate: spring(translate, [300, 30]),
      height: height !== 0 ? spring(height, [300, 30]) : 0,
    };

    const touchEvents = disabled ? {} : {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
    };

    return (
      <div style={styles.root} {...touchEvents}>
        <Motion style={motionStyle}>
          {interpolatedStyle => this.renderContainer(interpolatedStyle)}
        </Motion>
      </div>
    );
  },
});

export default SwipeableViews;
