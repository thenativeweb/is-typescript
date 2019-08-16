'use strict';

const path = require('path');

const isolated = require('isolated');
const shell = require('shelljs');

const throwIfCodeIsNonZero = function ({ child }) {
  if (!child) {
    throw new Error('Child is missing.');
  }

  if (child.code !== 0) {
    throw new Error(`Child process exited with error code ${child.code}.`);
  }
};

/**
 * Run the `runIsTypeScript.js` file for a given project path.
 * This copies the target project to a temporary location, installes potentially
 * existing node modules, installs is-typescript, copies the said script and
 * executes it.
 * Returns the child resulting from executing the script.
 * Run tests on the child.
 */
const runIsTypeScriptInProject = async function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const tempDirectory = await isolated();
  const isTypeScriptPackagePath = path.join(__dirname, '..', '..', '..');

  /* eslint-disable global-require */
  const isTypeScriptPackageJson = require(path.join(__dirname, '..', '..', '..', 'package.json'));
  /* eslint-enable global-require */

  const testFilePath = path.join(__dirname, 'runIsTypeScript.js');

  shell.cp('-r', `${directory}/*`, tempDirectory);

  throwIfCodeIsNonZero({
    child: shell.exec(`npm install`, {
      cwd: tempDirectory
    })
  });

  throwIfCodeIsNonZero({
    child: shell.exec(`npm pack ${isTypeScriptPackagePath}`, {
      cwd: tempDirectory
    })
  });

  throwIfCodeIsNonZero({
    child: shell.exec(`npm install is-typescript-${isTypeScriptPackageJson.version}.tgz`, {
      cwd: tempDirectory
    })
  });

  shell.cp(testFilePath, tempDirectory);

  const test = shell.exec(`node runIsTypeScript.js`, {
    cwd: tempDirectory,
    silent: true
  });

  throwIfCodeIsNonZero({ child: test });

  return test;
};

module.exports = runIsTypeScriptInProject;
