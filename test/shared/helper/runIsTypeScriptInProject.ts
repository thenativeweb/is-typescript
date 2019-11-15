import { isolated } from 'isolated';
import path from 'path';
import shell, { ShellString } from 'shelljs';

const throwIfCodeIsNonZero = function ({ child }: {
  child: ShellString;
}): void {
  if (!child) {
    throw new Error('Child is missing.');
  }

  if (child.code !== 0) {
    throw new Error(`Child process exited with error code ${child.code}.`);
  }
};

// We want to run runIsTypeScript.js for a project in the given directory. For
// that, first copy the project to a temporary location, install Node.js modules
// if needed, install is-typescript, copy the runIsTypeScript.js file, and
// finally execute it.
const runIsTypeScriptInProject = async function ({ directory }: {
  directory: string;
}): Promise<ShellString> {
  const tempDirectory = await isolated();
  const isTypeScriptPackagePath = path.join(__dirname, '..', '..', '..');

  const isTypeScriptPackageJson = await import(path.join(__dirname, '..', '..', '..', 'package.json'));

  const testFilePath = path.join(__dirname, 'runIsTypeScript.js');

  shell.cp('-r', `${directory}/*`, tempDirectory);

  throwIfCodeIsNonZero({
    child: shell.exec(`npm install`, {
      cwd: tempDirectory
    })
  });

  throwIfCodeIsNonZero({
    child: shell.exec(`npx roboter build`, {
      cwd: isTypeScriptPackagePath
    })
  });

  throwIfCodeIsNonZero({
    child: shell.exec(`npm pack ${isTypeScriptPackagePath}`, {
      cwd: tempDirectory
    })
  });

  throwIfCodeIsNonZero({
    child: shell.exec(`npm install is-typescript-${isTypeScriptPackageJson.version}.tgz`, {
      cwd: tempDirectory
    })
  });

  shell.cp(testFilePath, tempDirectory);

  const test = shell.exec(`node runIsTypeScript.js`, {
    cwd: tempDirectory,
    silent: true
  });

  throwIfCodeIsNonZero({ child: test });

  return test;
};

export { runIsTypeScriptInProject };
