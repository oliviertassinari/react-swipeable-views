import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PaginationDot from './PaginationDot';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
  },
});

interface Props {
  dots: number;
  index: number;
  onChangeIndex: (index: number) => void;
}

class Pagination extends React.Component<Props> {
  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const { index, dots } = this.props;

    const children: any = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot key={i} index={i} active={i === index} onClick={this.handleClick} />,
      );
    }

    return <View style={styles.root}>{children}</View>;
  }
}

export default Pagination;
