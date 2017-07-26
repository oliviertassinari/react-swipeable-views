// @flow weak

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: ['./docs/src/app.js'],
  output: {
    pathinfo: false,
    path: path.join(__dirname, '../dist'), // No used by webpack dev server
    publicPath: '',
    filename: 'app.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js'],
    alias: {
      'react-swipeable-views': path.resolve(__dirname, '../../packages/react-swipeable-views/src'),
      'react-swipeable-views-core': path.resolve(
        __dirname,
        '../../packages/react-swipeable-views-core/src',
      ),
      'react-swipeable-views-utils': path.resolve(
        __dirname,
        '../../packages/react-swipeable-views-utils/src',
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader?{browsers:["last 2 versions"]}',
          'less-loader',
        ],
      },
    ],
  },
  performance: {
    maxAssetSize: 4e6,
    maxEntrypointSize: 6e6,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './docs/src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
