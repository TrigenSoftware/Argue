# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.1.0](https://github.com/TrigenSoftware/Argue/compare/v3.0.0...v3.1.0) (2026-07-09)

### Features

* add `autocase` to match both camelCase and kebab-case forms ([bf35f39](https://github.com/TrigenSoftware/Argue/commit/bf35f3925d81720e49626a0afbadef8837a8c616))
* add `flag` to describe boolean options with `--no-*` negation support ([23539a2](https://github.com/TrigenSoftware/Argue/commit/23539a2d6b8694122b95fa7dc2476a2f8b0858e7))
* add `rest` function to read all remaining arguments ([fa8d414](https://github.com/TrigenSoftware/Argue/commit/fa8d41449884fc6bb8067d141fa96253bfa17a94))
* support inline option values with `=` ([f25bcd5](https://github.com/TrigenSoftware/Argue/commit/f25bcd5dbb494b16c609cc776fe1645c67539ef2))
* support Node.js 22 ([dc18dd3](https://github.com/TrigenSoftware/Argue/commit/dc18dd3b50d30b6bff75a79d3fbf1d4083443753))

## [3.0.0](https://github.com/TrigenSoftware/Argue/compare/v2.1.0...v3.0.0) (2026-07-09)

### ⚠ BREAKING CHANGES

* CommonJS bundle is not published anymore.
* Node.js 24 or higher is required.

### Features

* publish esm-only package ([61538e6](https://github.com/TrigenSoftware/Argue/commit/61538e6e71a38e1625d0f0d13d93685c16ae695a))
* require Node.js 24 ([5480810](https://github.com/TrigenSoftware/Argue/commit/54808102eec778685ff7d012c1e07fd0bb8bc710))

## [2.1.0](https://github.com/TrigenSoftware/Argue/compare/v2.0.0...v2.1.0) (2022-10-14)


### Features

* node next module resolution for ts ([#320](https://github.com/TrigenSoftware/Argue/issues/320)) ([ee15b2d](https://github.com/TrigenSoftware/Argue/commit/ee15b2dbde3ed1632c66dd56e0051c4e5435e381))

## [2.0.0](https://github.com/TrigenSoftware/Argue/compare/v2.0.0-2...v2.0.0) (2022-01-18)

## [2.0.0-2](https://github.com/TrigenSoftware/Argue/compare/v2.0.0-1...v2.0.0-2) (2022-01-17)


### Bug Fixes

* readOptions should remove args from internal state ([#301](https://github.com/TrigenSoftware/Argue/issues/301)) ([97cbd42](https://github.com/TrigenSoftware/Argue/commit/97cbd42dfebbc5debc1a9ed34ef1a544d198a2a2))

## [2.0.0-1](https://github.com/TrigenSoftware/Argue/compare/v2.0.0-0...v2.0.0-1) (2022-01-17)

## [2.0.0-0](https://github.com/TrigenSoftware/Argue/compare/v1.2.0...v2.0.0-0) (2022-01-17)


### ⚠ BREAKING CHANGES

* rewritten in TypeScript, new API

### Features

* rewritten in TypeScript, new API ([#296](https://github.com/TrigenSoftware/Argue/issues/296)) ([e484fe4](https://github.com/TrigenSoftware/Argue/commit/e484fe48ca82249de97689a94f4e78cdcf465aff))

## [1.2.0] - 2017-12-26
### Changed
- `babel-cli` -> `Rollup`
