import minimist from 'minimist';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';

const argv = minimist(process.argv.slice(2));

if (argv.dev === true) {
  const config = webpackConfig({
    config: {
      environment: 'development',
      enableStats: false,
      failOnUnusedFile: false,
    },
  });

  const server = new WebpackDevServer(webpack(config), {
    // webpack-dev-server options
    hot: true,
    historyApiFallback: false,

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    filename: 'bundle.js',
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

  server.listen(8001, 'localhost', () => {});
} else {
  const compiler = webpack(webpackConfig({
    config: {
      environment: 'production',
      enableStats: false,
      failOnUnusedFile: true,
    },
  }));
  compiler.apply(new ProgressPlugin((percentage, msg) => {
    console.log(`${percentage * 100}%`, msg);
  }));
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
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
  });
}
