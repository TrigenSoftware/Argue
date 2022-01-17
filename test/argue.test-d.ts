import { expectType } from 'tsd'
import { alias, expect, option, readOptions } from '../src'

expectType<'add' | 'install'>(expect('add', alias('install', 'i')))

expectType<{
  input?: string
  port?: number
  plugins?: string[]
  debug?: boolean
}>(
  readOptions(
    option('input', String),
    option(alias('port', 'p'), Number),
    option('plugins', Array),
    option('debug', Boolean)
  )
)

expectType<{
  input: string
} | null>(
  option('input', String)('', () => '', {})
)

expectType<{
  port: number
} | null>(
  option(alias('port', 'p'), Number)('', () => '', {})
)

expectType<{
  plugins: string[]
} | null>(
  option('plugins', Array)('', () => '', {})
)

expectType<{
  debug: boolean
} | null>(
  option('debug', Boolean)('', () => '', {})
)
