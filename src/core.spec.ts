import { setArgs } from './argv'
import * as core from './core'
import { alias } from './args'

describe('core', () => {
  describe('read', () => {
    setArgs('add', 'browserslist')

    it('should read args', () => {
      expect(core.read()).toBe('add')
      expect(core.read()).toBe('browserslist')
    })

    it('should throw error when unexpected end', () => {
      expect(() => core.read()).toThrowError()
    })
  })

  describe('end', () => {
    it('should do check args end', () => {
      setArgs()
      core.end()
    })

    it('should throw error when unexpected arg', () => {
      setArgs('--oops')
      expect(() => core.end()).toThrowError()
    })
  })

  describe('expect', () => {
    it('should return full argument name from refs', () => {
      setArgs('install', 'o', 'D')

      expect(core.expect('install')).toBe('install')
      expect(core.expect(alias('output', 'o'))).toBe('output')
      expect(core.expect(alias('saveDev', 'save-dev', 'D'))).toBe('saveDev')
    })

    it('should throw error when unexpected arg', () => {
      setArgs('remove')
      expect(() => core.expect('install')).toThrowError()
    })
  })
})
