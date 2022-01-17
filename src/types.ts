export type SimpleArgRef<T extends string> = T

export interface AliasArgRef<T extends string> {
  name: T
  aliases: string[]
}

export type ArgRef<T extends string> = SimpleArgRef<T> | AliasArgRef<T>

export type ArgRefName<T extends ArgRef<string>> =
  T extends AliasArgRef<string>
    ? T['name']
    : T

export type OptionsReaderState = Record<string, unknown>

export type OptionsReaderRead = () => string

export type PrimitiveConstructor = StringConstructor | NumberConstructor | ArrayConstructor | BooleanConstructor

export type OptionValueType<T extends PrimitiveConstructor> =
  T extends StringConstructor
    ? string
    : T extends NumberConstructor
      ? number
      : T extends ArrayConstructor
        ? string[]
        : boolean

export type OptionResult<T extends string = string, K extends PrimitiveConstructor = PrimitiveConstructor> = Record<T, OptionValueType<K>>

export type OptionReader<T extends OptionResult = OptionResult> =
  (
    option: string,
    read: OptionsReaderRead,
    options: OptionsReaderState
  ) => T | null
