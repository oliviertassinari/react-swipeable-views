'use strict';

const webpackConfig = require('./webpack.config.js');

// Tasks runner
module.exports = function(grunt) {
  require('time-grunt')(grunt); // Display the elapsed execution time of grunt tasks
  require('jit-grunt')(grunt, { // Just In Time plugin loader for grunt
    'webpack-dev-server': 'grunt-webpack',
  });

  grunt.initConfig({
    'webpack-dev-server': {
      options: {
        webpack: webpackConfig({
          config: {
            environment: 'development',
            enableStats: false,
            failOnUnusedFile: false,
          },
        }),
        port: 8001,
        hot: true,
        historyApiFallback: true,
      },
      server: {
        keepAlive: true,
      },
    },

    webpack: {
      options: webpackConfig({
        config: {
          environment: 'production',
          enableStats: false,
          failOnUnusedFile: true,
        },
      }),
      dist: {
      },
    },
  });

  grunt.registerTask('build', [
    'webpack-dev-server:server',
  ]);

  grunt.registerTask('dist', [
    'webpack:dist',
  ]);
};
