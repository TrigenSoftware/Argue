import * as Argue from '../src';

describe('strictOptions()', () => {

	describe('when flag', () => {

		describe('described as string', () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				expect(() => Argue.strictOptions(['silent'], [])).toThrow(/Unexpected key "verbose"/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.strictOptions(['verbose'], [])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.strictOptions(['verbose'], [])).toEqual({});
			});

			it('should return object with values', () => {

				Argue.setArguments('--verbose');
				expect(Argue.strictOptions(['verbose'], [])).toEqual({
					verbose: true
				});
			});
		});

		describe('described as array', () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				expect(() => Argue.strictOptions([['silent', 's']], [])).toThrow(/Unexpected key "verbose"/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.strictOptions([['verbose', 'v']], [])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.strictOptions([['verbose', 'v']], [])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--verbose');
				expect(Argue.strictOptions([['verbose', 'v']], [])).toEqual({
					verbose: true
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-v');
				expect(Argue.strictOptions([['verbose', 'v']], [])).toEqual({
					verbose: true
				});
			});
		});

		describe('described as object', () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				expect(() => Argue.strictOptions([{ 'silent': 's' }], [])).toThrow(/Unexpected key "verbose"/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.strictOptions([{ 'verbose': 'v' }], [])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.strictOptions([{ 'verbose': 'v' }], [])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--verbose');
				expect(Argue.strictOptions([{ 'verbose': 'v' }], [])).toEqual({
					verbose: true
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-v');
				expect(Argue.strictOptions([{ 'verbose': 'v' }], [])).toEqual({
					verbose: true
				});
			});
		});
	});

	describe('when option', () => {

		describe('described as string', () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				expect(() => Argue.strictOptions([], ['output'])).toThrow(/Unexpected key "input"/);
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				expect(() => Argue.strictOptions([], ['output'])).toThrow(/Unexpected end of arguments/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.strictOptions([], ['output'])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.strictOptions([], ['output'])).toEqual({});
			});

			it('should return object with values', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				expect(Argue.strictOptions([], ['output'])).toEqual({
					output: '/var/tmp.txt'
				});
			});
		});

		describe('described as array', () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				expect(() => Argue.strictOptions([], [['output', 'o']])).toThrow(/Unexpected key "input"/);
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				expect(() => Argue.strictOptions([], [['output', 'o']])).toThrow(/Unexpected end of arguments/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.strictOptions([], [['output', 'o']])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.strictOptions([], [['output', 'o']])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				expect(Argue.strictOptions([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt']
				});
			});

			it('should return object with array values if shirt flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt,/var/log/my');
				expect(Argue.strictOptions([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt');
				expect(Argue.strictOptions([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt']
				});
			});

			it('should return object with array values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt,/var/log/my');
				expect(Argue.strictOptions([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});
		});

		describe('described as object', () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				expect(() => Argue.strictOptions([], [{ 'output': 'o' }])).toThrow(/Unexpected key "input"/);
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				expect(() => Argue.strictOptions([], [{ 'output': 'o' }])).toThrow(/Unexpected end of arguments/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.strictOptions([], [{ 'output': 'o' }])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.strictOptions([], [{ 'output': 'o' }])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				expect(Argue.strictOptions([], [{ 'output': 'o' }])).toEqual({
					output: '/var/tmp.txt'
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt');
				expect(Argue.strictOptions([], [{ 'output': 'o' }])).toEqual({
					output: '/var/tmp.txt'
				});
			});
		});
	});
});
