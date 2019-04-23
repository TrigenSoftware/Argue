# argue-cli

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Coverage status][coverage]][coverage-url]
[![Build status][build]][build-url]

[npm]: https://img.shields.io/npm/v/argue-cli.svg
[npm-url]: https://www.npmjs.com/package/argue-cli

[node]: https://img.shields.io/node/v/argue-cli.svg
[node-url]: https://nodejs.org

[coverage]: https://img.shields.io/coveralls/TrigenSoftware/Argue.svg
[coverage-url]: https://coveralls.io/r/TrigenSoftware/Argue

[build]: https://img.shields.io/travis/com/TrigenSoftware/Argue.svg
[build-url]: https://travis-ci.com/TrigenSoftware/Argue

Node.js CLI arguments parser.

# Install

Install using npm:
```sh
npm i argue-cli
```

Install using yarn:
```sh
yarn add argue-cli
```

# API

## expect(...names)
Strict expectation one of given commands.
Returns full variant of expected argument.
```js
expect(
    {"install": "i"}, // full name and shirt name, e.g. `npm install`, `npm i` 
    ["update", "u"],  // also full name and shirt name, e.g. `npm update`, `npm u`   
    "info"            // only one variant of name
);
```

## read()
Strict reading of argument.
Returns argument.
```js
read(); // e.g. for `npm babel` returns "babel"
```

## end()
Strict expectation of end.
```js
end(); // e.g. for `npm babel` throws Error.
```

## strictOptions(flagsNames, optionsNames)
Strict reading of flags and options.
Returns fullname-value pairs object.
```js
strictOptions([
    ["another"],     // for flags array is same as object notation
    "verbose"        // only one variant of name, e.g. `babel --verbose`
], [
    {"output": "o"}, // full name and shirt name, e.g. `babel --output ./main.js`, `babel -o ./main.js` 
    ["plugins", "p"] // fullname and shirtname for array, e.g. `babel --plugins commonjs,decorators`, `babel -p commonjs,decorators` 
])
```

## strictOptionsEqual(...names)
Strict reading of options with equal sign. 
If option is provided without value it will interpreted as `true`.
Returns fullname-value pairs object.
```js
strictOptionsEqual(
    {"output": "o"},  // full name and shirt name, e.g. `babel --output=./main.js`, `babel -o=./main.js` 
    ["plugins", "p"], // fullname and shirtname for array, e.g. `babel --plugins=commonjs,decorators`, `babel -p=commonjs,decorators` 
    "verbose"         // only one variant of name, e.g. `babel --verbose`
)
```

## options(flagsNames, optionsNames)
Unlimited reading of flags and options.
Returns fullname-value pairs object.
```js
options([
    ["another"],     // for flags array is same as object notation
    "verbose"        // only one variant of name, e.g. `babel compile script.js --verbose`
], [
    {"output": "o"}, // full name and shirt name, e.g. `babel compile script.js --output ./main.js`, `babel compile script.js -o ./main.js` 
    ["plugins", "p"] // fullname and shirtname for array, e.g. `babel --plugins commonjs,decorators compile script.js`, `babel -p commonjs,decorators compile script.js` 
])
```

## optionsEqual(...names)
Unlimited reading of options with equal sign. 
If option is provided without value it will interpreted as `true`.
Returns fullname-value pairs object.
```js
optionsEqual(
    {"output": "o"},  // full name and shirt name, e.g. `babel compile script.js --output=./main.js`, `babel compile script.js -o=./main.js` 
    ["plugins", "p"], // fullname and shirtname for array, e.g. `babel --plugins=commonjs,decorators compile script.js`, `babel -p=commonjs,decorators compile script.js` 
    "verbose"         // only one variant of name, e.g. `babel compile script.js --verbose`
)
```

---
[![NPM](https://nodei.co/npm/argue-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/argue-cli/)
