import type { Equal, Expect } from '@type-challenges/utils'

/*
  Why this doesn't work, because the test case expect to return `never` when it is empty array
  But with this implementation, it will return undefined instead
  So we need a more sophisticated solution
*/
type Firstv1<T extends any[]> = T[0]

/*
  This doesn't work because if the first index is literal undefined, it needs to return undefined :(
*/
type Firstv2<T extends any[]> = T[0] extends undefined ? never : T[0]

/*
  The expected solution is done by using infer to catch the first index type
*/
type First<T extends any[]> = T extends [infer U, ...infer Rest] ? U : never

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
