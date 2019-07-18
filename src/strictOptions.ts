import { findName } from './helpers';
import { INames } from './types';
import { SHIRT_ARG_LENGTH } from './constants';
import argv from './argv';

/**
 * Strict reading of flags and options.
 *
 * Example:
 *
 * ```sh
 * cli --output test -p es2015,react --verbose
 * ```
 *
 * ```ts
 * strictOptions([
 *     ['another']      // for flags array is same as object notation
 *     'verbose'        // only one variant of name
 * ], [
 *     {'output': 'o'}, // fullname and shirtname
 *     ['plugins', 'p'] // fullname and shirtname for array
 * ])
 * ```
 *
 * @param flagsNames array of tokens
 * @param optionsNames array of tokens
 * @return fullname-value pairs
 */
export function strictOptions(flagsNames: INames[], optionsNames: INames[]): object {

	if (!argv.length) {
		return {};
	}

	const options = {};

	let argument = argv[0];

	while (
		argv.length
		&& (
			argument.indexOf('--') === 0
			|| argument.indexOf('-') === 0 && argument.length === SHIRT_ARG_LENGTH
		)
	) {

		const sourceKey = argv.shift().replace(/^(--|-)/, '');
		const flagKey = findName(sourceKey, flagsNames);
		const optionKey = findName(sourceKey, optionsNames);

		if (!flagKey && !optionKey) {
			throw new Error(`Unexpected key '${sourceKey}'.`);
		}

		if (!flagKey && optionKey && !argv.length) {
			throw new Error('Unexpected end of arguments.');
		}

		let value: string|string[] = argv[0];

		if (optionKey && value.indexOf('--') !== 0
			&& (value.indexOf('-') !== 0 && value.length !== SHIRT_ARG_LENGTH)
		) {

			const [
				optionFullName,
				optionIsArray
			] = optionKey;

			argv.shift();

			if (optionIsArray) {
				value = value.split(',').map(element => element.replace(/^['']|['']$/g, ''));
			} else {
				value = value.replace(/^['']|['']$/g, '');
			}

			options[optionFullName] = value;

		} else
		if (flagKey) {

			const [flagFullName] = flagKey;

			options[flagFullName] = true;

		} else {
			throw new Error(`Unexpected key '${value}'.`);
		}

		argument = argv[0];
	}

	return options;
}

/**
 * Strict reading of options with equal sign.
 * If option is provided without value it will interpreted as `true`.
 *
 * Example:
 *
 * ```sh
 * cli --output=test -p=es2015,react --verbose
 * ```
 *
 * ```ts
 * strictOptionsEqual(
 *     {'output': 'o'},  // fullname and shirtname
 *     ['plugins', 'p'], // fullname and shirtname for array
 *     'verbose'         // only one variant of name
 * )
 * ```
 *
 * @param names array of tokens
 * @return fullname-value pairs
 */
export function strictOptionsEqual(...names: INames[]): object {

	if (!argv.length) {
		return {};
	}

	const options = {};

	let argument = argv[0];

	while (
		argv.length
		&& (
			argument.indexOf('--') === 0
			|| argument.indexOf('-') === 0
		)
	) {

		const keyValue = argv.shift().replace(/^(--|-)/, '').split('=');
		const sourceKey: string = keyValue[0];
		let value: string|string[]|boolean = keyValue[1];

		const key = findName(sourceKey, names);

		if (!key) {
			throw new Error(`Unexpected key '${sourceKey}'.`);
		}

		const [
			fullName,
			isArray
		] = key;

		if (typeof value === 'undefined') {
			value = true;
		} else
		if (isArray) {
			value = value.split(',').map(element => element.replace(/^['']|['']$/g, ''));
		} else {
			value = value.replace(/^['']|['']$/g, '');
		}

		options[fullName] = value;

		argument = argv[0];
	}

	return options;
}
