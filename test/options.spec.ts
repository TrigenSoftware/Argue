import * as Argue from '../src';

describe('options()', () => {

	describe('when flag', () => {

		describe('described as string', () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				expect(() => Argue.options(['silent'], [])).toThrow(/Unexpected key "verbose"/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.options(['verbose'], [])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.options(['verbose'], [])).toEqual({});
			});

			it('should return object with values', () => {

				Argue.setArguments('--verbose');
				expect(Argue.options(['verbose'], [])).toEqual({
					verbose: true
				});
			});

			it('should read all flags and return object with values', () => {

				Argue.setArguments('lift', '--verbose');
				expect(Argue.options(['verbose'], [])).toEqual({
					verbose: true
				});
			});
		});

		describe('described as array', () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				expect(() => Argue.options([['silent', 's']], [])).toThrow(/Unexpected key "verbose"/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.options([['verbose', 'v']], [])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.options([['verbose', 'v']], [])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--verbose');
				expect(Argue.options([['verbose', 'v']], [])).toEqual({
					verbose: true
				});
			});

			it('should read all flags and return object with values if full flag is given', () => {

				Argue.setArguments('lift', '--verbose');
				expect(Argue.options([['verbose', 'v']], [])).toEqual({
					verbose: true
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-v');
				expect(Argue.options([['verbose', 'v']], [])).toEqual({
					verbose: true
				});
			});

			it('should read all flags and return object with values if shirt flag is given', () => {

				Argue.setArguments('lift', '-v');
				expect(Argue.options([['verbose', 'v']], [])).toEqual({
					verbose: true
				});
			});
		});

		describe('described as object', () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				expect(() => Argue.options([{ 'silent': 's' }], [])).toThrow(/Unexpected key "verbose"/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.options([{ 'verbose': 'v' }], [])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.options([{ 'verbose': 'v' }], [])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--verbose');
				expect(Argue.options([{ 'verbose': 'v' }], [])).toEqual({
					verbose: true
				});
			});

			it('should read all flags and return object with values if full flag is given', () => {

				Argue.setArguments('lift', '--verbose');
				expect(Argue.options([{ 'verbose': 'v' }], [])).toEqual({
					verbose: true
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-v');
				expect(Argue.options([{ 'verbose': 'v' }], [])).toEqual({
					verbose: true
				});
			});

			it('should read all flags and return object with values if shirt flag is given', () => {

				Argue.setArguments('lift', '-v');
				expect(Argue.options([{ 'verbose': 'v' }], [])).toEqual({
					verbose: true
				});
			});
		});
	});

	describe('when option', () => {

		describe('described as string', () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				expect(() => Argue.options([], ['output'])).toThrow(/Unexpected key "input"/);
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				expect(() => Argue.options([], ['output'])).toThrow(/Unexpected end of arguments/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.options([], ['output'])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.options([], ['output'])).toEqual({});
			});

			it('should return object with values', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				expect(Argue.options([], ['output'])).toEqual({
					output: '/var/tmp.txt'
				});
			});

			it('should read all options and return object with values', () => {

				Argue.setArguments('compile', '--output', '/var/tmp.txt', 'myApp');
				expect(Argue.options([], ['output'])).toEqual({
					output: '/var/tmp.txt'
				});
			});
		});

		describe('described as array', () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				expect(() => Argue.options([], [['output', 'o']])).toThrow(/Unexpected key "input"/);
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				expect(() => Argue.options([], [['output', 'o']])).toThrow(/Unexpected end of arguments/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.options([], [['output', 'o']])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.options([], [['output', 'o']])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				expect(Argue.options([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt']
				});
			});

			it('should return object with array values if shirt flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt,/var/log/my');
				expect(Argue.options([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt');
				expect(Argue.options([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt']
				});
			});

			it('should read all options and return object with values if shirt flag is given', () => {

				Argue.setArguments('compile', '--output', '/var/tmp.txt,/var/log/my', 'myApp');
				expect(Argue.options([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});

			it('should return object with array values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt,/var/log/my');
				expect(Argue.options([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});

			it('should read all options and return object with values if shirt flag is given', () => {

				Argue.setArguments('compile', '-o', '/var/tmp.txt,/var/log/my', 'myApp');
				expect(Argue.options([], [['output', 'o']])).toEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});
		});

		describe('described as object', () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				expect(() => Argue.options([], [{ 'output': 'o' }])).toThrow(/Unexpected key "input"/);
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				expect(() => Argue.options([], [{ 'output': 'o' }])).toThrow(/Unexpected end of arguments/);
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				expect(Argue.options([], [{ 'output': 'o' }])).toEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				expect(Argue.options([], [{ 'output': 'o' }])).toEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				expect(Argue.options([], [{ 'output': 'o' }])).toEqual({
					output: '/var/tmp.txt'
				});
			});

			it('should read all options and return object with values if full flag is given', () => {

				Argue.setArguments('compile', '--output', '/var/tmp.txt', 'myApp');
				expect(Argue.options([], [{ 'output': 'o' }])).toEqual({
					output: '/var/tmp.txt'
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt');
				expect(Argue.options([], [{ 'output': 'o' }])).toEqual({
					output: '/var/tmp.txt'
				});
			});

			it('should read all options and return object with values if shirt flag is given', () => {

				Argue.setArguments('compile', '-o', '/var/tmp.txt', 'myApp');
				expect(Argue.options([], [{ 'output': 'o' }])).toEqual({
					output: '/var/tmp.txt'
				});
			});
		});
	});
});
