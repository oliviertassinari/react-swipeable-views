import webpack from 'webpack';
import baseConfig from './baseConfig';

export default {
  ...baseConfig,
  module: {
    rules: [
      ...baseConfig.module.rules.map(rule => {
        if (rule.loader === 'babel-loader') {
          return {
            ...rule,
            query: {
              presets: [
                [
                  'es2015',
                  {
                    modules: false,
                  },
                ],
              ],
              plugins: ['transform-class-properties'],
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
