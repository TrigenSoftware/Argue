import * as Argue from '../src/lib';

describe("optionsEqual()", () => {

	describe("when option described as string", () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			(() => Argue.optionsEqual("output")).should.throw(Error, { 
				message: 'Unexpected key "input".' 
			});
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			Argue.strictOptions([], ["output"]).should.be.deepEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			Argue.optionsEqual("output").should.be.deepEqual({});
		});

		it('should return object with values', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			Argue.optionsEqual("output", "verbose").should.be.deepEqual({
				output: '/var/tmp.txt',
				verbose: true
			});
		});

		it('should read all flags and return object with values', () => {

			Argue.setArguments('lift', '--verbose');
			Argue.optionsEqual("verbose").should.be.deepEqual({
				verbose: true
			});
		});
	});

	describe("when option described as array", () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			(() => Argue.optionsEqual(["output", "o"])).should.throw(Error, { 
				message: 'Unexpected key "input".' 
			});
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			Argue.optionsEqual(["output", "o"]).should.be.deepEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			Argue.optionsEqual(["output", "o"]).should.be.deepEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt');
			Argue.optionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt,/var/log/my');
			Argue.optionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});

		it('should read all flags and return object with values if full flag is given', () => {

			Argue.setArguments('lift', '--verbose');
			Argue.optionsEqual(["verbose", "v"]).should.be.deepEqual({
				verbose: true
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt');
			Argue.optionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt,/var/log/my');
			Argue.optionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});

		it('should read all flags and return object with values if shirt flag is given', () => {

			Argue.setArguments('lift', '-v');
			Argue.optionsEqual(["verbose", "v"]).should.be.deepEqual({
				verbose: true
			});
		});
	});

	describe("when option described as object", () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			(() => Argue.optionsEqual({"output": "o"})).should.throw(Error, { 
				message: 'Unexpected key "input".' 
			});
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			Argue.optionsEqual({"output": "o"}).should.be.deepEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			Argue.optionsEqual({"output": "o"}).should.be.deepEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			Argue.optionsEqual({"output": "o"}, {"verbose":"v"}).should.be.deepEqual({
				output: '/var/tmp.txt',
				verbose: true
			});
		});

		it('should read all flags and return object with values if full flag is given', () => {

			Argue.setArguments('lift', '--verbose');
			Argue.optionsEqual({"verbose": "v"}).should.be.deepEqual({
				verbose: true
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt', '-v');
			Argue.optionsEqual({"output": "o"}, {"verbose":"v"}).should.be.deepEqual({
				output: '/var/tmp.txt',
				verbose: true
			});
		});

		it('should read all flags and return object with values if shirt flag is given', () => {

			Argue.setArguments('lift', '-v');
			Argue.optionsEqual({"verbose": "v"}).should.be.deepEqual({
				verbose: true
			});
		});
	});
});