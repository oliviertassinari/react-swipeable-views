# React swipeable views

> A React component for swipeable views

[![npm version](https://img.shields.io/npm/v/react-swipeable-views.svg?style=flat-square)](https://www.npmjs.com/package/react-swipeable-views)
[![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views.svg?style=flat-square)](https://www.npmjs.com/package/react-swipeable-views)

Check out the [demos](http://oliviertassinari.github.io/react-swipeable-views/) from a mobile device (real or emulated).
It is tiny (<4kB) and quickly render the first slide then lasy-load the other.

## Installation

```sh
npm install --save react-swipeable-views
```

## Usage
![alt tag](docs/usage.gif)

```js
const React = require('react')
const SwipeableViews = require('react-swipeable-views')

const MyComponent = React.createClass({
    render: function () {
        return (
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
    }
});

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

module.exports = MyComponent;
```

## Props

- **index** *Integer, default=0* - This is the index of the slide to show.
This is useful when you want to change the default slide shown.
Or when you have tabs linked to each slide.

- **onChangeIndex** *Function(index)* - This is callback prop. It's call by the
component when the shown slide change after a swipe made by the user.
This is useful when you have tabs linked to each slide.

- **style** *Object, default={}* - This is the inlined style that will be applied
to each slide container.

- **threshold** *Integer, default=5* - This is the threshold used for detectinga quick swipe.
If the computed speed is above this value, the index change.

## License

MIT
