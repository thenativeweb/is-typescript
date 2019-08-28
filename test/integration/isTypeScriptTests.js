'use strict';

const path = require('path');

const assert = require('assertthat').default;

const runIsTypeScriptInProject = require('../shared/helper/runIsTypeScriptInProject');

suite('isTypeScript', () => {
  test('returns true for a project with typescript installed and a tsconfig.json.', async function () {
    this.timeout(20 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsAndTsConfig') });

    assert.that(stdout.trim()).is.equalTo('true');
  });

  test('returns false for a project with a tsconfig.json but no typescript.', async function () {
    this.timeout(20 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsConfigWithoutTs') });

    assert.that(stdout.trim()).is.equalTo('false');
  });

  test('returns false for a project with typescript but without a tsconfig.json.', async function () {
    this.timeout(20 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsWithoutTsConfig') });

    assert.that(stdout.trim()).is.equalTo('false');
  });

  test('returns true for a project with typescript and a tsconfig.json.', async function () {
    this.timeout(20 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withoutTsAndTsConfig') });

    assert.that(stdout.trim()).is.equalTo('false');
  });
});
