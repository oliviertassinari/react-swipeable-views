import * as React from 'react';
import { View } from 'react-native';
import SwipeableViews from '../../packages/react-swipeable-views-native/src';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { Headline } from 'react-native-paper';
import styles from '../styles';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

function slideRenderer(params) {
  const { index, key } = params;
  let style;

  switch (mod(index, 3)) {
    case 0:
      style = styles.slide1;
      break;

    case 1:
      style = styles.slide2;
      break;

    case 2:
      style = styles.slide3;
      break;

    default:
      break;
  }

  return (
    <View style={[styles.slide, style]} key={key}>
      <Headline style={styles.text}>{`slide n°${index + 1}`}</Headline>
    </View>
  );
}

class DemoVirtualize extends React.Component<{}> {
  static title = "Virtualize";
  static description = "With the virtualize HOC";

  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    return (
      <VirtualizeSwipeableViews
        slideRenderer={slideRenderer}
        index={this.state.index}
        onChangeIndex={this.handleChangeIndex}
      />
    );
  }
}

export default DemoVirtualize;
