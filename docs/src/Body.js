import React, {PropTypes} from 'react';

const styles = {
  root: {
    padding: 20,
  },
};

const Body = (props) => {
  const {
    children,
  } = props;

  return (
    <div style={styles.root}>
      {children}
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Body;
