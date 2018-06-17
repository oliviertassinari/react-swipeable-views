import React from 'react';
import PropTypes from 'prop-types';
import NoSSR from '@material-ui/docs/NoSSR';

const supportsTouch = 'ontouchstart' in global;

function SupportTouch(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <NoSSR>
        {!supportsTouch && (
          <span>
            You need a touch device to swipe between the slides.
            <br />
            <br />
          </span>
        )}
      </NoSSR>
      {children}
    </React.Fragment>
  );
}

SupportTouch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SupportTouch;
