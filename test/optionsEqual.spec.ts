import * as Argue from '../src';

describe('optionsEqual()', () => {

	describe('when option described as string', () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			expect(() => Argue.optionsEqual('output')).toThrow(/Unexpected key "input"/);
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			expect(Argue.strictOptions([], ['output'])).toEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			expect(Argue.optionsEqual('output')).toEqual({});
		});

		it('should return object with values', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			expect(Argue.optionsEqual('output', 'verbose')).toEqual({
				output:  '/var/tmp.txt',
				verbose: true
			});
		});

		it('should read all flags and return object with values', () => {

			Argue.setArguments('lift', '--verbose');
			expect(Argue.optionsEqual('verbose')).toEqual({
				verbose: true
			});
		});
	});

	describe('when option described as array', () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			expect(() => Argue.optionsEqual(['output', 'o'])).toThrow(/Unexpected key "input"/);
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			expect(Argue.optionsEqual(['output', 'o'])).toEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			expect(Argue.optionsEqual(['output', 'o'])).toEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt');
			expect(Argue.optionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt,/var/log/my');
			expect(Argue.optionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});

		it('should read all flags and return object with values if full flag is given', () => {

			Argue.setArguments('lift', '--verbose');
			expect(Argue.optionsEqual(['verbose', 'v'])).toEqual({
				verbose: true
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt');
			expect(Argue.optionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt,/var/log/my');
			expect(Argue.optionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});

		it('should read all flags and return object with values if shirt flag is given', () => {

			Argue.setArguments('lift', '-v');
			expect(Argue.optionsEqual(['verbose', 'v'])).toEqual({
				verbose: true
			});
		});
	});

	describe('when option described as object', () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			expect(() => Argue.optionsEqual({ 'output': 'o' })).toThrow(/Unexpected key "input"/);
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			expect(Argue.optionsEqual({ 'output': 'o' })).toEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			expect(Argue.optionsEqual({ 'output': 'o' })).toEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			expect(Argue.optionsEqual({ 'output': 'o' }, { 'verbose': 'v' })).toEqual({
				output:  '/var/tmp.txt',
				verbose: true
			});
		});

		it('should read all flags and return object with values if full flag is given', () => {

			Argue.setArguments('lift', '--verbose');
			expect(Argue.optionsEqual({ 'verbose': 'v' })).toEqual({
				verbose: true
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt', '-v');
			expect(Argue.optionsEqual({ 'output': 'o' }, { 'verbose': 'v' })).toEqual({
				output:  '/var/tmp.txt',
				verbose: true
			});
		});

		it('should read all flags and return object with values if shirt flag is given', () => {

			Argue.setArguments('lift', '-v');
			expect(Argue.optionsEqual({ 'verbose': 'v' })).toEqual({
				verbose: true
			});
		});
	});
});
