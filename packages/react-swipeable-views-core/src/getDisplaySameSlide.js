import React from 'react';

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;
  const getChildrenKey = child => (child ? child.key : 'empty');

  if (props.children.length && nextProps.children.length) {
    const oldKeys = React.Children.map(props.children, getChildrenKey);
    const oldKey = oldKeys[props.index];

    if (oldKey !== null && oldKey !== undefined) {
      const newKeys = React.Children.map(nextProps.children, getChildrenKey);
      const newKey = newKeys[nextProps.index];

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
