import React from 'react';

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;
  const getChildrenKey = child => (child ? child.key : null);

  if (props.children.length && nextProps.children.length) {
    const oldKeys = React.Children.map(props.children, getChildrenKey);
    const oldKey = oldKeys[props.index] || null;

    if (oldKey !== null && oldKey !== undefined) {
      const newKeys = React.Children.map(nextProps.children, getChildrenKey);
      const newKey = newKeys[nextProps.index] || null;

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
