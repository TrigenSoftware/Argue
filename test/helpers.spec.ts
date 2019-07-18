import { findName } from '../src/helpers';

describe('Helpers', () => {

	describe('findName()', () => {

		it('should correctly find name', () => {

			expect(findName('o', [
				{ 'output': 'o' },
				['plugins', 'p']
			])).toEqual(['output', false]);

			expect(findName('plugins', [
				{ 'output': 'o' },
				['plugins', 'p']
			])).toEqual(['plugins', true]);
		});
	});
});
