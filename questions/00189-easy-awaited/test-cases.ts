import type { Equal, Expect } from '@type-challenges/utils'

/*
  Applying infer and recursive type
  Using PromiseLike to simplify the solution
*/

type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
  T extends PromiseLike<infer V>
    ? V extends PromiseLike<any>
      ? MyAwaited<V>
      : V
    : never

/*
Need to handle the recursive by checking again V
*/

type MyAwaitedv3<T extends PromiseLike<any>> =
  T extends PromiseLike<infer V>
    ? MyAwaitedv3<V>
    : never

/*
  This solution is too redundant
  Another thing, this doesn't cover test case expect error
*/

type MyAwaitedv2<T> = T extends { then: (callback: (arg: infer K) => any) => any } ? MyAwaitedv2<K> : T

/*
  This won't work because it doesn't handle test case 5
*/
type MyAwaitedv1<T> = T extends Promise<infer K> ? MyAwaitedv1<K> : T

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>
