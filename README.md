<!--
SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>

SPDX-License-Identifier: MIT
-->

# \<dd-grid>

[![pipeline](https://gitlab.com/digital-dasein/software/html-presentations/dd-grid/badges/main/pipeline.svg?job=build&key_text=build)](https://gitlab.com/digital-dasein/software/html-presentations/dd-grid/-/pipelines)
[![coverage](https://gitlab.com/digital-dasein/software/html-presentations/dd-grid/badges/main/coverage.svg?job=test)](https://digital-dasein.gitlab.io/software/html-presentations/dd-grid/lcov-report/)
[![REUSE 
status](https://api.reuse.software/badge/gitlab.com/digital-dasein/software/html-presentations/dd-grid)](https://api.reuse.software/info/gitlab.com/digital-dasein/software/html-presentations/dd-grid)


This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
yarn add @digitaldasein/dd-grid
```
or

```bash
npm i @digitaldasein/dd-grid
```

## Usage

As a module:

```html
<script type="module">
  import 'path/to/dd-grid.js';
</script>

<dd-grid>...</dd-grid>
```

For a production-ready build, either integrated into a library or standalone, 
check out the
[libcompono](https://gitlab.com/digital-dasein/software/html-presentations/libcompono) 
library.

## Docs

&rarr; [go to 
docs](https://digital-dasein.gitlab.io/software/html-presentations/dd-grid/docs/classes/DdGrid.html)

## Local Demo with `web-dev-server`

```bash
yarn start
```

To run a local development server that serves the basic demo located in 
`demo/index.html`

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
yarn lint
```

To automatically fix linting and formatting errors, run

```bash
yarn format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
yarn test
```

To run the tests in interactive watch mode run:

```bash
yarn test:watch
```
Test results are available 
[here](https://digital-dasein.gitlab.io/software/html-presentations/dd-grid/lcov-report/).


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to 
individual files.
