import React from 'react';
import SwipeableViews from '../../../src/index';

const Demo6 = (props) => {
  const {
    styles,
  } = props;

  return (
    <SwipeableViews containerStyle={{}}>
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
};

Demo6.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export default Demo6;
