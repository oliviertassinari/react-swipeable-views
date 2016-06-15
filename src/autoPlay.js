import React, {Component, PropTypes, Children} from 'react';

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function autoPlay(MyComponent) {
  return class AutoPlay extends Component {
    static propTypes = {
      /**
       * If `false`, the auto play behavior is disabled.
       */
      autoplay: PropTypes.bool,
      /**
       * This is the auto play direction.
       */
      direction: PropTypes.oneOf([
        'incremental',
        'decremental',
      ]),
      /**
       * Delay between auto play transitions (in ms).
       */
      interval: PropTypes.number,
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

      if (typeof index === 'number' && index !== this.props.index) { // eslint-disable-line react/prop-types
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
        children, // eslint-disable-line react/prop-types
        direction,
      } = this.props;

      let indexNew = this.state.index;

      if (direction === 'incremental') {
        indexNew += 1;
      } else {
        indexNew -= 1;
      }

      indexNew = mod(indexNew, Children.count(children));

      this.setState({
        index: indexNew,
      });

      /* eslint-disable react/prop-types */
      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(indexNew);
      }
      /* eslint-enalbe react/prop-types */
    };

    handleChangeIndex = (index) => {
      this.setState({
        index: index,
      });

      /* eslint-disable react/prop-types */
      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index);
      }
      /* eslint-enalbe react/prop-types */
    };

    handleSwitching = (index, type) => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else if (type === 'end') {
        this.startInterval();
      }

      /* eslint-disable react/prop-types */
      if (this.props.onSwitching) {
        this.props.onSwitching(index, type);
      }
      /* eslint-enalbe react/prop-types */
    };

    render() {
      const {
        /* eslint-disable no-unused-vars */
        autoplay,
        direction,
        interval,
        /* eslint-enable no-unused-vars */
        ...other,
      } = this.props;

      const {
        index,
      } = this.state;

      return (
        <MyComponent
          {...other}
          index={index}
          onChangeIndex={this.handleChangeIndex}
          onSwitching={this.handleSwitching}
        />
      );
    }
  };
}
