// @flow weak

import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slideContainer: {
    height: 100,
  },
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
  divider: {
    height: 50,
  },
};

const Demo6 = () => (
  <SwipeableViews>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      slide n°1
      <div style={styles.divider} />
      <SwipeableViews containerStyle={styles.slideContainer} resistance={true}>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
          nested slide n°1
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
          nested slide n°2
        </div>
      </SwipeableViews>
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      slide n°2
    </div>
  </SwipeableViews>
);

export default Demo6;
