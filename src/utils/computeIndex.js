// @flow weak

import { Children } from 'react';
import { RESISTANCE_COEF } from '../constant';

export default function computeIndex(params) {
  const {
    children,
    indexLatest,
    startX,
    pageX,
    viewLength,
    resistance,
  } = params;

  const indexMax = Children.count(children) - 1;
  let index = indexLatest + ((startX - pageX) / viewLength);
  let newStartX;

  if (!resistance) {
    // Reset the starting point
    if (index < 0) {
      index = 0;
      newStartX = ((index - indexLatest) * viewLength) + pageX;
    } else if (index > indexMax) {
      index = indexMax;
      newStartX = ((index - indexLatest) * viewLength) + pageX;
    }
  } else if (index < 0) {
    index = Math.exp(index * RESISTANCE_COEF) - 1;
  } else if (index > indexMax) {
    index = (indexMax + 1) - Math.exp((indexMax - index) * RESISTANCE_COEF);
  }

  return {
    index,
    startX: newStartX,
  };
}
