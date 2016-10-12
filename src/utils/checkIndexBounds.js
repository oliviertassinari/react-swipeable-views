/* eslint-disable flowtype/require-valid-file-annotation */

import { Children } from 'react';
import warning from 'warning';

const checkIndexBounds = (props) => {
  const {
    index,
    children,
  } = props;

  const childrenCount = Children.count(children);

  warning(index >= 0 && index <= childrenCount,
    `react-swipeable-view: the new index: ${index} is out of bounds: [0-${childrenCount}].`
  );
};

export default checkIndexBounds;
