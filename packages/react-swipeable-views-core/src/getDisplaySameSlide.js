import React from 'react';

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;
  const oldChildren = React.Children.toArray(props.children);
  const nextChildren = React.Children.toArray(nextProps.children);
  if (oldChildren.length && nextChildren.length) {
    const oldChild = oldChildren[props.index];
    const oldKey = oldChild ? oldChild.key : 'empty';

    if (oldKey !== null) {
      const newChild = nextChildren[nextProps.index];
      const newKey = newChild ? newChild.key : 'empty';

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
