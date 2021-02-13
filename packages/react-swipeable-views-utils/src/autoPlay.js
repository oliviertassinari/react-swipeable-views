import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqualObjects } from 'shallow-equal';
import EventListener from 'react-event-listener';
import { mod } from 'react-swipeable-views-core';

export default function autoPlay(MyComponent) {
  class AutoPlay extends React.Component {
    timer = null;

    constructor(props) {
      super(props);

      this.state.index = props.index || 0;
    }

    state = {};

    componentDidMount() {
      this.startInterval();
    }

    // eslint-disable-next-line camelcase,react/sort-comp
    UNSAFE_componentWillReceiveProps(nextProps) {
      const { index } = nextProps;

      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          index,
        });
      }
    }

    componentDidUpdate(prevProps) {
      const shouldResetInterval = !shallowEqualObjects(
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
        indexNew = mod(indexNew, slideCount || React.Children.count(children));
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

    handleChangeIndex = (index, indexLatest, meta) => {
      // Is uncontrolled
      if (this.props.index === undefined) {
        this.setState({
          index,
        });
      }

      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index, indexLatest, meta);
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

    handleVisibilityChange = e => {
      if (e.target.hidden) {
        clearInterval(this.timer);
      } else {
        this.startInterval();
      }
    };

    startInterval() {
      const { autoplay, interval } = this.props;

      clearInterval(this.timer);

      if (autoplay) {
        this.timer = setInterval(this.handleInterval, interval);
      }
    }

    render() {
      const {
        autoplay,
        direction,
        index: indexProp,
        interval,
        onChangeIndex,
        ...other
      } = this.props;

      const { index } = this.state;

      if (!autoplay) {
        return <MyComponent index={index} onChangeIndex={onChangeIndex} {...other} />;
      }

      return (
        <EventListener target="document" onVisibilityChange={this.handleVisibilityChange}>
          <MyComponent
            index={index}
            onChangeIndex={this.handleChangeIndex}
            onSwitching={this.handleSwitching}
            {...other}
          />
        </EventListener>
      );
    }
  }

  AutoPlay.propTypes = {
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

  AutoPlay.defaultProps = {
    autoplay: true,
    direction: 'incremental',
    interval: 3000,
  };

  return AutoPlay;
}
