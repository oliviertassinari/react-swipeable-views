import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SwipeableViews from '../../../packages/react-swipeable-views-native/src';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from '../pagination/Pagination.native';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
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

class DemoAutoPlay extends React.Component<{}, {index: number}> {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <View style={styles.root}>
        <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <View style={[styles.slide, styles.slide1]}>
            <Text style={styles.text}>slide n°1</Text>
          </View>
          <View style={[styles.slide, styles.slide2]}>
            <Text style={styles.text}>slide n°2</Text>
          </View>
          <View style={[styles.slide, styles.slide3]}>
            <Text style={styles.text}>slide n°3</Text>
          </View>
        </AutoPlaySwipeableViews>
        <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
      </View>
    );
  }
}

export default DemoAutoPlay;
