/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SwipeableViews from '../../../packages/react-swipeable-views-native/src';
import { virtualize } from '../../../packages/react-swipeable-views-utils/src';
import { mod } from '../../../packages/react-swipeable-views-core/src';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = StyleSheet.create({
  slide: {
    padding: 15,
    height: 100,
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

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
      <Text style={styles.text}>{`slide n°${index + 1}`}</Text>
    </View>
  );
}

class DemoVirtualize extends React.Component {
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
