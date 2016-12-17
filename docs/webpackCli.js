// @flow weak

/* eslint-disable no-console */
import minimist from 'minimist';
import webpackRun from './webpackRun';

const argv = minimist(process.argv.slice(2));

webpackRun({
  dev: argv.dev,
});
