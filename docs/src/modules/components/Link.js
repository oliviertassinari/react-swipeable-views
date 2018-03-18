/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NextLink from 'next/link';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  default: {
    color: 'inherit',
  },
  primary: {
    color: theme.palette.primary[500],
  },
  accent: {
    color: theme.palette.secondary.A400,
  },
  button: {
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
});

class OnClick extends React.Component {
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event);
    }
  };

  render() {
    const { component: ComponentProp, onCustomClick, ...props } = this.props;
    return <ComponentProp {...props} onClick={this.handleClick} />;
  }
}

OnClick.propTypes = {
  component: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onCustomClick: PropTypes.func,
};

function Link(props, context) {
  const {
    activeClassName,
    children: childrenProp,
    component: ComponentProp,
    classes,
    className: classNameProp,
    variant,
    href,
    onClick,
    prefetch,
    ...other
  } = props;

  let ComponentRoot;
  const className = classNames(classes.root, classes[variant], classNameProp);
  let rootProps;
  let children = childrenProp;

  if (ComponentProp) {
    ComponentRoot = ComponentProp;
    rootProps = {
      ...other,
      className,
    };
  } else if (href) {
    ComponentRoot = NextLink;
    rootProps = {
      href,
      prefetch,
      passHref: true,
    };
    const active = context.url.pathname === href;
    children = (
      <OnClick
        component="a"
        className={classNames(className, {
          [activeClassName]: active && activeClassName,
        })}
        onCustomClick={onClick}
        {...other}
      >
        {children}
      </OnClick>
    );
  } else {
    ComponentRoot = 'a';
    rootProps = {
      ...other,
      className,
    };
  }

  return <ComponentRoot {...rootProps}>{children}</ComponentRoot>;
}

Link.defaultProps = {
  variant: 'default',
  activeClassName: 'active',
};

Link.contextTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'accent', 'button']),
};

export default withStyles(styles)(Link);
