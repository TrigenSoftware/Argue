import type {
  AliasArgRef,
  ArgRef,
  PrimitiveConstructor,
  OptionsReaderState,
  OptionsReaderRead,
  OptionResult
} from './types.js'
import { matchArgName } from './utils.js'

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

function caseTwin(name: string) {
  return name.length > 1
    ? name.includes('-')
      ? name.replace(/-+(.)/g, (_, char: string) => char.toUpperCase())
      : name.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`)
    : name
}

/**
 * Describe argument that matches both camelCase and kebab-case forms.
 * Name and every alias longer than one character get the twin form as an alias.
 * @param argRef - Argument name in either form.
 * @returns Description of argument with the twin forms as aliases.
 */
export function autocase<T extends string>(argRef: ArgRef<T>): ArgRef<T> {
  let name
  let aliases

  if (typeof argRef === 'string') {
    name = argRef
    aliases = new Set<string>()
  } else {
    name = argRef.name
    aliases = new Set(argRef.aliases.concat(argRef.aliases.map(caseTwin)))
  }

  aliases.add(caseTwin(name))
  aliases.delete(name)

  if (!aliases.size) {
    return argRef
  }

  return {
    name,
    aliases: [...aliases]
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

const NEGATION_PREFIX = 'no-'

/**
 * Describe boolean flag with `--no-*` negation support.
 * @param argRef - Flag name.
 * @returns Option reader.
 */
export function flag<T extends string>(argRef: ArgRef<T>) {
  return (option: string) => {
    let value = true
    let argName = matchArgName(argRef, option)

    if (!argName && option.startsWith(NEGATION_PREFIX)) {
      value = false
      argName = matchArgName(argRef, option.slice(NEGATION_PREFIX.length))
    }

    if (argName) {
      return {
        [argName]: value
      } as OptionResult<T, BooleanConstructor>
    }

    return null
  }
}
