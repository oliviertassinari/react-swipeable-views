import React from 'react';
import warning from 'warning';

const checkIndexBounds = props => {
  const { index, children } = props;

  const childrenCount = React.Children.count(children);

  warning(
    index >= 0 && index <= childrenCount,
    `react-swipeable-view: the new index: ${index} is out of bounds: [0-${childrenCount}].`,
  );
};

export default checkIndexBounds;
