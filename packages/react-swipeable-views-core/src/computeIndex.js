import React from 'react';
import constant from './constant';

export default function computeIndex(params) {
  const { children, startIndex, startX, pageX, viewLength, resistance } = params;

  const indexMax = React.Children.count(children) - 1;
  let index = startIndex + (startX - pageX) / viewLength;
  let newStartX;

  if (!resistance) {
    // Reset the starting point
    if (index < 0) {
      index = 0;
      newStartX = (index - startIndex) * viewLength + pageX;
    } else if (index > indexMax) {
      index = indexMax;
      newStartX = (index - startIndex) * viewLength + pageX;
    }
  } else if (index < 0) {
    index = Math.exp(index * constant.RESISTANCE_COEF) - 1;
  } else if (index > indexMax) {
    index = indexMax + 1 - Math.exp((indexMax - index) * constant.RESISTANCE_COEF);
  }

  return {
    index,
    startX: newStartX,
  };
}
