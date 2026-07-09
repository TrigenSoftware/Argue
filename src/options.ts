import type {
  OptionReader,
  OptionResult
} from './types.js'
import type {
  Merge,
  ReturnTypes,
  UnionMerge
} from './utils.js'
import { argv } from './argv.js'

function isOption(arg: string) {
  return /^--?[^-].*/.test(arg)
}

function removePrefix(arg: string) {
  return arg.replace(/^--?/, '')
}

function splitOption(arg: string): [name: string, value?: string] {
  const eqIndex = arg.indexOf('=')

  return eqIndex === -1
    ? [arg]
    : [arg.slice(0, eqIndex), arg.slice(eqIndex + 1)]
}

function createOptionReader<T extends OptionReader[]>(optionReaders: [...T]) {
  const optionReader = optionReaders.reduceRight<OptionReader | null>(
    (readNextOption, readOption) => {
      if (!readNextOption) {
        return readOption
      }

      return (option, read, options) => readOption(option, read, options) ?? readNextOption(option, read, options)
    },
    null
  )

  return optionReader as OptionReader<UnionMerge<ReturnTypes<T>>> | null
}

/**
 * Read options from arguments.
 * @param optionReaders
 * @returns Options with values.
 */
export function readOptions<T extends OptionReader[]>(...optionReaders: [...T]): Partial<Merge<ReturnTypes<T>>> {
  if (!argv.length) {
    return {}
  }

  const readOption = createOptionReader(optionReaders)

  if (!readOption) {
    return {}
  }

  const options = {}
  let i = 0
  let arg = argv[i]
  let optionResult: OptionResult | null
  let optionEqValue: string | undefined
  const next = () => {
    arg = argv[++i]
  }
  const remove = () => {
    if (optionEqValue !== undefined) {
      throw new Error(`Unexpected value for "${arg}"`)
    }

    argv.splice(i--, 1)
  }
  const read = () => {
    if (optionEqValue !== undefined) {
      const value = optionEqValue

      optionEqValue = undefined

      return value
    }

    next()
    remove()

    if (!arg) {
      throw new Error('Unexpected end of arguments')
    }

    return arg
  }

  // oxlint-disable-next-line eslint/no-unmodified-loop-condition
  while (arg) {
    if (isOption(arg)) {
      [arg, optionEqValue] = splitOption(arg)
      optionResult = readOption(removePrefix(arg), read, options)

      if (optionResult) {
        remove()
        Object.assign(options, optionResult)
      }
    }

    next()
  }

  return options
}
