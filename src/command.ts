import { findName } from './helpers';
import { INames } from './types';
import argv from './argv';

/**
 * Strict expectation one of given commands.
 *
 * Example:
 *
 * ```sh
 * cli install
 * ```
 *
 * ```ts
 * expect(
 *     {"install": "i"}, // fullname and shirtname
 *     ["update", "u"],  // also fullname and shirtname
 *     "info"            // only one variant of name
 * )
 * ```
 *
 * @param names array of expected tokens
 * @return fullname
 */
export function expect(...names: INames[]): string {

	if (!argv.length) {
		throw new Error('Unexpected end of arguments.');
	}

	const sourceKey = argv.shift();
	const argument = findName(sourceKey, names);

	if (!argument) {
		throw new Error(`Unexpected argument "${sourceKey}".`);
	}

	const [fullName] = argument;

	return fullName;
}

/**
 * Strict reading of argument.
 *
 * Example:
 *
 * ```sh
 * cli install babel
 * ```
 *
 * ```ts
 * read("install") // returns "install"
 * read("babel")   // returns "babel"
 * ```
 *
 * @return argument
 */
export function read(): string {

	if (!argv.length) {
		throw new Error('Unexpected end of arguments.');
	}

	return argv.shift();
}

/**
 * Strict expectation of end.
 *
 * @returns void
 */
export function end(): void {

	if (argv.length) {
		throw new Error(`Unexpected argument "${argv[0]}".`);
	}
}
