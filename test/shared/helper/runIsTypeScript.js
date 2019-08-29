'use strict';

const isTypeScript = require('is-typescript').default;

/* eslint-disable no-console */
isTypeScript({ directory: __dirname }).then(console.log);
/* eslint-enable no-console */
