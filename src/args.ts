import {
  AliasArgRef,
  ArgRef,
  PrimitiveConstructor,
  OptionsReaderState,
  OptionsReaderRead,
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
    return (option: string, read: OptionsReaderRead) => {
      const argName = matchArgName(argRef, option)

      if (argName) {
        return {
          [argName]: read()
        } as OptionResult<T, K>
      }

      return null
    }
  }

  if (type === Number) {
    return (option: string, read: OptionsReaderRead) => {
      const argName = matchArgName(argRef, option)

      if (argName) {
        return {
          [argName]: parseFloat(read())
        } as OptionResult<T, K>
      }

      return null
    }
  }

  if (type === Array) {
    return (option: string, read: OptionsReaderRead, options: OptionsReaderState) => {
      const argName = matchArgName(argRef, option)

      if (argName) {
        const prevValues = options[argName]
        const values = read().split(',')

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
