import * as Argue from '../src';

describe('read()', () => {

	it('should throw error when no more arguments', () => {

		Argue.setArguments();
		expect((() => Argue.read())).toThrow(/Unexpected end of arguments/);
	});

	it('should return current argument', () => {

		Argue.setArguments('argument');
		expect(Argue.read()).toBe('argument');
	});

	it('should move to next arguments', () => {

		Argue.setArguments('argument', 'argument2');
		expect(Argue.read()).toBe('argument');
		expect(Argue.read()).toBe('argument2');
	});
});
