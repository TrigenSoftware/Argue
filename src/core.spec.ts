import {
  describe,
  it,
  expect
} from 'vitest'
import { setArgs } from './argv.js'
import * as core from './core.js'
import { alias } from './args.js'

describe('core', () => {
  describe('read', () => {
    setArgs('add', 'browserslist')

    it('should read args', () => {
      expect(core.read()).toBe('add')
      expect(core.read()).toBe('browserslist')
    })

    it('should throw error when unexpected end', () => {
      expect(() => core.read()).toThrow()
    })
  })

  describe('rest', () => {
    it('should read all remaining args', () => {
      setArgs('a.js', 'b.js', 'c.js')

      expect(core.rest()).toEqual(['a.js', 'b.js', 'c.js'])
    })

    it('should consume args, so end passes', () => {
      setArgs('a.js', 'b.js')

      core.rest()
      core.end()
    })

    it('should return empty array when no args left', () => {
      setArgs()

      expect(core.rest()).toEqual([])
    })
  })

  describe('end', () => {
    it('should do check args end', () => {
      setArgs()
      core.end()
    })

    it('should throw error when unexpected arg', () => {
      setArgs('--oops')
      expect(() => core.end()).toThrow()
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
      expect(() => core.expect('install')).toThrow()
    })
  })
})
