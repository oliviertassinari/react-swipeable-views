# React swipeable views

> A React component for swipeable views.

[![npm version](https://img.shields.io/npm/v/react-swipeable-views.svg?style=flat-square)](https://www.npmjs.com/package/react-swipeable-views)
[![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views.svg?style=flat-square)](https://www.npmjs.com/package/react-swipeable-views)
[![Build Status](https://travis-ci.org/oliviertassinari/react-swipeable-views.svg?branch=master)](https://travis-ci.org/oliviertassinari/react-swipeable-views)

[![Dependencies](https://img.shields.io/david/oliviertassinari/react-swipeable-views.svg?style=flat-square)](https://david-dm.org/oliviertassinari/react-swipeable-views)
[![DevDependencies](https://img.shields.io/david/dev/oliviertassinari/react-swipeable-views.svg?style=flat-square)](https://david-dm.org/oliviertassinari/react-swipeable-views#info=devDependencies&view=list)

[![TypeScript definitions on DefinitelyTyped](//definitelytyped.org/badges/standard.svg)](http://definitelytyped.org)

Check out the [demos](http://oliviertassinari.github.io/react-swipeable-views/) from a mobile device (real or emulated).
It is tiny (<4kB) and quickly render the first slide then lasy-load the other.

## Installation

```sh
npm install react-swipeable-views
```

## Usage
![alt tag](docs/usage.gif)

### Browser

```js
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const MyComponent = () => (
  <SwipeableViews>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      slide n°2
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide3)}>
      slide n°3
    </div>
  </SwipeableViews>
);

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

export default MyComponent;
```

### Native

```js
import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'react-native-button';

import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
// There is another version. I'm unsure which one give the best UX.
// import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';

const MyComponent = () => (
  <SwipeableViews style={slideContainer}>
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

export default MyComponent;
```

## Supported platforms

The API is as consistent as possible between the three platforms so
the same component can be used independently on where it's running.

### Browser
![alt tag](docs/platformBrowser.gif)

### iOS
![alt tag](docs/platformIOS.gif)

### Android
![alt tag](docs/platformAndroid.gif)

## Properties

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Use this property to provide your slides. |
| containerStyle | object | {} | Whether or not the auto complete is animated as it is toggled. |
| disabled | bool | false | If true, it will disable touch events. This is useful when you want to prohibit the user from changing slides. |
| index | integer | 0 | This is the index of the slide to show. This is useful when you want to change the default slide shown. Or when you have tabs linked to each slide. |
| onChangeIndex | Function(index, fromIndex) |  | This is callback prop. It's call by the component when the shown slide change after a swipe made by the user. This is useful when you have tabs linked to each slide. |
| onSwitching | Function(index) |  | This is callback prop. It's called by the component when the slide switching. This is useful when you want to implement something corresponding to the current slide position. |
| resistance | bool | false | If true, it will add bounds effect on the edges. |
| style | object | {} | This is the inlined style that will be applied on the root component. |
| slideStyle | object | {} | This is the inlined style that will be applied on the slide component. |
| threshold | integer | 5 | This is the threshold used for detectinga quick swipe. If the computed speed is above this value, the index change. |

Any other properties like `className` will be applied to the root component.

## License

MIT
