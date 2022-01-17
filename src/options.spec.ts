import { setArgs } from './argv'
import { option } from './args'
import { readOptions } from './options'

describe('options', () => {
  describe('readOptions', () => {
    it('should return empty object if no args', () => {
      setArgs()

      expect(readOptions(option('verbose', Boolean))).toEqual({})
    })

    it('should return empty object if no readers', () => {
      setArgs('--verbose')

      expect(readOptions()).toEqual({})
    })

    it('should return empty object if no options in args', () => {
      setArgs('--debug')

      expect(readOptions(option('verbose', Boolean))).toEqual({})
    })

    it('should return options with values', () => {
      setArgs('compile', '--input', 'test.ts', '--sourceMaps', '--threads', '2', '--plugins', 'a,b', '--plugins', 'c', '--unknown')

      expect(
        readOptions(
          option('input', String),
          option('sourceMaps', Boolean),
          option('threads', Number),
          option('plugins', Array)
        )
      ).toEqual({
        input: 'test.ts',
        sourceMaps: true,
        threads: 2,
        plugins: [
          'a',
          'b',
          'c'
        ]
      })
    })

    it('should throw error on unexpected end', () => {
      setArgs('compile', '--input')

      expect(
        () => readOptions(option('input', String))
      ).toThrowError()
    })
  })
})