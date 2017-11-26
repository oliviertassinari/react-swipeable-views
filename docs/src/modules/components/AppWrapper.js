/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import getContext from 'docs/src/modules/styles/getContext';
import JssProvider from 'react-jss/lib/JssProvider';
import AppFrame from 'docs/src/modules/components/AppFrame';
import { lightTheme, setPrismTheme } from 'docs/src/modules/utils/prism';

// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component {
  componentWillMount() {
    this.styleContext = getContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    setPrismTheme(lightTheme);
  }

  styleContext = null;

  render() {
    const { children, sheetsRegistry } = this.props;

    return (
      <JssProvider
        registry={sheetsRegistry}
        jss={this.styleContext.jss}
        generateClassName={this.styleContext.generateClassName}
      >
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppFrame>{children}</AppFrame>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  sheetsRegistry: PropTypes.object,
};

export default AppWrapper;
