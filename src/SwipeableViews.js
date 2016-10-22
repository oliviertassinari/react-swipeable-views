/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component, PropTypes, Children } from 'react';
import { Motion, spring } from 'react-motion';
import warning from 'warning';
import { UNCERTAINTY_THRESHOLD } from './constant';
import checkIndexBounds from './utils/checkIndexBounds';
import computeIndex from './utils/computeIndex';
import getDisplaySameSlide from './utils/getDisplaySameSlide';

const styles = {
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

const axisProperties = {
  root: {
    x: {
      overflowX: 'hidden',
    },
    'x-reverse': {
      overflowX: 'hidden',
    },
    y: {
      overflowY: 'hidden',
    },
    'y-reverse': {
      overflowY: 'hidden',
    },
  },
  flexDirection: {
    x: 'row',
    'x-reverse': 'row-reverse',
    y: 'column',
    'y-reverse': 'column-reverse',
  },
  transform: {
    x: (translate) => `translate(${-translate}%, 0)`,
    'x-reverse': (translate) => `translate(${translate}%, 0)`,
    y: (translate) => `translate(0, ${-translate}%)`,
    'y-reverse': (translate) => `translate(0, ${translate}%)`,
  },
  length: {
    x: 'width',
    'x-reverse': 'width',
    y: 'height',
    'y-reverse': 'height',
  },
  rotationMatrix: {
    x: {
      x: [1, 0],
      y: [0, 1],
    },
    'x-reverse': {
      x: [-1, 0],
      y: [0, 1],
    },
    y: {
      x: [0, 1],
      y: [1, 0],
    },
    'y-reverse': {
      x: [0, -1],
      y: [1, 0],
    },
  },
};

// We are using a 2x2 rotation matrix.
function applyRotationMatrix(touch, axis) {
  const rotationMatrix = axisProperties.rotationMatrix[axis];

  return {
    pageX: (rotationMatrix.x[0] * touch.pageX) + (rotationMatrix.x[1] * touch.pageY),
    pageY: (rotationMatrix.y[0] * touch.pageX) + (rotationMatrix.y[1] * touch.pageY),
  };
}

function getDomTreeShapes(element, rootNode) {
  const domTreeShapes = [];

  while (element && element !== rootNode.firstChild) {
    // Ignore the nodes that have no width.
    if (element.clientWidth > 0) {
      domTreeShapes.push({
        element,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollLeft: element.scrollLeft,
      });
    }

    element = element.parentNode;
  }

  return domTreeShapes
    .slice(0, -2) // Remove internal elements.
    .filter((shape) => shape.scrollWidth > shape.clientWidth); // Keep elements with a scroll.
}

// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
let nodeHowClaimedTheScroll = null;

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
     * @param {integer} indexLatest This is the oldest index of the slide.
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
    onTouchMove: PropTypes.func,
    /**
     * @ignore
     */
    onTouchStart: PropTypes.func,
    /**
     * The callback that fires when the animation comes to a rest.
     * This is useful to defer CPU intensive task.
     */
    onTransitionEnd: PropTypes.func,
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
    animateHeight: false,
    animateTransitions: true,
    axis: 'x',
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
    if (process.env.NODE_ENV !== 'production') {
      checkIndexBounds(this.props);
    }

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
      if (process.env.NODE_ENV !== 'production') {
        checkIndexBounds(nextProps);
      }

      this.setState({
        indexCurrent: index,
        indexLatest: index,
        // If true, we are going to display the same slide. We shoudn't animate it.
        displaySameSlide: getDisplaySameSlide(this.props, nextProps),
      });
    }
  }

  viewLength = 0;
  startX = 0;
  lastX = 0;
  vx = 0;
  startY = 0;
  isSwiping = undefined;
  started = false;

  handleTouchStart = (event) => {
    const {
      axis,
      onTouchStart,
    } = this.props;

    if (onTouchStart) {
      onTouchStart(event);
    }

    const touch = applyRotationMatrix(event.touches[0], axis);

    this.viewLength = this.node.getBoundingClientRect()[axisProperties.length[axis]];
    this.startX = touch.pageX;
    this.lastX = touch.pageX;
    this.vx = 0;
    this.startY = touch.pageY;
    this.isSwiping = undefined;
    this.started = true;
  };

  handleTouchMove = (event) => {
    if (this.props.onTouchMove) {
      this.props.onTouchMove(event);
    }

    // The touch start event can be cancel.
    // Makes sure we set a starting point.
    if (!this.started) {
      this.handleTouchStart(event);
      return;
    }

    // We are not supposed to hanlde this touch move.
    if (nodeHowClaimedTheScroll !== null && nodeHowClaimedTheScroll !== this.node) {
      return;
    }

    const {
      axis,
      children,
      onSwitching,
      resistance,
    } = this.props;

    const touch = applyRotationMatrix(event.touches[0], axis);

    // We don't know yet.
    if (this.isSwiping === undefined) {
      const dx = Math.abs(this.startX - touch.pageX);
      const dy = Math.abs(this.startY - touch.pageY);

      const isSwiping = dx > dy && dx > UNCERTAINTY_THRESHOLD;

      // We are likely to be swiping, let's prevent the scroll event.
      if (dx > dy) {
        event.preventDefault();
      }

      if (isSwiping === true || dy > UNCERTAINTY_THRESHOLD) {
        this.isSwiping = isSwiping;
        this.startX = touch.pageX; // Shift the starting point.

        return; // Let's wait the next touch event to move something.
      }
    }

    if (this.isSwiping !== true) {
      return;
    }

    // We are swiping, let's prevent the scroll event.
    event.preventDefault();

    // Low Pass filter.
    this.vx = (this.vx * 0.5) + ((touch.pageX - this.lastX) * 0.5);
    this.lastX = touch.pageX;

    const {
      index,
      startX,
    } = computeIndex({
      children,
      resistance,
      pageX: touch.pageX,
      indexLatest: this.state.indexLatest,
      startX: this.startX,
      viewLength: this.viewLength,
    });

    // Add support for native scroll elements.
    if (nodeHowClaimedTheScroll === null) {
      const domTreeShapes = getDomTreeShapes(event.target, this.node);

      const hasFoundNativeHandler = domTreeShapes.some((shape) => {
        if (
          (index >= this.state.indexCurrent && shape.scrollLeft + shape.clientWidth < shape.scrollWidth) ||
          (index <= this.state.indexCurrent && shape.scrollLeft > 0)
        ) {
          nodeHowClaimedTheScroll = shape.element;
          return true;
        }

        return false;
      });

      // We abort the touch move handler.
      if (hasFoundNativeHandler) {
        return;
      }
    }

    // We are moving toward the edges.
    if (startX) {
      this.startX = startX;
    } else if (nodeHowClaimedTheScroll === null) {
      nodeHowClaimedTheScroll = this.node;
    }

    this.setState({
      isDragging: true,
      indexCurrent: index,
    }, () => {
      if (onSwitching) {
        onSwitching(index, 'move');
      }
    });
  };

  handleTouchEnd = (event) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }

    nodeHowClaimedTheScroll = null;

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
    } else if (Math.abs(indexLatest - indexCurrent) > 0.6) { // Some hysteresis with indexLatest
      indexNew = Math.round(indexCurrent);
    } else {
      indexNew = indexLatest;
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
      displaySameSlide: false,
    }, () => {
      if (this.props.onSwitching) {
        this.props.onSwitching(indexNew, 'end');
      }

      if (this.props.onChangeIndex && indexNew !== indexLatest) {
        this.props.onChangeIndex(indexNew, indexLatest);
      }
    });
  };

  updateHeight(node) {
    if (node !== null) {
      const child = node.children[0];
      if (child !== undefined && child.offsetHeight !== undefined &&
        this.state.heightLatest !== child.offsetHeight) {
        this.setState({
          heightLatest: child.offsetHeight,
        });
      }
    }
  }

  renderContainer(interpolatedStyle, animateHeight, childrenToRender) {
    const {
      axis,
      containerStyle,
    } = this.props;

    const transform = axisProperties.transform[axis](interpolatedStyle.translate);

    const styleNew = {
      WebkitTransform: transform,
      transform,
      height: null,
      flexDirection: axisProperties.flexDirection[axis],
    };

    if (animateHeight) {
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
      animateHeight,
      animateTransitions,
      axis,
      children,
      containerStyle,
      disabled,
      index, // eslint-disable-line no-unused-vars
      onChangeIndex, // eslint-disable-line no-unused-vars
      onSwitching, // eslint-disable-line no-unused-vars
      resistance, // eslint-disable-line no-unused-vars
      slideStyle,
      springConfig,
      style,
      threshold, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {
      displaySameSlide,
      heightLatest,
      indexCurrent,
      isDragging,
      isFirstRender,
    } = this.state;

    const translate = indexCurrent * 100;
    const height = heightLatest;

    const motionStyle = (isDragging || !animateTransitions || displaySameSlide) ? {
      translate,
      height,
    } : {
      translate: spring(translate, springConfig),
      height: height !== 0 ? spring(height, springConfig) : 0,
    };

    const touchEvents = disabled ? {} : {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
    };

    // There is no point to animate if we are already providing a height.
    warning(
      !animateHeight ||
      !containerStyle ||
      (!containerStyle.height && !containerStyle.maxHeight && !containerStyle.minHeight),
      `react-swipeable-view: You are setting animateHeight to true but you are also providing a custom height.
      The custom height has a higher priority than the animateHeight property.
      So animateHeight is most likely having no effect at all.`,
    );

    const slideStyleObj = Object.assign({}, styles.slide, slideStyle);

    const childrenToRender = Children.map(children, (child, indexChild) => {
      if (isFirstRender && indexChild > 0) {
        return null;
      }

      let ref;

      if (animateHeight && indexChild === this.state.indexLatest) {
        ref = (node) => this.updateHeight(node);
        slideStyleObj.overflowY = 'hidden';
      }

      return (
        <div ref={ref} style={slideStyleObj}>
          {child}
        </div>
      );
    });

    return (
      <div
        ref={(node) => { this.node = node; }}
        style={Object.assign({}, axisProperties.root[axis], style)}
        {...other}
        {...touchEvents}
      >
        <Motion style={motionStyle} onRest={this.props.onTransitionEnd}>
          {(interpolatedStyle) => this.renderContainer(interpolatedStyle, animateHeight, childrenToRender)}
        </Motion>
      </div>
    );
  }
}

export default SwipeableViews;
