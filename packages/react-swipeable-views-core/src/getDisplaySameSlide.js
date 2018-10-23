import React from 'react';

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;
  const getChildrenKey = child => child ? child.key : 'empty';

  if (props.children.length && nextProps.children.length) {
    const oldKeys = React.Children.map(props.children, getChildrenKey);
    const oldKey = oldKeys[props.index] || 'empty';

    if (oldKey !== null) {
      const newKeys = React.Children.map(nextProps.children, getChildrenKey);
      const newKey = newKeys[nextProps.index] || 'empty';

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
