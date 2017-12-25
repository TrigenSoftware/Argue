import * as Argue from '../src';

describe('read()', () => {

	it('should throw error when no more arguments', () => {

		Argue.setArguments();
		(() => Argue.read()).should.throw(Error, {
			message: 'Unexpected end of arguments.'
		});
	});

	it('should return current argument', () => {

		Argue.setArguments('argument');
		Argue.read().should.be.equal('argument');
	});

	it('should move to next arguments', () => {

		Argue.setArguments('argument', 'argument2');
		Argue.read().should.be.equal('argument');
		Argue.read().should.be.equal('argument2');
	});
});
