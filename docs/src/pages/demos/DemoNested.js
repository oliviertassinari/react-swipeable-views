import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slideContainerY: {
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
  divider: {
    height: 50,
  },
};

function DemoNested() {
  return (
    <SwipeableViews>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        <div style={{ overflow: 'scroll' }}>
          <div style={{ width: 700 }}>
            This is component is very large so we can test how a native scroll container is handled.
          </div>
        </div>
        slide n°1
        <div style={styles.divider} />
        <SwipeableViews resistance>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>nested slide n°1.1</div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>nested slide n°1.2</div>
        </SwipeableViews>
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>
        <div style={{ overflow: 'scroll' }}>
          <div style={{ width: 700 }}>
            This is component is very large so we can test how a native scroll container is handled.
          </div>
        </div>
        slide n°2
        <div style={styles.divider} />
        <SwipeableViews>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>nested slide n°2.1</div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>nested slide n°2.2</div>
        </SwipeableViews>
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}>
        slide n°3
        <div style={styles.divider} />
        <SwipeableViews axis="y" containerStyle={styles.slideContainerY}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>nested slide n°3.1</div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>nested slide n°3.2</div>
        </SwipeableViews>
      </div>
    </SwipeableViews>
  );
}

export default DemoNested;
