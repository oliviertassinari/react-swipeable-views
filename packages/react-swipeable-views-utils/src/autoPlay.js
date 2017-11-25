import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { mod } from 'react-swipeable-views-core';

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
      direction: PropTypes.oneOf(['incremental', 'decremental']),
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
      interval: 3000,
    };

    constructor(props, context) {
      super(props, context);
      this.state.index = this.props.index || 0;
    }

    state = {};

    componentDidMount() {
      this.startInterval();
    }

    componentWillReceiveProps(nextProps) {
      const { index } = nextProps;

      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          index,
        });
      }
    }

    componentDidUpdate(prevProps) {
      const shouldResetInterval = !shallowEqual(
        {
          index: prevProps.index,
          interval: prevProps.interval,
          autoplay: prevProps.autoplay,
        },
        {
          index: this.props.index,
          interval: this.props.interval,
          autoplay: this.props.autoplay,
        },
      );

      if (shouldResetInterval) {
        this.startInterval();
      }
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    timer = null;

    startInterval() {
      const { autoplay, interval } = this.props;

      clearInterval(this.timer);

      if (autoplay) {
        this.timer = setInterval(this.handleInterval, interval);
      }
    }

    handleInterval = () => {
      const { children, direction, onChangeIndex, slideCount } = this.props;

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

      // Is uncontrolled
      if (this.props.index === undefined) {
        this.setState({
          index: indexNew,
        });
      }

      if (onChangeIndex) {
        onChangeIndex(indexNew, indexLatest);
      }
    };

    handleChangeIndex = (index, indexLatest) => {
      // Is uncontrolled
      if (this.props.index === undefined) {
        this.setState({
          index,
        });
      }

      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index, indexLatest);
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
        autoplay,
        direction,
        interval,
        index: indexProp,
        onChangeIndex,
        ...other
      } = this.props;

      const { index } = this.state;

      if (!autoplay) {
        return <MyComponent index={index} {...other} />;
      }

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
