
export function findName(name, names) {

	let findedName = '';
	let array = false;

	names.some((fullNameOrigin) => {

		let keys = null;
		let fullName = fullNameOrigin;
		let shirtName = null;

		if (typeof fullName === 'string') {

			if (fullName === name) {
				findedName = fullName;
				return true;
			}

			return false;
		}

		const proto = Object.getPrototypeOf(fullName); // eslint-disable-line

		if (proto === Object.prototype) {

			keys = fullName;
			fullName = Object.keys(keys)[0];
			shirtName = keys[fullName];

			if (fullName === name || shirtName === name) {
				findedName = fullName;
				return true;
			}

			return false;
		}

		if (proto === Array.prototype) {

			[fullName, shirtName] = fullName;

			if (fullName === name || shirtName === name) {
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
