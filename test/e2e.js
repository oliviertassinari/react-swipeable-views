// @flow weak

import httpServer from 'http-server';
import webpackRun from '../docs/webpackRun';
import childProcess from 'child_process';
import selenium from 'selenium-standalone';

const HTTP_PORT = 8080;

function startSelenium() {
  return new Promise((resolve, reject) => {
    // Start selenium
    const opts = {version: '2.45.0'};
    selenium.install(opts, (error) => {
      if (error) {
        reject(error, 'Failed to install selenium');
      } else {
        selenium.start(opts, (error) => {
          if (error) {
            reject(error, 'Failed to start selenium');
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function runWebdriver() {
  const child = childProcess.spawn(
    './node_modules/.bin/webdriver',
    [
      'webdriver.config.js',
    ],
    {
      stdio: [0, 0, 0],
    }
  );

  child.on('close', (exitCode) => {
    console.log('closed!', exitCode);
    process.exit(exitCode);
  });

  child.on('error', (childErr) => {
    console.log(childErr);
    throw childErr;
  });
}

Promise.all([
  startSelenium(),
  webpackRun()
    .then(() => {
      return new Promise((resolve) => {
        httpServer
          .createServer({
            root: '../docs/dist',
          })
          .listen(HTTP_PORT, () => {
            resolve();
          });
      });
])
  .then(() => {
    runWebdriver();
  });
