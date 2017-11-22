import React from 'react';
import PropTypes from 'prop-types';

const supportsTouch = 'ontouchstart' in window;

const styles = {
  name: {
    marginTop: 16,
    marginBottom: 16,
    color: '#159957',
    fontSize: 19,
    fontWeight: 'normal',
  },
  description: {
    color: '#606c71',
    fontSize: 16,
    marginBottom: 16,
  },
};

function Demo(props) {
  const { children, description, name } = props;

  return (
    <div>
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.description}>
        {description}
        {!supportsTouch && (
          <span className="pl-id">
            <br />
            You need a touch device to swipe between the 3 slides.
          </span>
        )}
      </p>
      {children}
    </div>
  );
}

Demo.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Demo;
