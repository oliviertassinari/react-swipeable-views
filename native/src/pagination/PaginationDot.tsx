import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    height: 18,
    width: 18,
    borderRadius: 6,
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
});

interface Props {
  active: boolean;
  index: number;
  onClick: (event: any, index: number) => void;
}

class PaginationDot extends React.Component<Props> {
  handleClick = event => {
    this.props.onClick(event, this.props.index);
  };

  render() {
    const { active } = this.props;

    let styleDot;

    if (active) {
      styleDot = [styles.dot, styles.active];
    } else {
      styleDot = styles.dot;
    }

    return (
      <TouchableRipple style={styles.root} onPress={this.handleClick}>
        <View style={styleDot} />
      </TouchableRipple>
    );
  }
}

export default PaginationDot;
