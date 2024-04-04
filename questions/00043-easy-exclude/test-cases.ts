import type { Equal, Expect } from '@type-challenges/utils'

/*
Applying distributive conditional types concept:
typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
*/

type MyExclude<T, U> = T extends U ? never : T

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]
