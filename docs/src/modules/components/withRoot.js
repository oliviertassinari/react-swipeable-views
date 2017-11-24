import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import pure from 'recompose/pure';
import wrapDisplayName from 'recompose/wrapDisplayName';
import AppWrapper from 'docs/src/modules/components/AppWrapper';

const pages = [
  {
    pathname: '/getting-started',
    children: [
      {
        pathname: '/getting-started/installation',
      },
      {
        pathname: '/getting-started/usage',
      },
      {
        pathname: '/getting-started/example-projects',
      },
      {
        pathname: '/getting-started/supported-platforms',
      },
    ],
  },
  {
    pathname: '/demos',
    title: 'Component Demos',
    children: [
      {
        pathname: '/demos/demos',
      },
    ],
  },
  {
    pathname: '/api',
    title: 'Component API',
    children: [
      {
        pathname: '/api/api',
      },
    ],
  },
  {
    pathname: '/',
    title: false,
  },
];

function findActivePage(currentPages, url) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return url.pathname.indexOf(page.pathname) !== -1;
    }

    // Should be an exact match if no children
    return url.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== url.pathname) {
    return findActivePage(activePage.children, url);
  }

  return activePage;
}

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);

  class WithRoot extends React.Component {
    static childContextTypes = {
      url: PropTypes.object,
      pages: PropTypes.array,
      activePage: PropTypes.object,
    };

    static getInitialProps(ctx) {
      let initialProps = {};

      if (BaseComponent.getInitialProps) {
        const baseComponentInitialProps = BaseComponent.getInitialProps(ctx);
        initialProps = {
          ...baseComponentInitialProps,
          ...initialProps,
        };
      }

      if (process.browser) {
        return initialProps;
      }

      return initialProps;
    }

    getChildContext() {
      return {
        url: this.props.url ? this.props.url : null,
        pages,
        activePage: findActivePage(pages, this.props.url),
      };
    }

    render() {
      const { sheetsRegistry, ...other } = this.props;

      return (
        <AppWrapper sheetsRegistry={sheetsRegistry}>
          <PureBaseComponent initialProps={other} />
        </AppWrapper>
      );
    }
  }

  WithRoot.propTypes = {
    sheetsRegistry: PropTypes.object,
    url: PropTypes.object,
  };

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
