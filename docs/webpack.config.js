'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').default;

module.exports = function(options) {
  const webpackConfig = {
    output: {
      path: path.join(__dirname, 'dist'), // No used by webpack dev server
      publicPath: '',
      filename: 'app.js',
    },
    externals: [
      'cordova/exec',
    ],
    resolve: {
      extensions: ['', '.js'],
      root: path.join(__dirname, 'src'),
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.config.environment),
        },
      }),
    ],
    module: {},
    devtool: (options.config.environment === 'development') ? 'eval' : null,
  };

  if (options.config.enableStats) {
    webpackConfig.profile = true;
    webpackConfig.plugins.push(new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/],
    }));
  }

  if (options.config.environment === 'development') {
    const ip = require('ip');

    webpackConfig.entry = [
      `webpack-dev-server/client?http://${ip.address()}:8000`, // WebpackDevServer
      'webpack/hot/only-dev-server',
      './src/app.js',
    ];

    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new UnusedFilesWebpackPlugin({
        failOnUnused: options.config.failOnUnusedFile,
        pattern: 'src/**/*.*',
        globOptions: {
          ignore: [
            'src/**/*.native.js',
          ],
        },
      }),
    ]);

    webpackConfig.module.loaders = [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader?{browsers:["last 2 versions"]}',
          'less-loader',
        ],
      },
    ];
  } else if (options.config.environment === 'production') {
    webpackConfig.entry = [
      './src/app.js',
    ];

    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
      new ExtractTextPlugin('app.css'),
    ]);

    webpackConfig.module.loaders = [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!autoprefixer-loader?{browsers:["last 2 versions"]}!less-loader'
        ),
      },
    ];
  }

  return webpackConfig;
};
