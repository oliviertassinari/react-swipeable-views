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
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  divider: {
    height: 50,
  },
};

const DemoNested = () => (
  <SwipeableViews>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      <div style={{overflow: 'scroll'}}>
        <div style={{width: 700}}>
        This is component is very large so we can test how a native scroll container is handled.
        </div>
      </div>
      slide n°1
      <div style={styles.divider} />
      <SwipeableViews resistance={true}>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
          nested slide n°1
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
          nested slide n°2
        </div>
      </SwipeableViews>
    </div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>
      <div style={{overflow: 'scroll'}}>
        <div style={{width: 700}}>
        This is component is very large so we can test how a native scroll container is handled.
        </div>
      </div>
      slide n°2
      <div style={styles.divider} />
      <SwipeableViews>
        <div style={Object.assign({}, styles.slide, styles.slide1)}>
          nested slide n°3
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
          nested slide n°4
        </div>
      </SwipeableViews>
    </div>
  </SwipeableViews>
);

export default DemoNested;
