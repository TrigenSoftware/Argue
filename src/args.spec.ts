import {
  describe,
  it,
  expect
} from 'vitest'
import {
  alias,
  autocase,
  flag,
  option
} from './args.js'

describe('args', () => {
  describe('autocase', () => {
    it('should add kebab-case twin for camelCase name', () => {
      expect(autocase('firstRelease')).toEqual({
        name: 'firstRelease',
        aliases: ['first-release']
      })
    })

    it('should add camelCase twin for kebab-case name', () => {
      expect(autocase('first-release')).toEqual({
        name: 'first-release',
        aliases: ['firstRelease']
      })
    })

    it('should autocase aliases longer than one character', () => {
      expect(autocase(alias('saveDev', 'save-dev-deps', 'D'))).toEqual({
        name: 'saveDev',
        aliases: ['save-dev-deps', 'D', 'saveDevDeps', 'save-dev']
      })
    })

    it('should not duplicate existing aliases', () => {
      expect(autocase(alias('saveDev', 'save-dev'))).toEqual({
        name: 'saveDev',
        aliases: ['save-dev']
      })
    })

    it('should return single-word name as is', () => {
      expect(autocase('verbose')).toBe('verbose')
      expect(autocase(alias('verbose', 'v'))).toEqual({
        name: 'verbose',
        aliases: ['v']
      })
    })

    it('should work with option reader', () => {
      const reader = option(autocase('firstRelease'), Boolean)

      expect(reader('first-release', () => '', {})).toEqual({
        firstRelease: true
      })
      expect(reader('firstRelease', () => '', {})).toEqual({
        firstRelease: true
      })
    })
  })

  describe('option', () => {
    it('should return working string reader', () => {
      const reader = option('otp', String)

      expect(reader('otp', () => '123', {})).toEqual({
        otp: '123'
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })

    it('should return working number reader', () => {
      const reader = option(alias('port', 'p'), Number)

      expect(reader('p', () => '80', {})).toEqual({
        port: 80
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })

    it('should return working array reader', () => {
      const reader = option('plugins', Array)

      expect(reader('plugins', () => 'eslint', {})).toEqual({
        plugins: ['eslint']
      })
      expect(reader('plugins', () => 'eslint,swc', {})).toEqual({
        plugins: ['eslint', 'swc']
      })
      expect(reader('plugins', () => 'typescript', {
        plugins: ['babel']
      })).toEqual({
        plugins: ['babel', 'typescript']
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })

    it('should return working boolean reader', () => {
      const reader = option(alias('verbose', 'v'), Boolean)

      expect(reader('verbose', () => 'oops', {})).toEqual({
        verbose: true
      })
      expect(reader('test', () => '123', {})).toBeNull()
    })
  })

  describe('flag', () => {
    it('should return working boolean reader', () => {
      const reader = flag('append')

      expect(reader('append')).toEqual({
        append: true
      })
      expect(reader('test')).toBeNull()
    })

    it('should read negated form as false', () => {
      const reader = flag('append')

      expect(reader('no-append')).toEqual({
        append: false
      })
    })

    it('should negate aliases too', () => {
      const reader = flag(autocase('firstRelease'))

      expect(reader('no-firstRelease')).toEqual({
        firstRelease: false
      })
      expect(reader('no-first-release')).toEqual({
        firstRelease: false
      })
    })

    it('should prefer direct match over negation', () => {
      const reader = flag('no-cache')

      expect(reader('no-cache')).toEqual({
        'no-cache': true
      })
    })
  })
})
