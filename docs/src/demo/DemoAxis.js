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
  scroll: {
    height: 100,
    overflow: 'scroll',
  },
  slide3: {
    height: 200,
    backgroundColor: '#6AC0FF',
  },
};

function DemoAxis() {
  return (
    <SwipeableViews containerStyle={styles.slideContainer} axis="y" resistance>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
      <div style={styles.scroll}>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
      </div>
    </SwipeableViews>
  );
}

export default DemoAxis;
