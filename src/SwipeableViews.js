/* eslint-disable flowtype/require-valid-file-annotation */

import React, {Component, PropTypes, Children} from 'react';
import {findDOMNode} from 'react-dom';
import {Motion, spring} from 'react-motion';

const styles = {
  root: {
    overflowX: 'hidden',
  },
  container: {
    display: 'flex',
    willChange: 'transform',
  },
  slide: {
    width: '100%',
    flexShrink: 0,
    overflow: 'auto',
  },
};

const RESISTANCE_COEF = 0.7;
const UNCERTAINTY_THRESHOLD = 3; // px

class SwipeableViews extends Component {
  static propTypes = {
    /**
     * If `false`, changes to the index prop will not cause an animated transition.
     */
    animateTransitions: PropTypes.bool,
    /**
     * Use this property to provide your slides.
     */
    children: PropTypes.node.isRequired,
    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    containerStyle: PropTypes.object,
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
    onTouchEnd: PropTypes.func,
    /**
     * @ignore
     */
    onTouchStart: PropTypes.func,
    /**
     * If `true`, it will add bounds effect on the edges.
     */
    resistance: PropTypes.bool,
    /**
     * This is the inlined style that will be applied
     * on the slide component.
     */
    slideStyle: PropTypes.object,
    /**
     * This is the config given to react-motion for the spring.
     * This is useful to change the dynamic of the transition.
     */
    springConfig: PropTypes.object,
    /**
     * This is the inlined style that will be applied
     * on the root component.
     */
    style: PropTypes.object,
    /**
     * This is the threshold used for detecting a quick swipe.
     * If the computed speed is above this value, the index change.
     */
    threshold: PropTypes.number,
  };

  static defaultProps = {
    animateTransitions: true,
    index: 0,
    threshold: 5,
    resistance: false,
    disabled: false,
    springConfig: {
      stiffness: 300,
      damping: 30,
    },
  };

  state = {};

  componentWillMount() {
    this.setState({
      indexCurrent: this.props.index,
      indexLatest: this.props.index,
      isDragging: false,
      isFirstRender: true,
      heightLatest: 0,
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      isFirstRender: false,
    });
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentWillReceiveProps(nextProps) {
    const {
      index,
    } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      this.setState({
        indexCurrent: index,
        indexLatest: index,
      });
    }
  }

  startWidth = 0;
  startX = 0;
  lastX = 0;
  vx = 0;
  startY = 0;
  isSwiping = undefined;
  started = false;

  handleTouchStart = (event) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }

    const touch = event.touches[0];

    this.startWidth = findDOMNode(this).getBoundingClientRect().width;
    this.startX = touch.pageX;
    this.lastX = touch.pageX;
    this.vx = 0;
    this.startY = touch.pageY;
    this.isSwiping = undefined;
    this.started = true;
  };

  handleTouchMove = (event) => {
    // The touch start event can be cancel.
    // Makes sure we set a starting point.
    if (!this.started) {
      this.handleTouchStart(event);
      return;
    }

    const touch = event.touches[0];

    // We don't know yet.
    if (this.isSwiping === undefined) {
      if (event.defaultPrevented) {
        this.isSwiping = false;
      } else {
        const dx = Math.abs(this.startX - touch.pageX);
        const dy = Math.abs(this.startY - touch.pageY);

        const isSwiping = dx > dy && dx > UNCERTAINTY_THRESHOLD;

        if (isSwiping === true || dx > UNCERTAINTY_THRESHOLD || dy > UNCERTAINTY_THRESHOLD) {
          this.isSwiping = isSwiping;
          this.startX = touch.pageX; // Shift the starting point.
        }
      }
    }

    if (this.isSwiping !== true) {
      return;
    }

    // Prevent native scrolling
    event.preventDefault();

    this.vx = this.vx * 0.5 + (touch.pageX - this.lastX) * 0.5;
    this.lastX = touch.pageX;

    const indexMax = Children.count(this.props.children) - 1;

    let index = this.state.indexLatest + (this.startX - touch.pageX) / this.startWidth;

    if (!this.props.resistance) {
      // Reset the starting point
      if (index < 0) {
        index = 0;
        this.startX = touch.pageX;
      } else if (index > indexMax) {
        index = indexMax;
        this.startX = touch.pageX;
      }
    } else {
      if (index < 0) {
        index = Math.exp(index * RESISTANCE_COEF) - 1;
      } else if (index > indexMax) {
        index = indexMax + 1 - Math.exp((indexMax - index) * RESISTANCE_COEF);
      }
    }

    this.setState({
      isDragging: true,
      indexCurrent: index,
    }, () => {
      if (this.props.onSwitching) {
        this.props.onSwitching(index, 'move');
      }
    });
  };

  handleTouchEnd = (event) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }

    // The touch start event can be cancel.
    // Makes sure that a starting point is set.
    if (!this.started) {
      return;
    }

    this.started = false;

    if (this.isSwiping !== true) {
      return;
    }

    const indexLatest = this.state.indexLatest;
    const indexCurrent = this.state.indexCurrent;

    let indexNew;

    // Quick movement
    if (Math.abs(this.vx) > this.props.threshold) {
      if (this.vx > 0) {
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
      indexCurrent: indexNew,
      indexLatest: indexNew,
      isDragging: false,
    }, () => {
      if (this.props.onSwitching) {
        this.props.onSwitching(indexNew, 'end');
      }

      if (this.props.onChangeIndex && indexNew !== indexLatest) {
        this.props.onChangeIndex(indexNew, indexLatest);
      }
    });
  };

  updateHeight(node, index) {
    if (node !== null && index === this.state.indexLatest) {
      const child = node.children[0];
      if (child !== undefined && child.offsetHeight !== undefined &&
        this.state.heightLatest !== child.offsetHeight) {
        this.setState({
          heightLatest: child.offsetHeight,
        });
      }
    }
  }

  renderContainer(interpolatedStyle, updateHeight, childrenToRender) {
    const {
      containerStyle,
    } = this.props;

    const translate = -interpolatedStyle.translate;

    const styleNew = {
      WebkitTransform: `translate3d(${translate}%, 0, 0)`,
      transform: `translate3d(${translate}%, 0, 0)`,
      height: null,
    };

    if (updateHeight) {
      styleNew.height = interpolatedStyle.height;
    }

    return (
      <div style={Object.assign({}, styleNew, styles.container, containerStyle)}>
        {childrenToRender}
      </div>
    );
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      index,
      onChangeIndex,
      onSwitching,
      resistance,
      threshold,
      /* eslint-enable no-unused-vars */
      animateTransitions,
      children,
      containerStyle,
      slideStyle,
      disabled,
      springConfig,
      style,
      ...other,
    } = this.props;

    const {
      indexCurrent,
      isDragging,
      isFirstRender,
      heightLatest,
    } = this.state;

    const translate = indexCurrent * 100;
    const height = heightLatest;

    const motionStyle = (isDragging || !animateTransitions) ? {
      translate: translate,
      height: height,
    } : {
      translate: spring(translate, springConfig),
      height: height !== 0 ? spring(height, springConfig) : 0,
    };

    const touchEvents = disabled ? {} : {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
    };

    let updateHeight = true;
    // There is no point to animate if we already provide a height
    if (containerStyle && (containerStyle.height || containerStyle.maxHeight || containerStyle.minHeight)) {
      updateHeight = false;
    }

    const slideStyleObj = Object.assign({}, styles.slide, slideStyle);

    const childrenToRender = Children.map(children, (child, index2) => {
      if (isFirstRender && index2 > 0) {
        return null;
      }

      let ref;

      if (updateHeight) {
        ref = (node) => this.updateHeight(node, index2);
      }

      return (
        <div ref={ref} style={slideStyleObj}>
          {child}
        </div>
      );
    });

    return (
      <div
        {...other}
        style={Object.assign({}, styles.root, style)}
        {...touchEvents}
      >
        <Motion style={motionStyle}>
          {(interpolatedStyle) => this.renderContainer(interpolatedStyle, updateHeight, childrenToRender)}
        </Motion>
      </div>
    );
  }
}

export default SwipeableViews;
