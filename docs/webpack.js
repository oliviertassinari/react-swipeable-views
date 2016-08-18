// @flow weak

/* eslint-disable no-console */
import minimist from 'minimist';
import rimraf from 'rimraf';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import webpackConfig from './webpack.config';

const argv = minimist(process.argv.slice(2));

const PORT_DEV_WEBPACK = 8001;

if (argv.dev === true) {
  const compiler = webpack(webpackConfig({
    port: PORT_DEV_WEBPACK,
    config: {
      environment: 'development',
      enableStats: false,
      failOnUnusedFile: false,
    },
  }));

  compiler.apply(new ProgressPlugin((percentage, msg) => {
    console.log(`${Math.floor(percentage * 100)}%`, msg);
  }));

  const server = new WebpackDevServer(compiler, {
    // webpack-dev-server options
    hot: true,
    historyApiFallback: true,

    // webpack-dev-middleware options
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
  });

  server.listen(PORT_DEV_WEBPACK, undefined, () => {});
} else {
  rimraf.sync('dist');

  const compiler = webpack(webpackConfig({
    config: {
      environment: 'production',
      enableStats: false,
      failOnUnusedFile: true,
    },
  }));

  compiler.apply(new ProgressPlugin((percentage, msg) => {
    console.log(`${Math.floor(percentage * 100)}%`, msg);
  }));

  compiler.run((err, stats) => {
    if (err) {
      throw new Error(err);
    }

    console.log(stats.toString({
      colors: true,
      hash: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
    }));

    if (stats.hasErrors()) {
      throw new Error('Webpack failed');
    }
  });
}
