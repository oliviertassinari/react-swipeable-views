// @flow weak

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './Main';

require('./normalize.less');
require('./stylesheet.less');

const renderRoot = (Component) => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('#main'),
  );
};

renderRoot(Main);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Main', () => {
    const NewMain = require('./Main').default;
    renderRoot(NewMain);
  });
}
