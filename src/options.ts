import { argv } from './argv'
import { OptionReader } from './types'
import { Merge, ReturnTypes, UnionMerge } from './utils'

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

      return (option, next, options) => readOption(option, next, options) ?? readNextOption(option, next, options)
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
  if (!argv.length || !optionReaders.length) {
    return {}
  }

  const readOption = createOptionReader(optionReaders)
  const options = {}
  let i = 0
  let arg = argv[i]
  const next = (required = false) => {
    arg = argv[++i]

    if (required && !arg) {
      throw new Error('Unexpected end of arguments')
    }

    return arg
  }

  // eslint-disable-next-line no-unmodified-loop-condition
  while (arg) {
    if (isOption(arg)) {
      Object.assign(options, readOption?.(removePrefix(arg), next, options))
    }

    next()
  }

  return options
}
