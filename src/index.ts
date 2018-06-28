
const argvStartIndex = 2,
	shirtArgLength = 2;

export const argv = process.argv.slice(argvStartIndex, process.argv.length);

function findName(name, names) {

	let findedName = false,
		array      = false;

	names.some((fullNameOrigin) => {

		let keys = null,
			fullName = fullNameOrigin,
			shirtName = null;

		if (typeof fullName == 'string') {

			if (fullName == name) {
				findedName = fullName;
				return true;
			}

			return false;
		}

		const proto = Object.getPrototypeOf(fullName); // eslint-disable-line

		if (proto == Object.prototype) {

			keys = fullName;
			fullName = Object.keys(keys)[0];
			shirtName = keys[fullName];

			if (fullName == name || shirtName == name) {
				findedName = fullName;
				return true;
			}

			return false;
		}

		if (proto == Array.prototype) {

			[fullName, shirtName] = fullName;

			if (fullName == name || shirtName == name) {
				array = true;
				findedName = fullName;
				return true;
			}

			return false;
		}

		return false;
	});

	return findedName
		? { name: findedName, isArray: array }
		: false
	;
}

export function setArguments(...newArguments) {
	argv.splice(0, argv.length);
	argv.push(...newArguments);
}

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

	const sourceKey = argv.shift(),
		argument = findName(sourceKey, names);

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

/**
 * Strict reading of flags and options.
 *
 *     command-line-app --output test -p es2015,react --verbose
 *
 *     strictOptions([
 *         ["another"]      - for flags array is same as object notation
 *         "verbose"        - only one variant of name
 *     ], [
 *         {"output": "o"}, - fullname and shirtname
 *         ["plugins", "p"] - fullname and shirtname for array
 *     ])
 *
 * @param  {...Object} flagsNames   array of tokens
 * @param  {...Object} optionsNames array of tokens
 * @return {Object}    fullname-value pairs
 */
export function strictOptions(flagsNames, optionsNames) {

	if (!argv.length) {
		return {};
	}

	const options  = {};

	let argument = argv[0];

	while (
		argv.length
		&& (
			argument.indexOf('--') == 0
			|| argument.indexOf('-') == 0 && argument.length == shirtArgLength
		)
	) {

		const sourceKey = argv.shift().replace(/^(--|-)/, ''),
			flagKey = findName(sourceKey, flagsNames),
			optionKey = findName(sourceKey, optionsNames);

		if (!flagKey && !optionKey) {
			throw new Error(`Unexpected key "${sourceKey}".`);
		}

		if (!flagKey && optionKey && !argv.length) {
			throw new Error(`Unexpected end of arguments.`);
		}

		let value = argv[0];

		if (optionKey && value.indexOf('--') != 0
			&& (value.indexOf('-') != 0 && value.length != shirtArgLength)
		) {

			argv.shift();

			if (optionKey.isArray) {
				value = value.split(',').map(element => element.replace(/^['"]|["']$/g, ''));
			} else {
				value = value.replace(/^['"]|["']$/g, '');
			}

			options[optionKey.name] = value;

		} else
		if (flagKey) {

			options[flaoptionsKey.name] = true;

		} else {
			throw new Error(`Unexpected key "${value}".`);
		}

		argument = argv[0];
	}

	return options;
}

/**
 * Strict reading of options with equal sign.
 * If option is provided without value it will interpreted as `true`.
 *
 *     command-line-app --output=test -p=es2015,react --verbose
 *
 *     strictOptionsEqual(
 *         {"output": "o"},  - fullname and shirtname
 *         ["plugins", "p"], - fullname and shirtname for array
 *         "verbose"         - only one variant of name
 *     )
 *
 * @param  {...Object} names array of tokens
 * @return {Object}    fullname-value pairs
 */
export function strictOptionsEqual(...names) {

	if (!argv.length) {
		return {};
	}

	const options  = {};

	let argument = argv[0];

	while (
		argv.length
		&& (
			argument.indexOf('--') == 0
			|| argument.indexOf('-') == 0
		)
	) {

		let [sourceKey, value] = argv.shift().replace(/^(--|-)/, '').split('=');

		const key = findName(sourceKey, names);

		if (!key) {
			throw new Error(`Unexpected key "${sourceKey}".`);
		}

		if (typeof value == 'undefined') {
			value = true;
		} else
		if (key.isArray) {
			value = value.split(',').map(element => element.replace(/^['"]|["']$/g, ''));
		} else {
			value = value.replace(/^['"]|["']$/g, '');
		}

		options[key.name] = value;

		argument = argv[0];
	}

	return options;
}

/**
 * Unlimited reading of flags and options.
 *
 *     command-line-app --output test install -p es2015,react babel --verbose
 *
 *     options([
 *         ["another"]      - for flags array is same as object notation
 *         "verbose"        - only one variant of name
 *     ], [
 *         {"output": "o"}, - fullname and shirtname
 *         ["plugins", "p"] - fullname and shirtname for array
 *     ])
 *
 * @param  {...Object} flagsNames   array of tokens
 * @param  {...Object} optionsNames array of tokens
 * @return {Object}    fullname-value pairs
 */
export function options(flagsNames, optionsNames) {

	if (!argv.length) {
		return {};
	}

	const options = {},
		argvc = argv.slice(),
		argc = argvc.length,
		remove = [];

	for (let i = 0, argument = argvc[i]; i < argc; argument = argvc[++i]) {

		if (argument.indexOf('--') != 0
			&& (argument.indexOf('-') != 0 || argument.length != shirtArgLength)
		) {
			continue;
		}

		const sourceKey = argument.replace(/^(--|-)/, ''),
			flagKey = findName(sourceKey, flagsNames),
			optionKey = findName(sourceKey, optionsNames);

		if (!flagKey && !optionKey) {
			throw new Error(`Unexpected key "${sourceKey}".`);
		}

		if (!flagKey && optionKey && i == argc - 1) {
			throw new Error(`Unexpected end of arguments.`);
		}

		let value = argvc[i + 1];

		if (optionKey && value.indexOf('--') != 0
			&& (value.indexOf('-') != 0 && value.length != shirtArgLength)
		) {

			remove.unshift(i++);

			if (optionKey.isArray) {
				value = value.split(',').map(element => element.replace(/^['"]|["']$/g, ''));
			} else {
				value = value.replace(/^['"]|["']$/g, '');
			}

			options[optionKey.name] = value;

		} else
		if (flagKey) {

			options[flagKey.name] = true;

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
 *     command-line-app --output=test install -p=es2015,react babel --verbose
 *
 *     optionsEqual(
 *         {"output": "o"},  - fullname and shirtname
 *         ["plugins", "p"], - fullname and shirtname for array
 *         "verbose"         - only one variant of name
 *     )
 *
 * @param  {...Object} names array of tokens
 * @return {Object}    fullname-value pairs
 */
export function optionsEqual(...names) {

	if (!argv.length) {
		return {};
	}

	const options = {},
		argvc = argv.slice(),
		argc = argvc.length,
		remove = [];

	for (let i = 0, argument = argvc[i]; i < argc; argument = argvc[++i]) {

		if (argument.indexOf('-') != 0) {
			continue;
		}

		let [sourceKey, value] = argument.replace(/^(--|-)/, '').split('=');

		const key = findName(sourceKey, names);

		remove.unshift(i);

		if (!key) {
			throw new Error(`Unexpected key "${sourceKey}".`);
		}

		if (typeof value == 'undefined') {
			value = true;
		} else
		if (key.isArray) {
			value = value.split(',').map(element => element.replace(/^['"]|["']$/g, ''));
		} else {
			value = value.replace(/^['"]|["']$/g, '');
		}

		options[key.name] = value;
	}

	remove.forEach(index => argv.splice(index, 1));

	return options;
}
