'use strict';

const assert = require('assertthat');

const isTypeScript = require('../../lib/isTypeScript');

suite('isTypeScript', () => {
  test('throws error if no parameters are given.', async () => {
    await assert.that(() => isTypeScript()).is.throwingAsync();
  });

  test('throws error if directory is missing.', async () => {
    await assert.that(() => isTypeScript({})).is.throwingAsync();
  });
});
