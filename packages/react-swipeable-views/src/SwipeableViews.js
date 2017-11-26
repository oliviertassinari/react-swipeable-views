import React, { Component, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import transitionInfo from 'dom-helpers/transition/properties';
import addEventListener from 'dom-helpers/events/on';
import removeEventListener from 'dom-helpers/events/off';
import {
  constant,
  checkIndexBounds,
  computeIndex,
  getDisplaySameSlide,
} from 'react-swipeable-views-core';

function addEventListenerEnhanced(node, event, handler, options) {
  addEventListener(node, event, handler, options);
  return {
    remove() {
      removeEventListener(node, event, handler, options);
    },
  };
}

let styleInjected = false;

// Support old version of iOS and IE 10.
// To be deleted in 2019.
function injectStyle() {
  // Inject once for all the instances
  if (!styleInjected) {
    const style = document.createElement('style');
    style.innerHTML = `
      .react-swipeable-view-container {
        display: -webkit-box;
        display: -ms-flexbox;
      }
      .react-swipeable-view-container > div {
        -ms-flex-negative: 0;
      }
    `;

    if (document.body) {
      document.body.appendChild(style);
    }
    styleInjected = true;
  }
}

const styles = {
  container: {
    direction: 'ltr',
    display: 'flex',
    willChange: 'transform',
  },
  slide: {
    width: '100%',
    WebkitFlexShrink: 0,
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
    x: translate => `translate(${-translate}%, 0)`,
    'x-reverse': translate => `translate(${translate}%, 0)`,
    y: translate => `translate(0, ${-translate}%)`,
    'y-reverse': translate => `translate(0, ${translate}%)`,
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
  scrollPosition: {
    x: 'scrollLeft',
    'x-reverse': 'scrollLeft',
    y: 'scrollTop',
    'y-reverse': 'scrollTop',
  },
  scrollLength: {
    x: 'scrollWidth',
    'x-reverse': 'scrollWidth',
    y: 'scrollHeight',
    'y-reverse': 'scrollHeight',
  },
  clientLength: {
    x: 'clientWidth',
    'x-reverse': 'clientWidth',
    y: 'clientHeight',
    'y-reverse': 'clientHeight',
  },
};

function createTransition(property, options) {
  const { duration, easeFunction, delay } = options;

  return `${property} ${duration} ${easeFunction} ${delay}`;
}

// We are using a 2x2 rotation matrix.
function applyRotationMatrix(touch, axis) {
  const rotationMatrix = axisProperties.rotationMatrix[axis];

  return {
    pageX: rotationMatrix.x[0] * touch.pageX + rotationMatrix.x[1] * touch.pageY,
    pageY: rotationMatrix.y[0] * touch.pageX + rotationMatrix.y[1] * touch.pageY,
  };
}

function adaptMouse(event) {
  event.touches = [{ pageX: event.pageX, pageY: event.pageY }];
  return event;
}

export function getDomTreeShapes(element, rootNode) {
  let domTreeShapes = [];

  while (element && element !== rootNode) {
    // We reach a Swipeable View, no need to look higher in the dom tree.
    if (element.hasAttribute('data-swipeable')) {
      break;
    }

    const style = window.getComputedStyle(element);

    if (
      // Ignore the scroll children if the element is absolute positioned.
      style.getPropertyValue('position') === 'absolute' ||
      // Ignore the scroll children if the element has an overflowX hidden
      style.getPropertyValue('overflow-x') === 'hidden'
    ) {
      domTreeShapes = [];
    } else if (
      (element.clientWidth > 0 && element.scrollWidth > element.clientWidth) ||
      (element.clientHeight > 0 && element.scrollHeight > element.clientHeight)
    ) {
      // Ignore the nodes that have no width.
      // Keep elements with a scroll
      domTreeShapes.push({
        element,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
      });
    }

    element = element.parentNode;
  }

  return domTreeShapes;
}

// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
let nodeHowClaimedTheScroll = null;

export function findNativeHandler(params) {
  const { domTreeShapes, pageX, startX, axis } = params;

  return domTreeShapes.some(shape => {
    // Determine if we are going backward or forward.
    let goingForward = pageX >= startX;
    if (axis === 'x' || axis === 'y') {
      goingForward = !goingForward;
    }

    const scrollPosition = shape[axisProperties.scrollPosition[axis]];

    const areNotAtStart = scrollPosition > 0;
    const areNotAtEnd =
      scrollPosition + shape[axisProperties.clientLength[axis]] <
      shape[axisProperties.scrollLength[axis]];

    if ((goingForward && areNotAtEnd) || (!goingForward && areNotAtStart)) {
      nodeHowClaimedTheScroll = shape.element;
      return true;
    }

    return false;
  });
}

class SwipeableViews extends Component {
  state = {
    indexLatest: null,
    // Set to true as soon as the component is swiping.
    // It's the state counter part of this.isSwiping.
    isDragging: false,
    // Help with SSR logic and lazy loading logic.
    isFirstRender: true,
    heightLatest: 0,
    // Let the render method that we are going to display the same slide than previously.
    displaySameSlide: true,
  };

  getChildContext() {
    return {
      swipeableViews: {
        slideUpdateHeight: () => {
          this.updateHeight();
        },
      },
    };
  }

  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      checkIndexBounds(this.props);
    }

    this.setIndexCurrent(this.props.index);
    this.setState({
      indexLatest: this.props.index,
    });
  }

  componentDidMount() {
    // Subscribe to transition end events.
    this.transitionListener = addEventListenerEnhanced(
      this.containerNode,
      transitionInfo.end,
      event => {
        if (event.target !== this.containerNode) {
          return;
        }

        this.handleTransitionEnd();
      },
    );

    // Block the thread to handle that event.
    this.touchMoveListener = addEventListenerEnhanced(
      this.rootNode,
      'touchmove',
      event => {
        // Handling touch events is disabled.
        if (this.props.disabled) {
          return;
        }
        this.handleSwipeMove(event);
      },
      {
        passive: false,
      },
    );

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isFirstRender: false,
    });

    injectStyle();

    // Send all functions in an object if action param is set.
    if (this.props.action) {
      this.props.action({
        updateHeight: this.updateHeight,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { index } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      if (process.env.NODE_ENV !== 'production') {
        checkIndexBounds(nextProps);
      }

      this.setIndexCurrent(index);
      this.setState({
        // If true, we are going to change the children. We shoudn't animate it.
        displaySameSlide: getDisplaySameSlide(this.props, nextProps),
        indexLatest: index,
      });
    }
  }

  componentWillUnmount() {
    this.transitionListener.remove();
    this.touchMoveListener.remove();
  }

  setIndexCurrent(indexCurrent) {
    if (!this.props.animateTransitions && this.indexCurrent !== indexCurrent) {
      this.handleTransitionEnd();
    }

    this.indexCurrent = indexCurrent;

    if (this.containerNode) {
      const { axis } = this.props;
      const transform = axisProperties.transform[axis](indexCurrent * 100);
      this.containerNode.style.WebkitTransform = transform;
      this.containerNode.style.transform = transform;
    }
  }

  rootNode = null;
  containerNode = null;
  ignoreNextScrollEvents = false;
  viewLength = 0;
  startX = 0;
  lastX = 0;
  vx = 0;
  startY = 0;
  isSwiping = undefined;
  started = false;
  startIndex = 0;
  transitionListener = null;
  touchMoveListener = null;
  activeSlide = null;
  indexCurrent = null;

  handleSwipeStart = event => {
    const { axis } = this.props;

    // Latency and rapid rerenders on some devices can leave
    // a period where rootNode briefly equals null.
    if (this.rootNode === null) {
      return;
    }

    const touch = applyRotationMatrix(event.touches[0], axis);

    this.viewLength = this.rootNode.getBoundingClientRect()[axisProperties.length[axis]];
    this.startX = touch.pageX;
    this.lastX = touch.pageX;
    this.vx = 0;
    this.startY = touch.pageY;
    this.isSwiping = undefined;
    this.started = true;

    const computedStyle = window.getComputedStyle(this.containerNode);
    const transform =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('transform');

    if (transform && transform !== 'none') {
      const transformValues = transform
        .split('(')[1]
        .split(')')[0]
        .split(',');
      const rootStyle = window.getComputedStyle(this.rootNode);

      const tranformNormalized = applyRotationMatrix(
        {
          pageX: parseInt(transformValues[4], 10),
          pageY: parseInt(transformValues[5], 10),
        },
        axis,
      );

      this.startIndex =
        -tranformNormalized.pageX /
        (this.viewLength -
          parseInt(rootStyle.paddingLeft, 10) -
          parseInt(rootStyle.paddingRight, 10));
    }
  };

  handleSwipeMove = event => {
    // The touch start event can be cancel.
    // Makes sure we set a starting point.
    if (!this.started) {
      this.handleTouchStart(event);
      return;
    }

    // Latency and rapid rerenders on some devices
    // can leave a period where rootNode briefly equals null.
    if (this.rootNode === null) {
      return;
    }

    // We are not supposed to hanlde this touch move.
    if (nodeHowClaimedTheScroll !== null && nodeHowClaimedTheScroll !== this.rootNode) {
      return;
    }

    const { axis, children, ignoreNativeScroll, onSwitching, resistance } = this.props;

    const touch = applyRotationMatrix(event.touches[0], axis);

    // We don't know yet.
    if (this.isSwiping === undefined) {
      const dx = Math.abs(this.startX - touch.pageX);
      const dy = Math.abs(this.startY - touch.pageY);

      const isSwiping = dx > dy && dx > constant.UNCERTAINTY_THRESHOLD;

      // We let the parent handle the scroll.
      if (
        !resistance &&
        (axis === 'y' || axis === 'y-reverse') &&
        ((this.indexCurrent === 0 && this.startX < touch.pageX) ||
          (this.indexCurrent === Children.count(this.props.children) - 1 &&
            this.startX > touch.pageX))
      ) {
        this.isSwiping = false;
        return;
      }

      // We are likely to be swiping, let's prevent the scroll event.
      if (dx > dy) {
        event.preventDefault();
      }

      if (isSwiping === true || dy > constant.UNCERTAINTY_THRESHOLD) {
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
    this.vx = this.vx * 0.5 + (touch.pageX - this.lastX) * 0.5;
    this.lastX = touch.pageX;

    const { index, startX } = computeIndex({
      children,
      resistance,
      pageX: touch.pageX,
      startIndex: this.startIndex,
      startX: this.startX,
      viewLength: this.viewLength,
    });

    // Add support for native scroll elements.
    if (nodeHowClaimedTheScroll === null && !ignoreNativeScroll) {
      const domTreeShapes = getDomTreeShapes(event.target, this.rootNode);
      const hasFoundNativeHandler = findNativeHandler({
        domTreeShapes,
        startX: this.startX,
        pageX: touch.pageX,
        axis,
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
      nodeHowClaimedTheScroll = this.rootNode;
    }

    this.setIndexCurrent(index);

    const callback = () => {
      if (onSwitching) {
        onSwitching(index, 'move');
      }
    };

    if (this.state.displaySameSlide || !this.state.isDragging) {
      this.setState(
        {
          displaySameSlide: false,
          isDragging: true,
        },
        callback,
      );
    }

    callback();
  };

  handleSwipeEnd = () => {
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
    const indexCurrent = this.indexCurrent;
    const delta = indexLatest - indexCurrent;

    let indexNew;

    // Quick movement
    if (Math.abs(this.vx) > this.props.threshold) {
      if (this.vx > 0) {
        indexNew = Math.floor(indexCurrent);
      } else {
        indexNew = Math.ceil(indexCurrent);
      }
    } else if (Math.abs(delta) > this.props.hysteresis) {
      // Some hysteresis with indexLatest.
      indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent);
    } else {
      indexNew = indexLatest;
    }

    const indexMax = Children.count(this.props.children) - 1;

    if (indexNew < 0) {
      indexNew = 0;
    } else if (indexNew > indexMax) {
      indexNew = indexMax;
    }

    this.setIndexCurrent(indexNew);
    this.setState(
      {
        indexLatest: indexNew,
        isDragging: false,
      },
      () => {
        if (this.props.onSwitching) {
          this.props.onSwitching(indexNew, 'end');
        }

        if (this.props.onChangeIndex && indexNew !== indexLatest) {
          this.props.onChangeIndex(indexNew, indexLatest, {
            reason: 'swipe',
          });
        }

        // Manually calling handleTransitionEnd in that case as isn't otherwise.
        if (indexCurrent === indexLatest) {
          this.handleTransitionEnd();
        }
      },
    );
  };

  handleTouchStart = event => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
    this.handleSwipeStart(event);
  };

  handleTouchEnd = event => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
    this.handleSwipeEnd(event);
  };

  handleMouseDown = event => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
    event.persist();
    this.handleSwipeStart(adaptMouse(event));
  };

  handleMouseUp = event => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
    this.handleSwipeEnd(adaptMouse(event));
  };

  handleMouseLeave = event => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }

    // Filter out events
    if (this.started) {
      this.handleSwipeEnd(adaptMouse(event));
    }
  };

  handleMouseMove = event => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(event);
    }

    // Filter out events
    if (this.started) {
      this.handleSwipeMove(adaptMouse(event));
    }
  };

  handleTransitionEnd() {
    if (!this.props.onTransitionEnd) {
      return;
    }

    // Filters out when changing the children
    if (this.state.displaySameSlide) {
      return;
    }

    // The rest callback is triggered when swiping. It's just noise.
    // We filter it out.
    if (!this.state.isDragging) {
      this.props.onTransitionEnd();
    }
  }

  handleScroll = event => {
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }

    // Ignore events bubbling up.
    if (event.target !== this.rootNode) {
      return;
    }

    if (this.ignoreNextScrollEvents) {
      this.ignoreNextScrollEvents = false;
      return;
    }

    const indexLatest = this.state.indexLatest;
    const indexNew = Math.ceil(event.target.scrollLeft / event.target.clientWidth) + indexLatest;

    this.ignoreNextScrollEvents = true;
    // Reset the scroll position.
    event.target.scrollLeft = 0;

    if (this.props.onChangeIndex && indexNew !== indexLatest) {
      this.props.onChangeIndex(indexNew, indexLatest, {
        reason: 'focus',
      });
    }
  };

  updateHeight = () => {
    if (this.activeSlide !== null) {
      const child = this.activeSlide.children[0];
      if (
        child !== undefined &&
        child.offsetHeight !== undefined &&
        this.state.heightLatest !== child.offsetHeight
      ) {
        this.setState({
          heightLatest: child.offsetHeight,
        });
      }
    }
  };

  render() {
    const {
      action,
      animateHeight,
      animateTransitions,
      axis,
      children,
      containerStyle: containerStyleProp,
      disabled,
      disableLazyLoading,
      enableMouseEvents,
      hysteresis,
      ignoreNativeScroll,
      index,
      onChangeIndex,
      onSwitching,
      onTransitionEnd,
      resistance,
      slideStyle: slideStyleProp,
      slideClassName,
      springConfig,
      style,
      threshold,
      ...other
    } = this.props;

    const { displaySameSlide, heightLatest, isDragging, isFirstRender, indexLatest } = this.state;
    const touchEvents = !disabled
      ? {
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
        }
      : {};
    const mouseEvents =
      !disabled && enableMouseEvents
        ? {
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
            onMouseMove: this.handleMouseMove,
          }
        : {};

    // There is no point to animate if we are already providing a height.
    warning(
      !animateHeight || !containerStyleProp || !containerStyleProp.height,
      `react-swipeable-view: You are setting animateHeight to true but you are
also providing a custom height.
The custom height has a higher priority than the animateHeight property.
So animateHeight is most likely having no effect at all.`,
    );

    const slideStyle = Object.assign({}, styles.slide, slideStyleProp);

    let transition;
    let WebkitTransition;

    if (isDragging || !animateTransitions || displaySameSlide) {
      transition = 'all 0s ease 0s';
      WebkitTransition = 'all 0s ease 0s';
    } else {
      transition = createTransition('transform', springConfig);
      WebkitTransition = createTransition('-webkit-transform', springConfig);

      if (heightLatest !== 0) {
        const additionalTranstion = `, ${createTransition('height', springConfig)}`;
        transition += additionalTranstion;
        WebkitTransition += additionalTranstion;
      }
    }

    const containerStyle = {
      height: null,
      WebkitFlexDirection: axisProperties.flexDirection[axis],
      flexDirection: axisProperties.flexDirection[axis],
      WebkitTransition,
      transition,
    };

    // Apply the styles for SSR considerations
    if (disableLazyLoading || !isFirstRender) {
      const transform = axisProperties.transform[axis](this.indexCurrent * 100);
      containerStyle.WebkitTransform = transform;
      containerStyle.transform = transform;
    }

    if (animateHeight) {
      containerStyle.height = heightLatest;
    }

    return (
      <div
        ref={node => {
          this.rootNode = node;
        }}
        style={Object.assign({}, axisProperties.root[axis], style)}
        {...other}
        {...touchEvents}
        {...mouseEvents}
        onScroll={this.handleScroll}
      >
        <div
          ref={node => {
            this.containerNode = node;
          }}
          style={Object.assign({}, containerStyle, styles.container, containerStyleProp)}
          className="react-swipeable-view-container"
        >
          {Children.map(children, (child, indexChild) => {
            if (!disableLazyLoading && isFirstRender && indexChild !== indexLatest) {
              return null;
            }

            warning(
              isValidElement(child),
              `react-swipeable-view: one of the children provided is invalid: ${child}.
We are expecting a valid React Element`,
            );

            let ref;
            let hidden = true;

            if (indexChild === indexLatest) {
              hidden = false;

              if (animateHeight) {
                ref = node => {
                  this.activeSlide = node;
                  this.updateHeight();
                };
                slideStyle.overflowY = 'hidden';
              }
            }

            return (
              <div
                ref={ref}
                style={slideStyle}
                className={slideClassName}
                aria-hidden={hidden}
                data-swipeable="true"
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// Added as an ads for people using the React dev tools in production.
// So they know, the tool used to build the awesome UI they
// are looking at/retro engineering.
SwipeableViews.displayName = 'ReactSwipableView';

SwipeableViews.propTypes = {
  /**
   * This is callback property. It's called by the component on mount.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports updateHeight() action.
   *
   * @param {object} actions This object contains all posible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,
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
   * This is the config used to disable lazyloding,
   * if `true` will render all the views in first rendering.
   */
  disableLazyLoading: PropTypes.bool,
  /**
   * If `true`, it will enable mouse events.
   * This will allow the user to perform the relevant swipe actions with a mouse.
   */
  enableMouseEvents: PropTypes.bool,
  /**
   * Configure hysteresis between slides. This value determines how far
   * should user swipe to switch slide.
   */
  hysteresis: PropTypes.number,
  /**
   * If `true`, it will ignore native scroll container.
   * It can be used to filter out false positive that blocks the swipe.
   */
  ignoreNativeScroll: PropTypes.bool,
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
   * @param {object} meta Meta data containing more information about the event.
   */
  onChangeIndex: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onScroll: PropTypes.func,
  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something corresponding
   * to the current slide position.
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
   * This is the className that will be applied
   * on the slide component.
   */
  slideClassName: PropTypes.string,
  /**
   * This is the inlined style that will be applied
   * on the slide component.
   */
  slideStyle: PropTypes.object,
  /**
   * This is the config used to create CSS transitions.
   * This is useful to change the dynamic of the transition.
   */
  springConfig: PropTypes.shape({
    duration: PropTypes.string,
    easeFunction: PropTypes.string,
    delay: PropTypes.string,
  }),
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

SwipeableViews.defaultProps = {
  animateHeight: false,
  animateTransitions: true,
  axis: 'x',
  disabled: false,
  disableLazyLoading: false,
  enableMouseEvents: false,
  hysteresis: 0.6,
  ignoreNativeScroll: false,
  index: 0,
  threshold: 5,
  springConfig: {
    duration: '0.35s',
    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    delay: '0s',
  },
  resistance: false,
};

SwipeableViews.childContextTypes = {
  swipeableViews: PropTypes.shape({
    slideUpdateHeight: PropTypes.func,
  }),
};

export default SwipeableViews;
