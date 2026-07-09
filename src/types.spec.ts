import {
  describe,
  it,
  expectTypeOf
} from 'vitest'
import { setArgs } from './argv.js'
import * as argue from './index.js'

describe('types', () => {
  describe('expect', () => {
    it('should infer union of expected args', () => {
      setArgs('add')

      expectTypeOf(argue.expect('add', argue.alias('install', 'i'))).toEqualTypeOf<'add' | 'install'>()
    })
  })

  describe('option', () => {
    it('should infer string option result', () => {
      expectTypeOf(argue.option('input', String)('', () => '', {})).toEqualTypeOf<{
        input: string
      } | null>()
    })

    it('should infer number option result', () => {
      expectTypeOf(argue.option(argue.alias('port', 'p'), Number)('', () => '', {})).toEqualTypeOf<{
        port: number
      } | null>()
    })

    it('should infer array option result', () => {
      expectTypeOf(argue.option('plugins', Array)('', () => '', {})).toEqualTypeOf<{
        plugins: string[]
      } | null>()
    })

    it('should infer boolean option result', () => {
      expectTypeOf(argue.option('debug', Boolean)('', () => '', {})).toEqualTypeOf<{
        debug: boolean
      } | null>()
    })
  })

  describe('readOptions', () => {
    it('should infer merged options result', () => {
      setArgs()

      expectTypeOf(
        argue.readOptions(
          argue.option('input', String),
          argue.option(argue.alias('port', 'p'), Number),
          argue.option('plugins', Array),
          argue.option('debug', Boolean)
        )
      ).toEqualTypeOf<{
        input?: string
        port?: number
        plugins?: string[]
        debug?: boolean
      }>()
    })
  })
})
