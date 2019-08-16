'use strict';

const isTypeScript = require('is-typescript');

/* eslint-disable no-console */
isTypeScript({ directory: __dirname }).then(console.log);
/* eslint-enable no-console */
