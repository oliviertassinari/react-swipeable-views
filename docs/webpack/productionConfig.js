// @flow weak

import webpack from 'webpack';
import baseConfig from './baseConfig';

export default {
  ...baseConfig,
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
            },
          };
        }

        return rule;
      }),
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
