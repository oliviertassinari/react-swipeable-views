import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import SwipeableViews from '../../../packages/react-swipeable-views-native/src';

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

class DemoTabs extends React.Component {
  state = {
    index: 0,
  };

  handleChangeTabs = value => () => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <View>
        <Button style={index === 0 && { color: 'green' }} onPress={this.handleChangeTabs(0)}>
          tab n°1
        </Button>
        <Button style={index === 1 && { color: 'green' }} onPress={this.handleChangeTabs(1)}>
          tab n°2
        </Button>
        <Button style={index === 2 && { color: 'green' }} onPress={this.handleChangeTabs(2)}>
          tab n°3
        </Button>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <View style={[styles.slide, styles.slide1]}>
            <Text style={styles.text}>slide n°1</Text>
          </View>
          <View style={[styles.slide, styles.slide2]}>
            <Text style={styles.text}>slide n°2</Text>
          </View>
          <View style={[styles.slide, styles.slide3]}>
            <Text style={styles.text}>slide n°3</Text>
          </View>
        </SwipeableViews>
      </View>
    );
  }
}

export default DemoTabs;
