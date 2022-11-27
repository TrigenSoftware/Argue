import { argv } from './argv.js'
import type { OptionReader, OptionResult } from './types.js'
import type { Merge, ReturnTypes, UnionMerge } from './utils.js'

function isOption(arg: string) {
  return /^--?[^-].*/.test(arg)
}

function removePrefix(arg: string) {
  return arg.replace(/^--?/, '')
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
  const next = () => {
    arg = argv[++i]
  }
  const remove = () => {
    argv.splice(i--, 1)
  }
  const read = () => {
    next()
    remove()

    if (!arg) {
      throw new Error('Unexpected end of arguments')
    }

    return arg
  }

  // eslint-disable-next-line no-unmodified-loop-condition
  while (arg) {
    if (isOption(arg)) {
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
