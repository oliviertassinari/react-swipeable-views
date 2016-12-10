// @flow weak

import React from 'react';
import { render } from 'react-dom';
import Main from './Main';

require('./normalize.less');
require('./stylesheet.less');

render(<Main />, document.getElementById('main'));
