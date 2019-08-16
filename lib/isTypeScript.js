'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const access = promisify(fs.access);

const isTypeScript = async function ({ directory }) {
  const tsConfigPath = path.join(directory, 'tsconfig.json');

  try {
    await access(tsConfigPath, fs.constants.R_OK);

    /* eslint-disable global-require */
    require('typescript');
    /* eslint-enable global-require */

    return true;
  } catch {
    return false;
  }
};

module.exports = isTypeScript;
