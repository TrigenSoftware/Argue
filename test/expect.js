import * as Argue from '../src';

describe('expect()', () => {

	it('should throw error when no more arguments', () => {

		Argue.setArguments();
		(() => Argue.expect('install', 'remove')).should.throw(Error, {
			message: 'Unexpected end of arguments.'
		});
	});

	it('should throw error when given command is doesn\'t expected', () => {

		Argue.setArguments('delete', 'mocha');
		(() => Argue.expect('install', 'remove')).should.throw(Error, {
			message: 'Unexpected argument "delete".'
		});
	});

	describe('when argument alias described as object', () => {

		it('should return full version of command if full given', () => {

			Argue.setArguments('install', 'mocha');
			Argue.expect({ 'install': 'i' }, { 'remove': 'r' }).should.be.equal('install');
		});

		it('should return full version of command if shirt given', () => {

			Argue.setArguments('i', 'mocha');
			Argue.expect({ 'install': 'i' }, { 'remove': 'r' }).should.be.equal('install');
		});
	});

	describe('when argument alias described as array', () => {

		it('should return full version of command if full given', () => {

			Argue.setArguments('install', 'mocha');
			Argue.expect(['install', 'i'], ['remove', 'r']).should.be.equal('install');
		});

		it('should return full version of command if shirt given', () => {

			Argue.setArguments('i', 'mocha');
			Argue.expect(['install', 'i'], ['remove', 'r']).should.be.equal('install');
		});
	});

	describe('when argument described as string', () => {

		it('should return command', () => {

			Argue.setArguments('install', 'mocha');
			Argue.expect('install', 'remove').should.be.equal('install');
		});
	});
});
