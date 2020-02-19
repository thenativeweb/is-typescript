import { assert } from 'assertthat';
import path from 'path';
import { runIsTypeScriptInProject } from '../shared/helper/runIsTypeScriptInProject';

suite('isTypeScript', (): void => {
  test('returns true for a project with a tsconfig.json.', async function (): Promise<void> {
    this.timeout(30 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withTsConfig') });

    assert.that(stdout.trim()).is.equalTo('true');
  });

  test('returns false for a project without a tsconfig.json.', async function (): Promise<void> {
    this.timeout(30 * 1000);

    const { stdout } = await runIsTypeScriptInProject({ directory: path.join(__dirname, '..', 'shared', 'projects', 'withoutTsConfig') });

    assert.that(stdout.trim()).is.equalTo('false');
  });
});
