// @flow weak

import webpack from 'webpack';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';
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
    quiet: false,
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    stats: {
      modules: false,
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  },
  module: {
    rules: [
      ...baseConfig.module.rules.map((rule) => {
        if (rule.use === 'babel-loader') {
          return {
            ...rule,
            options: {
              presets: [
                ['es2015', {
                  modules: false,
                }],
              ],
              plugins: [
                'react-hot-loader/babel',
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
    new ForceCaseSensitivityPlugin(),
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
