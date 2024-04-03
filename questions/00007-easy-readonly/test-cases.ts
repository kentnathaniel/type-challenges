import type { Equal, Expect } from '@type-challenges/utils'

/*
  The same concept as creating pick, iterate over every properties and make them read-only
*/

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
