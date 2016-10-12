// @flow weak

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import SwipeableViews from '../../../src/index.native.animated';

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

const list = [];

for (let i = 0; i < 30; i += 1) {
  list.push(
    <View key={i}>
      <Text style={styles.text}>
        {`item n°${i + 1}`}
      </Text>
    </View>
  );
}

const DemoAnimateHeight = () => (
  <SwipeableViews>
    <View style={[styles.slide, styles.slide1]}>
      {list.slice(0, 10)}
    </View>
    <View style={[styles.slide, styles.slide2]}>
      {list.slice(0, 7)}
    </View>
    <View style={[styles.slide, styles.slide3]}>
      {list.slice(0, 3)}
    </View>
  </SwipeableViews>
);

export default DemoAnimateHeight;
