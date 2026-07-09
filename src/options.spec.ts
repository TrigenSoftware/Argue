import {
  describe,
  it,
  expect
} from 'vitest'
import {
  setArgs,
  argv
} from './argv.js'
import { option } from './args.js'
import { readOptions } from './options.js'

describe('options', () => {
  describe('readOptions', () => {
    it('should return empty object if no args', () => {
      setArgs()

      expect(readOptions(option('verbose', Boolean))).toEqual({})
    })

    it('should return empty object if no readers', () => {
      setArgs('--verbose')

      expect(readOptions()).toEqual({})
      expect(argv).toEqual(['--verbose'])
    })

    it('should return empty object if no options in args', () => {
      setArgs('--debug')

      expect(readOptions(option('verbose', Boolean))).toEqual({})
      expect(argv).toEqual(['--debug'])
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
      expect(argv).toEqual(['compile', '--unknown'])
    })

    it('should throw error on unexpected end', () => {
      setArgs('compile', '--input')

      expect(
        () => readOptions(option('input', String))
      ).toThrow()
    })

    it('should read inline values', () => {
      setArgs('--input=test.ts', '--threads=2', '--plugins=a,b', '--plugins=c')

      expect(
        readOptions(
          option('input', String),
          option('threads', Number),
          option('plugins', Array)
        )
      ).toEqual({
        input: 'test.ts',
        threads: 2,
        plugins: [
          'a',
          'b',
          'c'
        ]
      })
      expect(argv).toEqual([])
    })

    it('should split inline value at first equals sign', () => {
      setArgs('--define=FOO=bar')

      expect(readOptions(option('define', String))).toEqual({
        define: 'FOO=bar'
      })
    })

    it('should read empty inline value', () => {
      setArgs('--input=')

      expect(readOptions(option('input', String))).toEqual({
        input: ''
      })
    })

    it('should throw error on inline value for boolean option', () => {
      setArgs('--verbose=true')

      expect(
        () => readOptions(option('verbose', Boolean))
      ).toThrow('Unexpected value for "--verbose"')
    })

    it('should keep unknown option with inline value untouched', () => {
      setArgs('--unknown=value', '--verbose')

      expect(readOptions(option('verbose', Boolean))).toEqual({
        verbose: true
      })
      expect(argv).toEqual(['--unknown=value'])
    })
  })
})
