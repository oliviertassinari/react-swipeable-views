// @flow weak

import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import SwipeableViews from '../../../packages/react-swipeable-views-native/src';

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

const list = [];

for (let i = 0; i < 30; i += 1) {
  list.push(
    <View key={i}>
      <Text style={styles.text}>
        {`item n°${i + 1}`}
      </Text>
    </View>,
  );
}

const DemoScroll = () =>
  <SwipeableViews containerStyle={styles.slideContainer}>
    <ScrollView style={[styles.slide, styles.slide1]}>
      {list}
    </ScrollView>
    <View style={[styles.slide, styles.slide2]}>
      <Text style={styles.text}>slide n°2</Text>
    </View>
    <View style={[styles.slide, styles.slide3]}>
      <Text style={styles.text}>slide n°3</Text>
    </View>
  </SwipeableViews>;

export default DemoScroll;
