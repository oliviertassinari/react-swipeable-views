# react-swipeable-views-native

[![npm version](https://img.shields.io/npm/v/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native)
[![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native)
[![Demo](https://img.shields.io/badge/demo-expo-blue.svg)](https://expo.io/@yacut/react-swipeable-views-native)
[![Donate](https://img.shields.io/badge/$-support-green.svg)](https://paypal.me/yacut)

> A React Native component for swipeable views.

## Installation

```sh
npm install --save react-swipeable-views-native
# or
yarn add react-swipeable-views-native
```

## Usage

```jsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SwipeableViews from 'react-swipeable-views-native';
// There is another version using the scroll component instead of animated.
// I'm unsure which one give the best UX. Please give us some feedback.
// import SwipeableViews from 'react-swipeable-views-native/lib/SwipeableViews.scroll';

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

const MyComponent = () => (
  <SwipeableViews style={styles.slideContainer}>
    <View style={[styles.slide, styles.slide1]}>
      <Text style={styles.text}>
        slide n°1
      </Text>
    </View>
    <View style={[styles.slide, styles.slide2]}>
      <Text style={styles.text}>
        slide n°2
      </Text>
    </View>
    <View style={[styles.slide, styles.slide3]}>
      <Text style={styles.text}>
        slide n°3
      </Text>
    </View>
  </SwipeableViews>
);

export default MyComponent;
```

## License

This project is licensed under the terms of the
[MIT license](https://github.com/oliviertassinari/react-swipeable-views/blob/master/LICENSE).