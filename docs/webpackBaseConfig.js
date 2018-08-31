const path = require('path');

// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [path.join(__dirname, '../'), 'node_modules'],
    alias: {
      'react-swipeable-views': path.resolve(__dirname, '../packages/react-swipeable-views/src'),
      'react-swipeable-views-core': path.resolve(
        __dirname,
        '../packages/react-swipeable-views-core/src',
      ),
      'react-swipeable-views-utils': path.resolve(
        __dirname,
        '../packages/react-swipeable-views-utils/src',
      ),
      docs: __dirname,
    },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
};
