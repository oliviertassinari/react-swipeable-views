import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slideContainer: {
    height: 100,
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
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
};

const list = [];

for (let i = 0; i < 30; i += 1) {
  list.push(<div key={i}>{`item n°${i + 1}`}</div>);
}

function DemoScroll() {
  return (
    <SwipeableViews containerStyle={styles.slideContainer}>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>{list}</div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
    </SwipeableViews>
  );
}

export default DemoScroll;
