import React from 'react';
import PropTypes from 'prop-types';
import NoSsr from '@material-ui/core/NoSsr';

const supportsTouch = 'ontouchstart' in global;

function SupportTouch(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <NoSsr>
        {!supportsTouch && (
          <span>
            You need a touch device to swipe between the slides.
            <br />
            <br />
          </span>
        )}
      </NoSsr>
      {children}
    </React.Fragment>
  );
}

SupportTouch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SupportTouch;
