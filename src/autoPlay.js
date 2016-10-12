// @flow weak

import React, { Component, PropTypes, Children } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import mod from './utils/mod';

const ignore = {};

export default function autoPlay(MyComponent) {
  class AutoPlay extends Component {
    static propTypes = {
      /**
       * If `false`, the auto play behavior is disabled.
       */
      autoplay: PropTypes.bool,
      /**
       * @ignore
       */
      children: PropTypes.node,
      /**
       * This is the auto play direction.
       */
      direction: PropTypes.oneOf([
        'incremental',
        'decremental',
      ]),
      /**
       * @ignore
       */
      index: PropTypes.number,
      /**
       * Delay between auto play transitions (in ms).
       */
      interval: PropTypes.number,
      /**
       * @ignore
       */
      onChangeIndex: PropTypes.func,
      /**
       * @ignore
       */
      onSwitching: PropTypes.func,
      /**
       * @ignore
       */
      slideCount: PropTypes.number,
    };

    static defaultProps = {
      autoplay: true,
      direction: 'incremental',
      index: 0,
      interval: 3000,
    };

    state = {};

    componentWillMount() {
      this.setState({
        index: this.props.index,
      });
    }

    componentDidMount() {
      this.startInterval();
    }

    componentWillReceiveProps(nextProps) {
      const {
        index,
      } = nextProps;

      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          index,
        });
      }
    }

    componentDidUpdate(prevProps) {
      const shouldResetInterval = shallowCompare({
        props: {
          index: prevProps.index,
          interval: prevProps.interval,
          autoplay: prevProps.autoplay,
        },
        state: ignore,
      }, {
        index: this.props.index,
        interval: this.props.interval,
        autoplay: this.props.autoplay,
      }, ignore);

      if (shouldResetInterval) {
        this.startInterval();
      }
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    timer = null;

    startInterval() {
      const {
        autoplay,
        interval,
      } = this.props;

      clearInterval(this.timer);

      if (autoplay) {
        this.timer = setInterval(this.handleInterval, interval);
      }
    }

    handleInterval = () => {
      const {
        children,
        direction,
        onChangeIndex,
        slideCount,
      } = this.props;

      const indexLatest = this.state.index;
      let indexNew = indexLatest;

      if (direction === 'incremental') {
        indexNew += 1;
      } else {
        indexNew -= 1;
      }

      if (slideCount || children) {
        indexNew = mod(indexNew, slideCount || Children.count(children));
      }

      if (onChangeIndex) {
        onChangeIndex(indexNew, indexLatest);
      } else {
        this.setState({
          index: indexNew,
        });
      }
    };

    handleChangeIndex = (index, indexLatest) => {
      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index, indexLatest);
      } else {
        this.setState({
          index,
        });
      }
    };

    handleSwitching = (index, type) => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else if (type === 'end') {
        this.startInterval();
      }

      if (this.props.onSwitching) {
        this.props.onSwitching(index, type);
      }
    };

    render() {
      const {
        autoplay, // eslint-disable-line no-unused-vars
        direction, // eslint-disable-line no-unused-vars
        interval, // eslint-disable-line no-unused-vars
        index: indexProp, // eslint-disable-line no-unused-vars
        onChangeIndex, // eslint-disable-line no-unused-vars
        ...other,
      } = this.props;

      if (!autoplay) {
        return (
          <MyComponent
            index={indexProp}
            {...other}
          />
        );
      }

      const {
        index,
      } = this.state;

      return (
        <MyComponent
          index={index}
          onChangeIndex={this.handleChangeIndex}
          onSwitching={this.handleSwitching}
          {...other}
        />
      );
    }
  }

  return AutoPlay;
}
