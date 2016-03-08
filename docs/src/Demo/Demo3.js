import React from 'react';
import SwipeableViews from '../../../src/index';

const Demo3 = (props) => {
  const {
    list,
    styles,
  } = props;

  return (
    <SwipeableViews containerStyle={styles.slideContainer}>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        {list}
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

Demo3.propTypes = {
  list: React.PropTypes.array.isRequired,
  styles: React.PropTypes.object.isRequired,
};

export default Demo3;
