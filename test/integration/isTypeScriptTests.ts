import assert from 'assertthat';
import path from 'path';
import runIsTypeScriptInProject from '../shared/helper/runIsTypeScriptInProject';

suite('isTypeScript', (): void => {
  test('returns true for a project with TypeScript installed and a tsconfig.json.', async function (): Promise<void> {
    this.timeout(30 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsAndTsConfig') });

    assert.that(stdout.trim()).is.equalTo('true');
  });

  test('returns false for a project with a tsconfig.json, but no TypeScript.', async function (): Promise<void> {
    this.timeout(30 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsConfigWithoutTs') });

    assert.that(stdout.trim()).is.equalTo('false');
  });

  test('returns false for a project with TypeScript, but without a tsconfig.json.', async function (): Promise<void> {
    this.timeout(30 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsWithoutTsConfig') });

    assert.that(stdout.trim()).is.equalTo('false');
  });

  test('returns true for a project with TypeScript and a tsconfig.json.', async function (): Promise<void> {
    this.timeout(30 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withoutTsAndTsConfig') });

    assert.that(stdout.trim()).is.equalTo('false');
  });
});
