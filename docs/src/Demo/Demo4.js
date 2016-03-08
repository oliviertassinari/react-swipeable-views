import React from 'react';
import SwipeableViews from '../../../src/index';

const Demo4 = (props) => {
  const {
    list,
    styles,
  } = props;

  return (
    <SwipeableViews>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        {list.slice(0, 10)}
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>
        {list.slice(0, 7)}
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}>
        {list.slice(0, 3)}
      </div>
    </SwipeableViews>
  );
};

Demo4.propTypes = {
  list: React.PropTypes.array.isRequired,
  styles: React.PropTypes.object.isRequired,
};

export default Demo4;
