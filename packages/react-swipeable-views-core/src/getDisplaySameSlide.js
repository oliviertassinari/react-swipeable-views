import React from 'react';

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;
  const getChildrenKey = child => (child ? child.key : 'empty');

  if (props.children.length && nextProps.children.length) {
    const oldKeys = React.Children.toArray(props.children)
      .filter(Boolean)
      .map(getChildrenKey);
    const oldKey = oldKeys[props.index];

    if (oldKey !== null && oldKey !== undefined) {
      const newKeys = React.Children.toArray(nextProps.children)
        .filter(Boolean)
        .map(getChildrenKey);
      const newKey = newKeys[nextProps.index];

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
