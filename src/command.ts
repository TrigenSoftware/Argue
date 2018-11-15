import { findName } from './helpers';
import argv from './argv';

/**
 * Strict expectation one of given commands.
 *
 *     command-line-app install
 *
 *     expect(
 *         {"install": "i"}, - fullname and shirtname
 *         ["update", "u"],  - also fullname and shirtname
 *         "info"            - only one variant of name
 *     )
 *
 * @param  {...Object} names    array of expected tokens
 * @return {String}    fullname
 */
export function expect(...names) {

	if (!argv.length) {
		throw new Error('Unexpected end of arguments.');
	}

	const sourceKey = argv.shift();
	const argument = findName(sourceKey, names);

	if (!argument) {
		throw new Error(`Unexpected argument "${sourceKey}".`);
	}

	return argument.name;
}

/**
 * Strict reading of argument.
 *
 *     command-line-app some-value
 *
 * @return {String} argument
 */
export function read() {

	if (!argv.length) {
		throw new Error('Unexpected end of arguments.');
	}

	return argv.shift();
}

/**
 * Strict expectation of end.
 * @returns {void}
 */
export function end() {

	if (argv.length) {
		throw new Error(`Unexpected argument "${argv[0]}".`);
	}
}
