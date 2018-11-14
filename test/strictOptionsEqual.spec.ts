import * as Argue from '../src';

describe('strictOptionsEqual()', () => {

	describe('when option described as string', () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			expect(() => Argue.strictOptionsEqual('output')).toThrow(/Unexpected key "input"/);
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			expect(Argue.strictOptions([], ['output'])).toEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			expect(Argue.strictOptionsEqual('output')).toEqual({});
		});

		it('should return object with values', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			expect(Argue.strictOptionsEqual('output', 'verbose')).toEqual({
				output:  '/var/tmp.txt',
				verbose: true
			});
		});
	});

	describe('when option described as array', () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			expect(() => Argue.strictOptionsEqual(['output', 'o'])).toThrow(/Unexpected key "input"/);
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			expect(Argue.strictOptionsEqual(['output', 'o'])).toEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			expect(Argue.strictOptionsEqual(['output', 'o'])).toEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt');
			expect(Argue.strictOptionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if shirt flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt,/var/log/my');
			expect(Argue.strictOptionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt');
			expect(Argue.strictOptionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt,/var/log/my');
			expect(Argue.strictOptionsEqual(['output', 'o'])).toEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});
	});

	describe('when option described as object', () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			expect(() => Argue.strictOptionsEqual({ 'output': 'o' })).toThrow(/Unexpected key "input"/);
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			expect(Argue.strictOptionsEqual({ 'output': 'o' })).toEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			expect(Argue.strictOptionsEqual({ 'output': 'o' })).toEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			expect(Argue.strictOptionsEqual({ 'output': 'o' }, { 'verbose': 'v' })).toEqual({
				output:  '/var/tmp.txt',
				verbose: true
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt', '-v');
			expect(Argue.strictOptionsEqual({ 'output': 'o' }, { 'verbose': 'v' })).toEqual({
				output:  '/var/tmp.txt',
				verbose: true
			});
		});
	});
});
