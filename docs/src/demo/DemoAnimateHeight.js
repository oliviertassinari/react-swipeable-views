// @flow weak

import React from 'react';
import SwipeableViews from 'react-swipeable-views';

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
    maxHeight: 150,
    overflowY: 'auto',
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  slide4: {
    backgroundColor: '#FEA900',
  },
};

const list = [];

for (let i = 0; i < 30; i++) {
  list.push(
    <div key={i}>
      {`item n°${i + 1}`}
    </div>
  );
}

const DemoAnimateHeight = () => {
  return (
    <SwipeableViews animateHeight={true}>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        {list.slice(0, 10)}
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>
        {'This slide has a max-height limit:'}
        <br />
        <br />
        {list.slice(0, 7)}
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}>
        {list.slice(0, 7)}
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide4)}>
        {list.slice(0, 3)}
      </div>
    </SwipeableViews>
  );
};

export default DemoAnimateHeight;
