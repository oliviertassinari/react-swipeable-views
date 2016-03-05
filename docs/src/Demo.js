import React from 'react';

const supportsTouch = 'ontouchstart' in window;

const styles = {
  name: {
    marginTop: 20,
  },
};

const Demo = (props) => {
  const {
    children,
    description,
    name,
  } = props;

  return (
    <div>
      <h3 style={styles.name}>
        {name}
      </h3>
      <p>
        {description}
        {!supportsTouch &&
          <span className="pl-id">
            <br />
            You need a touch device to swipe between the 3 slides.
          </span>
        }
      </p>
      {children}
    </div>
  );
};

Demo.propTypes = {
  children: React.PropTypes.node.isRequired,
  description: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default Demo;
