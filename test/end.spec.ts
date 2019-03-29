import * as Argue from '../src';

describe('end()', () => {

	it('should throw error when arguments still exists', () => {

		Argue.setArguments('install');
		expect(() => Argue.end()).toThrow(/Unexpected argument "install"/);
	});

	it('should stand still when no more arguments', () => {

		Argue.setArguments();
		Argue.end();
	});
});
