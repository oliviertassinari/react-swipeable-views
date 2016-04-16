import React, {
  StyleSheet,
  View,
} from 'react-native';

import PaginationDot from './PaginationDot.native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
  },
});

export default class Pagination extends React.Component {
  static propTypes = {
    dots: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    onChangeIndex: React.PropTypes.func.isRequired,
  };

  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const {
      index,
      dots,
    } = this.props;

    const children = [];

    for (let i = 0; i < dots; i++) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          onClick={this.handleClick}
        />
      );
    }

    return (
      <View style={styles.root}>
        {children}
      </View>
    );
  }
}
