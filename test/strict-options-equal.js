import * as Argue from '../src/lib';

describe("strictOptionsEqual()", () => {

	describe("when option described as string", () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			(() => Argue.strictOptionsEqual("output")).should.throw(Error, { 
				message: 'Unexpected key "input".' 
			});
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			Argue.strictOptions([], ["output"]).should.be.deepEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			Argue.strictOptionsEqual("output").should.be.deepEqual({});
		});

		it('should return object with values', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			Argue.strictOptionsEqual("output", "verbose").should.be.deepEqual({
				output: '/var/tmp.txt',
				verbose: true
			});
		});
	});

	describe("when option described as array", () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			(() => Argue.strictOptionsEqual(["output", "o"])).should.throw(Error, { 
				message: 'Unexpected key "input".' 
			});
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			Argue.strictOptionsEqual(["output", "o"]).should.be.deepEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			Argue.strictOptionsEqual(["output", "o"]).should.be.deepEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt');
			Argue.strictOptionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if shirt flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt,/var/log/my');
			Argue.strictOptionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt');
			Argue.strictOptionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt']
			});
		});

		it('should return object with array values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt,/var/log/my');
			Argue.strictOptionsEqual(["output", "o"]).should.be.deepEqual({
				output: ['/var/tmp.txt', '/var/log/my']
			});
		});
	});

	describe("when option described as object", () => {

		it('should throw error when given option is doesn\'t expected', () => {

			Argue.setArguments('--input');
			(() => Argue.strictOptionsEqual({"output": "o"})).should.throw(Error, { 
				message: 'Unexpected key "input".' 
			});
		});

		it('should return empty object when no more arguments', () => {

			Argue.setArguments();
			Argue.strictOptionsEqual({"output": "o"}).should.be.deepEqual({});
		});

		it('should return empty object when key given instead flag', () => {

			Argue.setArguments('install');
			Argue.strictOptionsEqual({"output": "o"}).should.be.deepEqual({});
		});

		it('should return object with values if full flag is given', () => {

			Argue.setArguments('--output=/var/tmp.txt', '--verbose');
			Argue.strictOptionsEqual({"output": "o"}, {"verbose":"v"}).should.be.deepEqual({
				output: '/var/tmp.txt',
				verbose: true
			});
		});

		it('should return object with values if shirt flag is given', () => {

			Argue.setArguments('-o=/var/tmp.txt', '-v');
			Argue.strictOptionsEqual({"output": "o"}, {"verbose":"v"}).should.be.deepEqual({
				output: '/var/tmp.txt',
				verbose: true
			});
		});
	});
});