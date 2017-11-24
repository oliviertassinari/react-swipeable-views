# react-swipeable-views

> A React component for swipeable views.

| Package | Version | Download |
|---------|:--------|:---------|
| react-swipeable-views | [![npm version](https://img.shields.io/npm/v/react-swipeable-views.svg)](https://www.npmjs.com/package/react-swipeable-views) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views.svg)](https://www.npmjs.com/package/react-swipeable-views) |
| react-swipeable-views-utils | [![npm version](https://img.shields.io/npm/v/react-swipeable-views-utils.svg)](https://www.npmjs.com/package/react-swipeable-views-utils) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-utils.svg)](https://www.npmjs.com/package/react-swipeable-views-utils) |
| react-swipeable-views-native | [![npm version](https://img.shields.io/npm/v/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native) |

[![Build Status](https://travis-ci.org/oliviertassinari/react-swipeable-views.svg?branch=master)](https://travis-ci.org/oliviertassinari/react-swipeable-views)

[![Dependencies](https://img.shields.io/david/oliviertassinari/react-swipeable-views.svg)](https://david-dm.org/oliviertassinari/react-swipeable-views)
[![DevDependencies](https://img.shields.io/david/dev/oliviertassinari/react-swipeable-views.svg)](https://david-dm.org/oliviertassinari/react-swipeable-views#info=devDependencies&view=list)
[![Donate](https://img.shields.io/badge/$-support-green.svg)](https://www.paypal.me/oliviertassinari/10)
[![TypeScript definitions on DefinitelyTyped](https://img.shields.io/badge/style-.d.ts-green.svg?style=flat&label=DefinitelyTyped)](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-swipeable-views)

## Installation

### Browser

```sh
npm install --save react-swipeable-views
```

### Native (experimental)

```sh
npm install --save react-swipeable-views-native
```

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/exeebWrRmXisY5kkhcJd58AS/oliviertassinari/react-swipeable-views'><img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/exeebWrRmXisY5kkhcJd58AS/oliviertassinari/react-swipeable-views.svg' /></a>

## The problem solved

Check out the [demos](http://oliviertassinari.github.io/react-swipeable-views/) from a mobile device (real or emulated).
It's tiny (<15 kB gzipped), it quickly renders the first slide, then lazy-loads the others.

## Simple example
![usage](docs/usage.gif)

### Browser

```jsx
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

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

export default MyComponent;
```

### Native (experimental)

react-native support is experimental and I have no plan pushing it forward.
I start to think that lower level abstraction to share the implementation between the platforms are more appropriate.
We have two different implementations of the react-swipeable-views API.

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

## Supported platforms

The API is as consistent as possible between the three platforms so
the same component can be used independently on where it's running.

### Browser

![browser](docs/platformBrowser.gif)

| IE    | Edge | Windows Phone | Firefox | Chrome | Safari |
|:------|:-----|:--------------|:--------|:-------|:-------|
| >= 10 | ✓    | x             | >= 28   | >= 29  | >= 8   |

### iOS

![ios](docs/platformIOS.gif)

### Android

![android](docs/platformAndroid.gif)

## Example with `virtualize`

The infinite feature is provided thanks to a *higher order component*.
It's working independently of the targeted platform.
You can have a look at *Demo 8* to see it in action.
It's highly inspired by [react-virtualized](https://github.com/bvaughn/react-virtualized).
Let's see an example with the browser:

```jsx
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const slideRenderer = ({key, index}) => (
  <div key={key}>
    {`slide n°${index + 1}`}
  </div>
);

const MyComponent = () => (
  <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
);

export default MyComponent;
```

## Example with `autoPlay`

The auto play feature is provided thanks to a *higher order component*.
It's working independently of the targeted platform.
You can have a look at *Demo 7* to see it in action.
Let's see an example with the browser:

```jsx
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MyComponent = () => (
  <AutoPlaySwipeableViews>
    <div>slide n°1</div>
    <div>slide n°2</div>
    <div>slide n°3</div>
  </AutoPlaySwipeableViews>
);

export default MyComponent;
```

## Example with `bindKeyboard`

The keyboard navigation feature is provided thanks to a *higher order component*.
You can have a look at *Demo 9* to see it in action.
Let's see an example with the browser:

```jsx
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const MyComponent = () => (
  <BindKeyboardSwipeableViews>
    <div>slide n°1</div>
    <div>slide n°2</div>
    <div>slide n°3</div>
  </BindKeyboardSwipeableViews>
);

export default MyComponent;
```

## API

You can find the [API documentation section online](https://oliviertassinari.github.io/react-swipeable-views/api/).

## Composition of HOCs

The composition order of the HOCs matters.
The `virtualize` HOC needs to be the first one called.
For instance:
```js
// creates a function that invokes the given functions from right to left.
import flowRight from 'lodash/flowRight';

const EnhancedSwipeableViews = flowRight(
  bindKeyboard,
  autoPlay,
  virtualized,
)(SwipeableViews);
```

## Performance on browser

Having 60 FPS is critical for this type of component.
We are rendering the slides at each request animation frame.
That has one specific implication for package users.
You need to add a **pure logic** in the *slides* components if your render method is expensive.

The performance is not as good as they could be if we were using a data binding to update the styles.
However, the implementation is simpler.

## Packages stucture

The project is split into multiple packages.
This is really useful for code sharing and isolation.
We are using [Lerna](https://github.com/lerna/lerna) to do so.
The project has the following packages:
- `react-swipeable-views-core`: core modules shared between the different packages.
- [react-swipeable-views](https://www.npmjs.com/package/react-swipeable-views): browser implementation of the `<SwipeableViews />` component.
- [react-swipeable-views-native](https://www.npmjs.com/package/react-swipeable-views-native): native implementation**s** of the `<SwipeableViews />` component.
- [react-swipeable-views-utils](https://www.npmjs.com/package/react-swipeable-views-utils): Higher order Components providing additional functionalities like `virtualize()`.

## License

MIT
