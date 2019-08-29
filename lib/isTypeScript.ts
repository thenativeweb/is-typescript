import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);

const isTypeScript = async function ({ directory }: {
  directory: string;
}): Promise<boolean> {
  const tsConfigPath = path.join(directory, 'tsconfig.json');

  try {
    await access(tsConfigPath, fs.constants.R_OK);

    await import('typescript');

    return true;
  } catch {
    return false;
  }
};

export default isTypeScript;
