# is-typescript

is-typescript checks whether a package is built using TypeScript.

## Status

| Category         | Status                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/is-typescript)](https://www.npmjs.com/package/is-typescript)          |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/is-typescript)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/is-typescript)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/is-typescript/workflows/Release/badge.svg?branch=main) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/is-typescript)                                |

## Installation

```shell
$ npm install is-typescript
```

## Quick start

First you need to integrate is-typescript into your application:

```javascript
const { isTypeScript } = require('is-typescript');
```

If you use TypeScript, use the following code instead:

```typescript
import { isTypeScript } from 'is-typescript';
```

To check whether a package is built using TypeScript, call the `isTypeScript` function and provide the root directory of the package as parameter:

```javascript
console.log(await isTypeScript({ directory: '/...' }));
// => true
```

The package verifies whether the npm package `typescript` is installed, and whether a `tsconfig.json` file exists at the given root directory.

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
