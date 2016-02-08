import * as Argue from '../src/lib';

describe("end()", () => {

	it('should throw error when arguments still exists', () => {

		Argue.setArguments('install');
		(() => Argue.end()).should.throw(Error, { 
			message: `Unexpected argument "install".`
		});
	});

	it('should stand still when no more arguments', () => {

		Argue.setArguments();
		Argue.end();
	});
});