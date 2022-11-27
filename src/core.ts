import { argv } from './argv.js'
import type { ArgRef } from './types.js'
import { findArgName } from './utils.js'

/**
 * Read next argument.
 * Throws error if no next argument.
 * @returns Next argument.
 */
export function read() {
  const value = argv.shift()

  if (!value) {
    throw new Error('Unexpected end of arguments')
  }

  return value
}

/**
 * Expectation of the end.
 * Throws an error if there are more arguments left.
 */
export function end() {
  if (argv.length) {
    throw new Error(`Unexpected argument "${argv[0]}"`)
  }
}

/**
 * Expect one of the given arguments.
 * @param argRefs
 * @returns Expected full argument name.
 */
export function expect<T extends string>(...argRefs: [...ArgRef<T>[]]) {
  const arg = read()
  const argName = findArgName(argRefs, arg)

  if (!argName) {
    throw new Error(`Unexpected argument "${arg}"`)
  }

  return argName
}
