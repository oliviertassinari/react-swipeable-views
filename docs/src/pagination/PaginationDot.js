import React from 'react';

const styles = {
  root: {
    height: 18,
    width: 18,
    cursor: 'pointer',
  },
  dot: {
    backgroundColor: '#e4e6e7',
    height: 12,
    width: 12,
    borderRadius: 6,
    margin: 3,
  },
  active: {
    backgroundColor: '#319fd6',
  },
};

export default class PaginationDot extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  handleClick = (event) => {
    this.props.onClick(event, this.props.index);
  };

  render() {
    const {
      active,
    } = this.props;

    let styleDot;

    if (active) {
      styleDot = Object.assign({}, styles.dot, styles.active);
    } else {
      styleDot = styles.dot;
    }

    return (
      <div style={styles.root} onClick={this.handleClick}>
        <div style={styleDot} />
      </div>
    );
  }
}
