// @flow weak
/* eslint-disable react/no-multi-comp */

import React from 'react';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import virtualize from 'react-swipeable-views/lib/virtualize';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import mod from 'react-swipeable-views/lib/utils/mod';

const EnhancedSwipeableViews = bindKeyboard(autoPlay(virtualize(SwipeableViews)));

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

    default:
      break;
  }

  return (
    <div style={Object.assign({}, styles.slide, style)} key={key}>
      {`slide n°${index + 1}`}
    </div>
  );
}

const DemoHocs = () => (
  <EnhancedSwipeableViews
    slideCount={10}
    slideRenderer={slideRenderer}
  />
);

export default DemoHocs;
