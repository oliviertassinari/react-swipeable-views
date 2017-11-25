import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
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
};

function slideRenderer(params) {
  const { index, key } = params;

  switch (mod(index, 3)) {
    case 0:
      return (
        <div key={key} style={Object.assign({}, styles.slide, styles.slide1)}>
          slide n°1
        </div>
      );

    case 1:
      return (
        <div key={key} style={Object.assign({}, styles.slide, styles.slide2)}>
          slide n°2
        </div>
      );

    case 2:
      return (
        <div key={key} style={Object.assign({}, styles.slide, styles.slide3)}>
          slide n°3
        </div>
      );

    default:
      return null;
  }
}

function DemoSimple() {
  return <VirtualizeSwipeableViews slideRenderer={slideRenderer} />;
}

export default DemoSimple;
