/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './lib');
const srcPath = path.join(packagePath, './src');

async function typescriptCopy({ from, to }) {
    if (!(await fse.exists(to))) {
        console.warn(`path ${to} does not exists`);
        return [];
    }

    const files = glob.sync('**/*.d.ts', { cwd: from });
    const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
    return Promise.all(cmds);
}

async function run() {
    try {
        // TypeScript
        await typescriptCopy({ from: srcPath, to: buildPath });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
