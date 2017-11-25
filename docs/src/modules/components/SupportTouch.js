import React from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'docs/src/modules/components/NoSSR';

const supportsTouch = 'ontouchstart' in global;

function Fragment(props) {
  return props.children;
}

function SupportTouch(props) {
  const { children } = props;

  return (
    <Fragment>
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
    </Fragment>
  );
}

SupportTouch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SupportTouch;
