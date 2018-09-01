import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  root: {
    // Simulates a global right-to-left direction.
    direction: 'rtl',
  },
  slide: {
    direction: 'rtl',
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

function DemoRtl() {
  return (
    <div style={styles.root}>
      <SwipeableViews axis="x-reverse">
        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
      </SwipeableViews>
    </div>
  );
}

export default DemoRtl;
