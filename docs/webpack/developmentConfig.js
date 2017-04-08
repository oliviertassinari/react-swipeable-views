// @flow weak

import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import baseConfig from './baseConfig';

const PORT = 8001;

export default {
  ...baseConfig,
  entry: [
    // activate HMR for React.
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint.
    `webpack-dev-server/client?http://localhost:${PORT}`,
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates.
    'webpack/hot/only-dev-server',
    ...baseConfig.entry,
  ],
  output: {
    ...baseConfig.output,
    // * filename */ comments to generated require()s in the output.
    pathinfo: true,
    publicPath: '/',
  },
  // webpack-dev-server options.
  devServer: {
    // activate hot reloading.
    hot: true,
    historyApiFallback: true,
    port: PORT,

    // webpack-dev-middleware options.
    stats: {
      // Remove built modules information.
      modules: false,
      // Remove built modules information to chunk information.
      chunkModules: false,
      colors: true,
    },
  },
  module: {
    rules: [
      ...baseConfig.module.rules.map((rule) => {
        if (rule.loader === 'babel-loader') {
          return {
            ...rule,
            query: {
              presets: [
                ['es2015', {
                  modules: false,
                }],
              ],
              plugins: [
                'react-hot-loader/babel',
                'transform-class-properties',
              ],
            },
          };
        }

        return rule;
      }),
    ],
  },
  devtool: 'eval', // no SourceMap, but named modules. Fastest at the expense of detail.
  plugins: [
    ...baseConfig.plugins,
    // Prevent naming issues.
    new CaseSensitivePathsPlugin(),
    // Activates HMR.
    new webpack.HotModuleReplacementPlugin(),
    // Prints more readable module names in the browser console on HMR updates.
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
