// @flow weak
/* eslint-disable react/no-multi-comp */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import SwipeableViews from '../../../src/index.native.animated';
import virtualize from '../../../src/virtualize';
import autoPlay from '../../../src/autoPlay';
import mod from '../../../src/utils/mod';

const EnhancedSwipeableViews = autoPlay(virtualize(SwipeableViews));

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
  const {
    index,
    key,
  } = params;
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
  }

  return (
    <View style={[styles.slide, style]} key={key}>
      <Text style={styles.text}>
        {`slide n°${index + 1}`}
      </Text>
    </View>
  );
}

const DemoHocs = () => (
  <EnhancedSwipeableViews
    slideCount={10}
    slideRenderer={slideRenderer}
  />
);

export default DemoHocs;
