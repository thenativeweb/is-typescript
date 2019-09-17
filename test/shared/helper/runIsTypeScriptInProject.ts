import isolated from 'isolated';
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

/**
 * Run the `runIsTypeScript.js` file for a given project path.
 * This copies the target project to a temporary location, installes potentially
 * existing node modules, installs is-typescript, copies the said script and
 * executes it.
 * Returns the child resulting from executing the script.
 * Run tests on the child.
 */
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

export default runIsTypeScriptInProject;
