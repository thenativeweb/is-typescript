import assert from 'assertthat';
import isTypeScript from '../../lib/isTypeScript';
import path from 'path';

suite('isTypeScript', (): void => {
  test('is built with typescript.', async (): Promise<void> => {
    assert.that(await isTypeScript({ directory: path.join(__dirname, '..', '..') })).is.true();
  });
});
