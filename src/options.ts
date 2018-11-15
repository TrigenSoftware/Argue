import { findName } from './helpers';
import { SHIRT_ARG_LENGTH } from './constants';
import argv from './argv';

/**
 * Unlimited reading of flags and options.
 *
 * Example:
 *
 * ```
 * // command-line-app --output test install -p es2015,react babel --verbose
 * options([
 *     ["another"] // for flags array is same as object notation
 *     "verbose" // only one variant of name
 * ], [
 *     {"output": "o"}, // fullname and shirtname
 *     ["plugins", "p"] // fullname and shirtname for array
 * ])
 * ```
 *
 * @param  {...Object} flagsNames - array of tokens
 * @param  {...Object} optionsNames - array of tokens
 * @return {Object} - fullname-value pairs
 */
export function options(flagsNames, optionsNames) {

	if (!argv.length) {
		return {};
	}

	const options = {};
	const argvc = argv.slice();
	const argc = argvc.length;
	const remove = [];

	let i = 0;
	for (let argument = argvc[i]; i < argc; argument = argvc[++i]) {

		if (argument.indexOf('--') !== 0
			&& (argument.indexOf('-') !== 0 || argument.length !== SHIRT_ARG_LENGTH)
		) {
			continue;
		}

		const sourceKey = argument.replace(/^(--|-)/, '');
		const flagKey = findName(sourceKey, flagsNames);
		const optionKey = findName(sourceKey, optionsNames);

		if (!flagKey && !optionKey) {
			throw new Error(`Unexpected key "${sourceKey}".`);
		}

		if (!flagKey && optionKey && i === argc - 1) {
			throw new Error('Unexpected end of arguments.');
		}

		let value: string|string[] = argvc[i + 1];

		if (optionKey && value.indexOf('--') !== 0
			&& (value.indexOf('-') !== 0 && value.length !== SHIRT_ARG_LENGTH)
		) {

			const [
				optionFullName,
				optionIsArray
			] = optionKey;

			remove.unshift(i++);

			if (optionIsArray) {
				value = value.split(',').map(element => element.replace(/^['"]|["']$/g, ''));
			} else {
				value = value.replace(/^['"]|["']$/g, '');
			}

			options[optionFullName] = value;

		} else
		if (flagKey) {

			const [flagFullName] = flagKey;

			options[flagFullName] = true;

		} else {
			throw new Error(`Unexpected key "${value}".`);
		}

		remove.unshift(i);
	}

	remove.forEach(index => argv.splice(index, 1));

	return options;
}

/**
 * Unlimited reading of with equal sign.
 * If option is provided without value it will interpreted as `true`.
 *
 * Example:
 *
 * ```
 * // command-line-app --output=test install -p=es2015,react babel --verbose
 *
 * optionsEqual(
 *     {"output": "o"}, // fullname and shirtname
 *     ["plugins", "p"], // fullname and shirtname for array
 *     "verbose" // only one variant of name
 * )
 * ```
 *
 * @param  {...Object} names - array of tokens
 * @return {Object} - fullname-value pairs
 */
export function optionsEqual(...names) {

	if (!argv.length) {
		return {};
	}

	const options = {};
	const argvc = argv.slice();
	const argc = argvc.length;
	const remove = [];

	let i = 0;
	for (let argument = argvc[i]; i < argc; argument = argvc[++i]) {

		if (argument.indexOf('-') !== 0) {
			continue;
		}

		const keyValue = argument.replace(/^(--|-)/, '').split('=');
		const sourceKey: string = keyValue[0];
		let value: string|string[]|boolean = keyValue[1];

		const key = findName(sourceKey, names);

		remove.unshift(i);

		if (!key) {
			throw new Error(`Unexpected key "${sourceKey}".`);
		}

		const [
			fullName,
			isArray
		] = key;

		if (typeof value === 'undefined') {
			value = true;
		} else
		if (isArray) {
			value = value.split(',').map(element => element.replace(/^['"]|["']$/g, ''));
		} else {
			value = value.replace(/^['"]|["']$/g, '');
		}

		options[fullName] = value;
	}

	remove.forEach(index => argv.splice(index, 1));

	return options;
}
