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

    /**
     * `eslint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`.
     */
    eslint: {
      options: {
        fix: true,
      },
      src: {
        src: [
          'src/**/*.js',
          'src/**/*.jsx',
        ],
      },
      build: {
        src: ['Gruntfile.js', 'webpack.config.js'],
      },
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
    'eslint',
    'webpack-dev-server:server',
  ]);

  grunt.registerTask('dist', [
    'eslint',
    'clean:dist',
    'webpack:dist',
  ]);

  grunt.registerTask('default', [
    'dist',
  ]);
};
