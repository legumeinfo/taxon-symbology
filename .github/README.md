# `@legumeinfo/taxon-symbology`

This repository contains a library for consistently coloring Legume taxa developed for the Legume Information System and other AgBio databases.
The library is built using [chroma.ts](https://github.com/NaridaL/chroma.ts), a TypeScript reimplementation of [chroma-js](https://github.com/gka/chroma.js).

This readme is intended for developers.
For user documentation, see the [NPM readme](https://github.com/legumeinfo/taxon-symbology/blob/main/README.md).

## Setup

Install dependencies:

```bash
npm i
```

## Build

This project uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of the library:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

All built files will be placed in the `lib/` directory.

## Testing

This project uses modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script:

```bash
npm test
```

For local testing during development, the `test:dev:watch` command will run tests in development mode (with verbose errors) on every change to the source files:

```bash
npm test:watch
```

Alternatively the `test:prod` and `test:prod:watch` commands will run tests in production mode.

## Dev Server

This project uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps.
Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers.
It also automatically transpiles JavaScript and adds polyfills to support older browsers.
See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `index.html` that can be viewed at http://localhost:8000/index.html.
Note that this command will serve the code using development mode (with more verbose errors).
To serve the code in production mode, use `npm run serve:prod`.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint).
The rules are mostly the recommended rules from ESLint, but some have been turned to be compatible with Prettier.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting.
Prettier has not been configured to run when committing files so be sure to run it before pushing any changes.

## Bundling and minification

Bundling and minification is performed in a single step using [Rollup](https://rollupjs.org/guide/en/).
The follow commands will bundle and minify whatever code is already in the `lib/` directory and place the bundled code in the file `dist/taxon-symbology.min.js`.

To bundle and minify the code, run:
```bash
npm run bundle
```

To automatically re-bundle when the code in the `lib/` directory changes, run:
```bash
npm run bundle:watch
```
