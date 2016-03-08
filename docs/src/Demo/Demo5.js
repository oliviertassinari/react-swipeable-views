import React from 'react';
import SwipeableViews from '../../../src/index';

const Demo5 = (props) => {
  const {
    styles,
  } = props;

  return (
    <SwipeableViews containerStyle={styles.slideContainer} resistance={true}>
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
};

Demo5.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export default Demo5;
