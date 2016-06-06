import React from 'react';
import {render} from 'react-dom';
import Main from 'Main';

require('normalize.less');
require('stylesheet.less');
require('github-light.less');

render(<Main />, document.getElementById('main'));
