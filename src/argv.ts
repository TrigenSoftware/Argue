
const ARGV_START_INDEX = 2

/**
 * Internal state of arguments.
 */
export const argv = process.argv.slice(ARGV_START_INDEX)

/**
 * Reset arguments state.
 */
export function resetArgs() {
  argv.splice(0, argv.length)
  argv.push(...process.argv.slice(ARGV_START_INDEX))
}

/**
 * Set arguments state.
 * @param args
 */
export function setArgs(...args: string[]) {
  argv.splice(0, argv.length)
  argv.push(...args)
}
