'use strict';

const { isTypeScript } = require('is-typescript');

/* eslint-disable no-console, unicorn/prefer-top-level-await */
(async function () {
  console.log(await isTypeScript({ directory: __dirname }));
})();
/* eslint-enable no-console, unicorn/prefer-top-level-await */
