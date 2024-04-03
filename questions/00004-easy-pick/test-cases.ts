import type { Equal, Expect } from '@type-challenges/utils'

/*
  K extends keyof T: To make sure all the keys in union T exist in K
  P in K: Refer to  properties in union K, and we're doing mapping iteration for every properties
*/

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

export interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}
