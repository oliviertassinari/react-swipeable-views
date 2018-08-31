import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { withRouter } from 'next/router';
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
    displayNav: false,
    title: false,
  },
];

function findActivePage(currentPages, router) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return router.pathname.indexOf(page.pathname) === 0;
    }

    // Should be an exact match if no children
    return router.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== router.pathname) {
    return findActivePage(activePage.children, router);
  }

  return activePage;
}

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);

  class WithRoot extends React.Component {
    getChildContext() {
      const { router } = this.props;

      let pathname = router.pathname;
      if (pathname !== '/') {
        // The leading / is only added to support static hosting (resolve /index.html).
        // We remove it to normalize the pathname.
        pathname = pathname.replace(/\/$/, '');
      }

      return {
        pages,
        activePage: findActivePage(pages, { ...router, pathname }),
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
    router: PropTypes.object.isRequired,
    sheetsRegistry: PropTypes.object,
  };

  WithRoot.childContextTypes = {
    pages: PropTypes.array,
    activePage: PropTypes.object,
  };

  WithRoot.getInitialProps = ctx => {
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
  };

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return withRouter(WithRoot);
}

export default withRoot;
