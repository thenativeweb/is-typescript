'use strict';

const path = require('path');

const assert = require('assertthat');

const isTypeScript = require('../../lib/isTypeScript');

suite('isTypeScript', () => {
  test('throws error if directory is missing.', async () => {
    assert.that(() => isTypeScript({})).is.throwing('Directory is missing.');
  });

  test('is not built with typescript.', async () => {
    assert.that(isTypeScript({ directory: path.join(__dirname, '..', '..') })).is.false();
  });
});
