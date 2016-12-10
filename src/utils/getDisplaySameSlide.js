// @flow weak

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;

  if (props.children.length && nextProps.children.length) {
    const oldKey = props.children[props.index] ? props.children[props.index].key : null;

    if (oldKey !== null) {
      const newKey = nextProps.children[nextProps.index].key;

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

export default getDisplaySameSlide;
