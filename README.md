# argue-cli

[![ESM-only package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[npm]: https://img.shields.io/npm/v/argue-cli.svg
[npm-url]: https://www.npmjs.com/package/argue-cli

[node]: https://img.shields.io/node/v/argue-cli.svg
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/librariesio/release/npm/argue-cli
[deps-url]: https://libraries.io/npm/argue-cli/tree

[size]: https://packagephobia.com/badge?p=argue-cli
[size-url]: https://packagephobia.com/result?p=argue-cli

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/Argue/ci.yml?branch=master
[build-url]: https://github.com/TrigenSoftware/Argue/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/Argue.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/Argue

A thin and strongly typed CLI arguments parser for Node.js.

## Usage

1. Install

```bash
# pnpm
pnpm add argue-cli
# yarn
yarn add argue-cli
# npm
npm i argue-cli
```

2. Import in your code and use it!

```ts
import { read, end, expect, alias, option, readOptions } from 'argue-cli'

/**
 * Expect and read one of the commands
 */
const command = expect(
  alias('install', 'i'),
  'remove'
)
let options = {}

if (command === 'install') {
  /**
   * Read passed options
   */
  options = readOptions(
    option(alias('save', 'S'), Boolean),
    option(alias('saveDev', 'save-dev', 'D'), Boolean),
    option('workspace', String)
  )
}

/**
 * Read next argument
 */
const packageName = read()

/**
 * Expect end of the arguments
 */
end()

/* ... */
```

## API

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
<td>

```ts
function read(): string
```

</td>
<td>
  Read next argument. Throws error if no next argument.
</td>
    </tr>
    <tr>
<td>

```ts
function end(): void
```

</td>
<td>
  Expectation of the end. Throws an error if there are more arguments left.
</td>
    </tr>
    <tr>
<td>

```ts
function expect(...argRefs: ArgRef[]): string
```

</td>
<td>
  Expect one of the given arguments.
</td>
    </tr>
    <tr>
<td>

```ts
function alias(name: string, ...aliases: string[]): AliasArgRef
```

</td>
<td>
  Describe argument with aliases.
</td>
    </tr>
    <tr>
<td>

```ts
function option(argRef: ArgRef, type: PrimitiveConstructor): OptionReader
```

</td>
<td>
  Describe option with value.
</td>
    </tr>
    <tr>
<td>

```ts
function readOptions(...optionReaders: OptionReader[]): OptionResult
```

</td>
<td>
  Read options from arguments.
</td>
    </tr>
  </tbody>
</table>

## TypeScript

In [API section](#API) types are described in a simplified way. Detailed example of the types you can see [here](test/argue.test-d.ts).
