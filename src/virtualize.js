// @flow weak

import React, {Component, PropTypes} from 'react';
import warning from 'warning';

// Approximate time needed to wait for the end of the transition.
const ANIMATION_DELAY = 500;

// Render one more slide for going backward as it's more difficult to
// keep the window up to date.
const LEFT_OFFSET = 1;

export default function virtualize(MyComponent) {
  class Virtualize extends Component {
    static propTypes = {
      /**
       * @ignore
       */
      children: (props, propName) => {
        if (props[propName] !== undefined) {
          return new Error("The children property isn't supported.");
        }

        return null;
      },
      /**
       * @ignore
       */
      index: PropTypes.number,
      /**
       * @ignore
       */
      onChangeIndex: PropTypes.func,
      /**
       * @ignore
       */
      onSwitching: PropTypes.func,
      /**
       * Number of slide to render before/after the visible slide.
       */
      overscanSlideCount: PropTypes.number,
      /**
       * When set, it's adding a limit to the number of slide: [0, slideCount].
       */
      slideCount: PropTypes.number,
      /**
       * Responsible for rendering a slide given an index.
       * ({ index: number }): node.
       */
      slideRenderer: PropTypes.func.isRequired,
    };

    static defaultProps = {
      index: 0,
      overscanSlideCount: 2,
    };

    state = {};

    componentWillMount() {
      this.setState({
        index: this.props.index,
        indexContainer: this.props.overscanSlideCount,
      });

      this.setWindow(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const {
        index,
      } = nextProps;

      if (typeof index === 'number' && index !== this.props.index) {
        const indexDiff = index - this.props.index;
        this.setIndex(index, this.state.indexContainer + indexDiff, indexDiff);
      }
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    timer = null;

    handleChangeIndex = (indexContainer, indexLatest) => {
      const indexDiff = indexContainer - indexLatest;

      warning(
        Math.abs(indexDiff) === 1,
        'react-swipeable-view: The indexDiff should be abs equal to 1',
      );

      const index = this.state.index + indexDiff;

      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index);
      } else {
        this.setIndex(index, indexContainer, indexDiff);
      }
    };

    handleSwitching = (index, type) => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else if (type === 'end') {
        this.setWindowTimer();
      }

      if (this.props.onSwitching) {
        this.props.onSwitching(index, type);
      }
    };

    setIndex(index, indexContainer, indexDiff) {
      const nextState = {
        index: index,
        indexContainer: indexContainer,
        indexStop: this.state.indexStop,
      };

      // We are going forward, let's render one more slide ahead.
      if (indexDiff > 0 &&
        (!this.props.slideCount || nextState.indexStop < this.props.slideCount - 1)) {
        nextState.indexStop += 1;
      }

      // Extend the bounds if needed
      if (index > nextState.indexStop) {
        nextState.indexStop = index;
      }

      this.setState(nextState, () => {
        // We are going backward, but reached first rendered item, let's render previous right away, with no timer
        if (indexDiff < 0 && index > 0 && indexContainer === 0) {
          this.setWindow();
        } else {
          this.setWindowTimer();
        }
      });
    }

    setWindowTimer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setWindow();
      }, ANIMATION_DELAY);
    }

    setWindow(state = this.state) {
      const {
        slideCount,
      } = this.props;

      const index = state.index;
      let leftAhead = this.props.overscanSlideCount + LEFT_OFFSET;
      let rightAhead = this.props.overscanSlideCount;

      if (slideCount) {
        if (leftAhead > index) {
          leftAhead = index;
        }

        if (rightAhead + index > slideCount - 1) {
          rightAhead = slideCount - index - 1;
        }
      }

      const nextState = {
        indexContainer: leftAhead,
        indexStart: index - leftAhead,
        indexStop: index + rightAhead,
      };

      this.setState(nextState);
    }

    render() {
      const {
        children, // eslint-disable-line no-unused-vars
        index: indexProp, // eslint-disable-line no-unused-vars
        onChangeIndex, // eslint-disable-line no-unused-vars
        overscanSlideCount, // eslint-disable-line no-unused-vars
        slideCount, // eslint-disable-line no-unused-vars
        slideRenderer,
        ...other,
      } = this.props;

      const {
        indexContainer,
        indexStart,
        indexStop,
      } = this.state;

      const slides = [];

      for (let slideIndex = indexStart; slideIndex <= indexStop; slideIndex++) {
        slides.push(slideRenderer({
          index: slideIndex,
          key: slideIndex,
        }));
      }

      return (
        <MyComponent
          index={indexContainer}
          onChangeIndex={this.handleChangeIndex}
          onSwitching={this.handleSwitching}
          {...other}
        >
          {slides}
        </MyComponent>
      );
    }
  }

  return Virtualize;
}
