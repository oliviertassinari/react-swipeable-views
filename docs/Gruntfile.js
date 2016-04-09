'use strict';

const webpackConfig = require('./webpack.config.js');

// Tasks runner
module.exports = function(grunt) {
  require('time-grunt')(grunt); // Display the elapsed execution time of grunt tasks
  require('jit-grunt')(grunt, { // Just In Time plugin loader for grunt
    'webpack-dev-server': 'grunt-webpack',
  });

  grunt.initConfig({
    /**
     * The directories to delete.
     */
    clean: {
      dist: [
        'dist',
      ],
    },

    connect: {
      server: {
        options: {
          base: 'dist',
          port: 8001,
          open: true,
          hostname: '*',
          keepalive: true,
        },
      },
    },

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
    'clean:dist',
    'webpack:dist',
  ]);

  grunt.registerTask('default', [
    'dist',
  ]);
};
