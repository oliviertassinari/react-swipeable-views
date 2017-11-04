// @flow

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('./dom')();
require('./consoleError')();

enzyme.configure({ adapter: new Adapter() });
