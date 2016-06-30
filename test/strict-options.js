import * as Argue from '../src/lib';

describe("strictOptions()", () => {		

	describe("when flag", () => {

		describe("described as string", () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				(() => Argue.strictOptions(["silent"], [])).should.throw(Error, { 
					message: 'Unexpected key "verbose".' 
				});
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				Argue.strictOptions(["verbose"], []).should.be.deepEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				Argue.strictOptions(["verbose"], []).should.be.deepEqual({});
			});

			it('should return object with values', () => {

				Argue.setArguments('--verbose');
				Argue.strictOptions(["verbose"], []).should.be.deepEqual({
					verbose: true
				});
			});
		});

		describe("described as array", () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				(() => Argue.strictOptions([["silent", "s"]], [])).should.throw(Error, { 
					message: 'Unexpected key "verbose".' 
				});
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				Argue.strictOptions([["verbose", "v"]], []).should.be.deepEqual({});
			});


			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				Argue.strictOptions([["verbose", "v"]], []).should.be.deepEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--verbose');
				Argue.strictOptions([["verbose", "v"]], []).should.be.deepEqual({
					verbose: true
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-v');
				Argue.strictOptions([["verbose", "v"]], []).should.be.deepEqual({
					verbose: true
				});
			});
		});

		describe("described as object", () => {

			it('should throw error when given flag is doesn\'t expected', () => {

				Argue.setArguments('--verbose');
				(() => Argue.strictOptions([{"silent": "s"}], [])).should.throw(Error, { 
					message: 'Unexpected key "verbose".' 
				});
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				Argue.strictOptions([{"verbose": "v"}], []).should.be.deepEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				Argue.strictOptions([{"verbose": "v"}], []).should.be.deepEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--verbose');
				Argue.strictOptions([{"verbose": "v"}], []).should.be.deepEqual({
					verbose: true
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-v');
				Argue.strictOptions([{"verbose": "v"}], []).should.be.deepEqual({
					verbose: true
				});
			});
		});
	});

	describe("when option", () => {

		describe("described as string", () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				(() => Argue.strictOptions([], ["output"])).should.throw(Error, { 
					message: 'Unexpected key "input".' 
				});
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				(() => Argue.strictOptions([], ["output"])).should.throw(Error, { 
					message: "Unexpected end of arguments."
				});
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				Argue.strictOptions([], ["output"]).should.be.deepEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				Argue.strictOptions([], ["output"]).should.be.deepEqual({});
			});

			it('should return object with values', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				Argue.strictOptions([], ["output"]).should.be.deepEqual({
					output: '/var/tmp.txt'
				});
			});
		});

		describe("described as array", () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				(() => Argue.strictOptions([], [["output", "o"]])).should.throw(Error, { 
					message: 'Unexpected key "input".' 
				});
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				(() => Argue.strictOptions([], [["output", "o"]])).should.throw(Error, { 
					message: "Unexpected end of arguments."
				});
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				Argue.strictOptions([], [["output", "o"]]).should.be.deepEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				Argue.strictOptions([], [["output", "o"]]).should.be.deepEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				Argue.strictOptions([], [["output", "o"]]).should.be.deepEqual({
					output: ['/var/tmp.txt']
				});
			});

			it('should return object with array values if shirt flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt,/var/log/my');
				Argue.strictOptions([], [["output", "o"]]).should.be.deepEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt');
				Argue.strictOptions([], [["output", "o"]]).should.be.deepEqual({
					output: ['/var/tmp.txt']
				});
			});

			it('should return object with array values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt,/var/log/my');
				Argue.strictOptions([], [["output", "o"]]).should.be.deepEqual({
					output: ['/var/tmp.txt', '/var/log/my']
				});
			});
		});

		describe("described as object", () => {

			it('should throw error when given option is doesn\'t expected', () => {

				Argue.setArguments('--input');
				(() => Argue.strictOptions([], [{"output": "o"}])).should.throw(Error, { 
					message: 'Unexpected key "input".' 
				});
			});

			it('should throw error when value of option is skiped', () => {

				Argue.setArguments('--output');
				(() => Argue.strictOptions([], [{"output": "o"}])).should.throw(Error, { 
					message: "Unexpected end of arguments."
				});
			});

			it('should return empty object when no more arguments', () => {

				Argue.setArguments();
				Argue.strictOptions([], [{"output": "o"}]).should.be.deepEqual({});
			});

			it('should return empty object when key given instead flag', () => {

				Argue.setArguments('install');
				Argue.strictOptions([], [{"output": "o"}]).should.be.deepEqual({});
			});

			it('should return object with values if full flag is given', () => {

				Argue.setArguments('--output', '/var/tmp.txt');
				Argue.strictOptions([], [{"output": "o"}]).should.be.deepEqual({
					output: '/var/tmp.txt'
				});
			});

			it('should return object with values if shirt flag is given', () => {

				Argue.setArguments('-o', '/var/tmp.txt');
				Argue.strictOptions([], [{"output": "o"}]).should.be.deepEqual({
					output: '/var/tmp.txt'
				});
			});
		});
	});
});