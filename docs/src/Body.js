import React from 'react';

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
  children: React.PropTypes.node.isRequired,
};

export default Body;
