import {
  AliasArgRef,
  ArgRef,
  PrimitiveConstructor,
  OptionsReaderState,
  OptionsReaderNext,
  OptionResult
} from './types'
import { matchArgName } from './utils'

/**
 * Describe argument with aliases.
 * @param name - Main name.
 * @param alias - Alias name.
 * @param restAliases - Rest aliases.
 * @returns Description of argument with aliases..
 */
export function alias<T extends string>(name: T, alias: string, ...restAliases: string[]): AliasArgRef<T> {
  return {
    name,
    aliases: [alias, ...restAliases]
  }
}

/**
 * Describe option with value.
 * @param argRef - Option name.
 * @param type - Value type.
 * @returns Option reader.
 */
export function option<T extends string, K extends PrimitiveConstructor>(argRef: ArgRef<T>, type: K) {
  if (type === String) {
    return (option: string, next: OptionsReaderNext) => {
      const argName = matchArgName(argRef, option)

      if (argName) {
        return {
          [argName]: next(true)
        } as OptionResult<T, K>
      }

      return null
    }
  }

  if (type === Number) {
    return (option: string, next: OptionsReaderNext) => {
      const argName = matchArgName(argRef, option)

      if (argName) {
        return {
          [argName]: parseFloat(next(true))
        } as OptionResult<T, K>
      }

      return null
    }
  }

  if (type === Array) {
    return (option: string, next: OptionsReaderNext, options: OptionsReaderState) => {
      const argName = matchArgName(argRef, option)

      if (argName) {
        const prevValues = options[argName]
        const values = next(true).split(',')

        return {
          [argName]: Array.isArray(prevValues)
            ? prevValues.concat(values)
            : values
        } as OptionResult<T, K>
      }

      return null
    }
  }

  return (option: string) => {
    const argName = matchArgName(argRef, option)

    if (argName) {
      return {
        [argName]: true
      } as OptionResult<T, K>
    }

    return null
  }
}
