/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

function getTheme(theme) {
  return createMuiTheme({
    direction: theme.direction,
    palette: {
      primary: amber,
      secondary: pink,
      type: theme.paletteType,
    },
    nprogress: {
      color: amber[500],
    },
  });
}

const theme = getTheme({
  direction: 'ltr',
  paletteType: 'light',
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = 'insertion-point-jss';

function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: jss.options.createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext();
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
