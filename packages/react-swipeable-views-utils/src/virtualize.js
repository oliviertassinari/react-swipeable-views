// @flow weak

import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { mod } from 'react-swipeable-views-core';

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
      onTransitionEnd: PropTypes.func,
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
      overscanSlideCount: 2,
    };

    /**
     *
     *           index          indexStop
     *             |              |
     * indexStart  |       indexContainer
     *   |         |         |    |
     * ------------|-------------------------->
     *  -2    -1   0    1    2    3    4    5
     */
    state = {};

    componentWillMount() {
      this.setState({
        index: this.props.index || 0,
        indexContainer: this.props.overscanSlideCount,
      });

      this.setWindow(this.props.index || 0);
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

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    timer = null;

    handleChangeIndex = (indexContainer, indexLatest) => {
      const {
        slideCount,
        onChangeIndex,
      } = this.props;

      const indexDiff = indexContainer - indexLatest;
      let index = this.state.index + indexDiff;

      if (slideCount) {
        index = mod(index, slideCount);
      }

      // Is uncontrolled
      if (this.props.index === undefined) {
        this.setIndex(index, indexContainer, indexDiff);
      }

      if (onChangeIndex) {
        onChangeIndex(index, this.state.index);
      }
    };

    handleTransitionEnd = () => {
      // Delay the update of the window to fix an issue with react-motion.
      this.timer = setTimeout(() => {
        this.setWindow();
      }, 0);

      if (this.props.onTransitionEnd) {
        this.props.onTransitionEnd();
      }
    };

    setIndex(index, indexContainer, indexDiff) {
      const nextState = {
        index,
        indexContainer,
        indexStart: this.state.indexStart,
        indexStop: this.state.indexStop,
      };

      // We are going forward, let's render one more slide ahead.
      if (indexDiff > 0 &&
        (!this.props.slideCount || nextState.indexStop < this.props.slideCount - 1)) {
        nextState.indexStop += 1;
      }

      // Extend the bounds if needed.
      if (index > nextState.indexStop) {
        nextState.indexStop = index;
      }

      const leftAhead = nextState.indexStart - index;

      // Extend the bounds if needed.
      if (leftAhead > 0) {
        nextState.indexContainer += leftAhead;
        nextState.indexStart -= leftAhead;
      }

      this.setState(nextState);
    }

    setWindow(index = this.state.index) {
      const {
        slideCount,
      } = this.props;

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

      this.setState({
        indexContainer: leftAhead,
        indexStart: index - leftAhead,
        indexStop: index + rightAhead,
      });
    }

    render() {
      const {
        children, // eslint-disable-line no-unused-vars
        index: indexProp, // eslint-disable-line no-unused-vars
        onChangeIndex, // eslint-disable-line no-unused-vars
        overscanSlideCount, // eslint-disable-line no-unused-vars
        slideCount, // eslint-disable-line no-unused-vars
        slideRenderer,
        ...other
      } = this.props;

      const {
        indexContainer,
        indexStart,
        indexStop,
      } = this.state;

      const slides = [];

      for (let slideIndex = indexStart; slideIndex <= indexStop; slideIndex += 1) {
        slides.push(slideRenderer({
          index: slideIndex,
          key: slideIndex,
        }));
      }

      return (
        <MyComponent
          index={indexContainer}
          onChangeIndex={this.handleChangeIndex}
          onTransitionEnd={this.handleTransitionEnd}
          {...other}
        >
          {slides}
        </MyComponent>
      );
    }
  }

  return Virtualize;
}
