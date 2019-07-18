import * as Argue from '../src';

describe('expect()', () => {

	it('should throw error when no more arguments', () => {

		Argue.setArguments();
		expect(() => Argue.expect('install', 'remove')).toThrow(/Unexpected end of arguments/);
	});

	it('should throw error when given command is doesn\'t expected', () => {

		Argue.setArguments('delete', 'mocha');
		expect(() => Argue.expect('install', 'remove')).toThrow(/Unexpected argument 'delete'/);
	});

	describe('when argument alias described as object', () => {

		it('should return full version of command if full given', () => {

			Argue.setArguments('install', 'mocha');
			expect(Argue.expect({ 'install': 'i' }, { 'remove': 'r' })).toBe('install');
		});

		it('should return full version of command if shirt given', () => {

			Argue.setArguments('i', 'mocha');
			expect(Argue.expect({ 'install': 'i' }, { 'remove': 'r' })).toBe('install');
		});
	});

	describe('when argument alias described as array', () => {

		it('should return full version of command if full given', () => {

			Argue.setArguments('install', 'mocha');
			expect(Argue.expect(['install', 'i'], ['remove', 'r'])).toBe('install');
		});

		it('should return full version of command if shirt given', () => {

			Argue.setArguments('i', 'mocha');
			expect(Argue.expect(['install', 'i'], ['remove', 'r'])).toBe('install');
		});
	});

	describe('when argument described as string', () => {

		it('should return command', () => {

			Argue.setArguments('install', 'mocha');
			expect(Argue.expect('install', 'remove')).toBe('install');
		});
	});
});
