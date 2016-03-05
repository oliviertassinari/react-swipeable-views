import React from 'react';

const Head = (props) => {
  const {
    children,
    description,
    name,
  } = props;

  return (
    <section className="page-header">
      <h1 className="project-name">
        {name}
      </h1>
      <h2 className="project-tagline">
        {description}
      </h2>
      {children}
    </section>
  );
};

Head.propTypes = {
  children: React.PropTypes.node,
  description: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default Head;
