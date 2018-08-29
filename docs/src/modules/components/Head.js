import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

function Head(props) {
  const { title, description } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@oliviertassinari" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/snowflake_2744.png"
      />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/snowflake_2744.png"
      />
      <meta property="og:locale" content="en_US" />
    </NextHead>
  );
}

Head.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Head.defaultProps = {
  description: 'A React component for swipeable views.',
  title: 'react-swipeable-views',
};

export default Head;
