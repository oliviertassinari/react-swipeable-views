const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;

  if (props.children.length && nextProps.children.length) {
    const oldChildren = props.children[props.index];
    const oldKey = oldChildren ? oldChildren.key : 'empty';

    if (oldKey !== null) {
      const newChildren = nextProps.children[nextProps.index];
      const newKey = newChildren ? newChildren.key : 'empty';

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
