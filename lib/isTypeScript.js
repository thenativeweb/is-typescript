'use strict';

const fs = require('fs'),
      path = require('path');

const isTypeScript = function ({ directory }) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  const tsConfigPath = path.join(directory, 'tsconfig.json');

  try {
    /* eslint-disable no-sync */
    fs.accessSync(tsConfigPath, fs.constants.R_OK);
    /* eslint-enable no-sync */

    /* eslint-disable global-require */
    require('typescript');
    /* eslint-enable global-require */

    return true;
  } catch {
    return false;
  }
};

module.exports = isTypeScript;
