import { INames } from './types';

/**
 *
 * @param name
 * @param names
 */
export function findName(name: string, names: INames[]): [string, boolean] {

	let foundName = '';
	let isArray = false;

	names.some((nameRule) => {

		if (typeof nameRule === 'string') {

			if (nameRule === name) {
				foundName = nameRule;
				return true;
			}

			return false;
		}

		if (Array.isArray(nameRule)) {

			const [
				fullName,
				shortName
			] = nameRule;

			if (fullName === name || shortName === name) {
				isArray = true;
				foundName = fullName;
				return true;
			}

			return false;
		}

		if (nameRule && typeof nameRule === 'object') {

			const [[
				fullName,
				shortName
			]] = Object.entries(nameRule);

			if (fullName === name || shortName === name) {
				foundName = fullName;
				return true;
			}

			return false;
		}

		return false;
	});

	return foundName
		? [foundName, isArray]
		: null;
}
