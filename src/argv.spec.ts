import {
  describe,
  it,
  expect
} from 'vitest'
import {
  argv,
  setArgs,
  resetArgs
} from './argv.js'

describe('argv', () => {
  describe('setArgs', () => {
    it('should set args state', () => {
      setArgs('add', 'browserslist')

      expect(argv).toEqual(['add', 'browserslist'])
    })

    it('should replace args state when called again', () => {
      setArgs('add', 'browserslist')
      setArgs('--verbose')

      expect(argv).toEqual(['--verbose'])
    })
  })

  describe('resetArgs', () => {
    it('should restore args state from process arguments', () => {
      const processArgv = process.argv

      try {
        process.argv = ['node', 'cli.js', 'install', '--save-dev']
        setArgs('add', 'browserslist')
        resetArgs()
      } finally {
        process.argv = processArgv
      }

      expect(argv).toEqual(['install', '--save-dev'])
    })
  })
})
