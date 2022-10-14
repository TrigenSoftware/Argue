
import { ArgRef } from './types.js'

type FlatMerge<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type Merge<T extends readonly [...unknown[]]> = T extends [infer L, ...infer R]
  ? FlatMerge<NonNullable<L> & Merge<R>>
  : unknown

export type UnionMerge<T extends readonly [...unknown[]]> = T extends [infer L, ...infer R]
  ? L | Merge<R>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export type ReturnTypes<T extends readonly [...AnyFunction[]]> = T extends [infer L, ...infer R]
  ? L extends AnyFunction
    ? R extends AnyFunction[]
      ? [ReturnType<L>, ...ReturnTypes<R>]
      : []
    : []
  : []

/**
 * Match reference with argument.
 * @param argRef
 * @param arg
 * @returns Full name or null.
 */
export function matchArgName<T extends string>(argRef: ArgRef<T>, arg: string) {
  if (typeof argRef === 'string') {
    return argRef === arg
      ? argRef
      : null
  }

  if (argRef.name === arg) {
    return argRef.name
  }

  return argRef.aliases.includes(arg)
    ? argRef.name
    : null
}

/**
 * Find full argument name in references.
 * @param argRefs
 * @param arg
 * @returns Found argument's full name or null.
 */
export function findArgName<T extends string>(argRefs: [...ArgRef<T>[]], arg: string) {
  let argRef: ArgRef<T>
  let argName: T | null

  for (argRef of argRefs) {
    argName = matchArgName(argRef, arg)

    if (argName) {
      return argName
    }
  }

  return null
}
