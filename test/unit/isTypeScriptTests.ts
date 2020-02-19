import { assert } from 'assertthat';
import { isTypeScript } from '../../lib/isTypeScript';
import path from 'path';

suite('isTypeScript', (): void => {
  test('is built with TypeScript.', async (): Promise<void> => {
    assert.that(await isTypeScript({ directory: path.join(__dirname, '..', '..') })).is.true();
  });
});
