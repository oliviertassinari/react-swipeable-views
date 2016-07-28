// @flow weak

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Checkbox} from 'react-native-material-design';
import Button from 'react-native-button';

import SwipeableViews from '../../../src/index.native.animated';

const styles = StyleSheet.create({
  slideContainer: {
    height: 100,
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

class Demo2 extends Component {
  state = {
    index: 0,
    checked: false,
  };

  handleChangeTabs = (value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index: index,
    });
  };

  handleChecked = (checked) => {
    this.setState({
      checked: checked,
    });
  };

  render() {
    const {
      index,
    } = this.state;

    return (
      <View>
        <Button
          style={index === 0 && {color: 'green'}}
          onPress={this.handleChangeTabs.bind(null, 0)}
        >
          tab n°1
        </Button>
        <Button
          style={index === 1 && {color: 'green'}}
          onPress={this.handleChangeTabs.bind(null, 1)}
        >
          tab n°2
        </Button>
        <Button
          style={index === 2 && {color: 'green'}}
          onPress={this.handleChangeTabs.bind(null, 2)}
        >
          tab n°3
        </Button>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          containerStyle={styles.slideContainer}
        >
          <View style={[styles.slide, styles.slide1]}>
            <Text style={styles.text}>
              slide n°1
            </Text>
          </View>
          <View style={[styles.slide, styles.slide2]}>
            <Text style={styles.text}>
              slide n°2
            </Text>
            <Checkbox
              checked={this.state.checked}
              onCheck={this.handleChecked}
              value="value"
              label="test event propagation"
            />
          </View>
          <View style={[styles.slide, styles.slide3]}>
            <Text style={styles.text}>
              slide n°3
            </Text>
          </View>
        </SwipeableViews>
      </View>
    );
  }
}

export default Demo2;
