// @flow weak

import React, { Component, PropTypes, Children } from 'react';
import keycode from 'keycode';
import EventListener from 'react-event-listener';
import mod from './utils/mod';

export default function bindKeyboard(MyComponent) {
  class BindKeyboard extends Component {
    static propTypes = {
      /**
       * @ignore
       */
      axis: PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
      /**
       * @ignore
       */
      children: PropTypes.node,
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
      slideCount: PropTypes.number,
    };

    static defaultProps = {
      index: 0,
    };

    state = {};

    componentWillMount() {
      this.setState({
        index: this.props.index,
      });
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

    handleKeyDown = (event) => {
      let action;
      const {
        axis = 'x',
        children,
        onChangeIndex,
        slideCount,
      } = this.props;

      switch (keycode(event)) {
        case 'page down':
        case 'down':
          if (axis === 'y') {
            action = 'decrease';
          } else if (axis === 'y-reverse') {
            action = 'increase';
          }
          break;

        case 'left':
          if (axis === 'x') {
            action = 'decrease';
          } else if (axis === 'x-reverse') {
            action = 'increase';
          }
          break;

        case 'page up':
        case 'up':
          if (axis === 'y') {
            action = 'increase';
          } else if (axis === 'y-reverse') {
            action = 'decrease';
          }
          break;

        case 'right':
          if (axis === 'x') {
            action = 'increase';
          } else if (axis === 'x-reverse') {
            action = 'decrease';
          }
          break;

        default:
          break;
      }

      if (action) {
        const indexLatest = this.state.index;
        let indexNew = indexLatest;

        if (action === 'increase') {
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

    render() {
      const {
        index: indexProp, // eslint-disable-line no-unused-vars
        onChangeIndex, // eslint-disable-line no-unused-vars
        ...other,
      } = this.props;

      const {
        index,
      } = this.state;

      return (
        <EventListener target="window" onKeyDown={this.handleKeyDown}>
          <MyComponent
            index={index}
            onChangeIndex={this.handleChangeIndex}
            {...other}
          />
        </EventListener>
      );
    }
  }

  return BindKeyboard;
}
