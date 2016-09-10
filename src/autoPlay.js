// @flow weak

import React, {Component, PropTypes, Children} from 'react';
import mod from './utils/mod';

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
      children: PropTypes.node.isRequired,
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
    };

    static defaultProps = {
      autoplay: true,
      direction: 'incremental',
      interval: 3000,
    };

    state = {
      index: 0,
    };

    componentDidMount() {
      this.startInterval();
    }

    componentWillReceiveProps(nextProps) {
      const {
        index,
      } = nextProps;

      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          index: index,
        });
      }
    }

    componentDidUpdate() {
      this.startInterval();
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
      } = this.props;

      const indexLatest = this.state.index;
      let indexNew = indexLatest;

      if (direction === 'incremental') {
        indexNew += 1;
      } else {
        indexNew -= 1;
      }

      indexNew = mod(indexNew, Children.count(children));

      this.setState({
        index: indexNew,
      }, () => {
        if (this.props.onChangeIndex) {
          this.props.onChangeIndex(indexNew, indexLatest);
        }
      });
    };

    handleChangeIndex = (index) => {
      this.setState({
        index: index,
      }, () => {
        if (this.props.onChangeIndex) {
          this.props.onChangeIndex(index);
        }
      });
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
