// @flow weak

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
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
  divider: {
    height: 50,
  },
});

const Demo6 = () => (
  <SwipeableViews>
    <View style={[styles.slide, styles.slide1]}>
      <Text style={styles.text}>
        slide n°1
      </Text>
      <View style={styles.divider} />
      <SwipeableViews resistance={true}>
        <View style={[styles.slide, styles.slide2]}>
          <Text style={styles.text}>
            slide n°1
          </Text>
        </View>
        <View style={[styles.slide, styles.slide3]}>
          <Text style={styles.text}>
            slide n°2
          </Text>
        </View>
      </SwipeableViews>
    </View>
    <View style={[styles.slide, styles.slide2]}>
      <Text style={styles.text}>
        slide n°2
      </Text>
    </View>
  </SwipeableViews>
);

export default Demo6;
