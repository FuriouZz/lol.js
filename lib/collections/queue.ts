import { Dispatcher } from "../Dispatcher"

export interface QueueUnresolvedEntry<T> {
  key: T
  relative: T
  move: "before" | "after" | "replace" | "swap" | "remove"
}

export class Queue<T> {
  items: T[] = []
  unresolved: QueueUnresolvedEntry<T>[] = []
  onresolve = new Dispatcher<QueueUnresolvedEntry<T>>()

  indexOf(item: T) {
    return this.items.indexOf(item)
  }

  has(item: T) {
    return this.items.includes(item)
  }

  insert(...items: T[]) {
    this.items.push(...items)
    this.resolveDependencies()
  }

  insertAt(index: number, ...items: T[]) {
    this.items.splice(index, 0, ...items)
    this.resolveDependencies()
  }

  remove(...items: T[]) {
    for (const item of items) {
      if (this.has(item)) {
        const index = this.indexOf(item)
        this.removeAt(index)
      } else {
        this.unresolved.push({ key: null as unknown as T, relative: item, move: "remove" })
      }
    }
  }

  removeAt(index: number) {
    this.items.splice(index, 1)
    this.resolveDependencies()
  }

  before(before: T, ...keys: T[]) {
    for (const key of keys.reverse()) {
      if (!this.has(before)) {
        this.unresolved.push({ key, relative: before, move: "before" })
      } else {
        const index = this.indexOf(before)
        this.insertAt(index, key)
        this.resolveDependencies()
      }
      before = key
    }
  }

  after(after: T, ...keys: T[]) {
    for (const key of keys) {
      if (!this.has(after)) {
        this.unresolved.push({ key, relative: after, move: "after" })
      } else {
        const index = this.indexOf(after) + 1
        this.insertAt(index, key)
        this.resolveDependencies()
      }
      after = key
    }
  }

  swap(first: T, second: T) {
    if (this.has(first) && this.has(second)) {
      const i0 = this.indexOf(first)
      const i1 = this.indexOf(second)

      const imin = Math.min(i0, i1)
      const imax = Math.max(i0, i1)

      this.removeAt(imax)
      this.removeAt(imin)

      if (i0 === imin) {
        this.insertAt(i0, second)
        this.insertAt(i1, first)
      } else {
        this.insertAt(i1, first)
        this.insertAt(i0, second)
      }

      this.resolveDependencies()
    } else {
      this.unresolved.push({ key: first, relative: second, move: "swap" })
    }
  }

  replace(replaced: T, ...items: T[]) {
    if (!this.has(replaced)) {
      let prev!: T
      for (const key of items) {
        if (prev) {
          this.unresolved.push({ key, relative: prev, move: "after" })
        } else {
          this.unresolved.push({ key, relative: replaced, move: "replace" })
        }
        prev = key
      }
    } else {
      let prev = replaced
      for (const key of items) {
        this.after(key, prev)
        prev = key
      }
      this.remove(replaced)
      this.resolveDependencies()
    }
    return this
  }

  resolveDependencies() {
    if (this.unresolved.length === 0) return

    let pendings: QueueUnresolvedEntry<T>[] = []
    while (this.unresolved.length > 0) {
      const pending = this.unresolved.shift()
      if (!pending) return

      if (!this.has(pending.relative)) {
        pendings.push(pending)
        continue
      }

      if (pending.move === "before") {
        this.before(pending.relative, pending.key)
      } else if (pending.move === "after") {
        this.after(pending.relative, pending.key)
      } else if (pending.move === "replace") {
        this.replace(pending.relative, pending.key)
      } else if (pending.move === "swap") {
        this.swap(pending.key, pending.relative)
      } else if (pending.move === "remove") {
        this.remove(pending.relative)
      }

      this.onresolve.dispatch(pending)
      this.unresolved.unshift(...pendings)
      pendings = []
    }

    this.unresolved = pendings
  }

  [Symbol.iterator]() {
    return this.items[Symbol.iterator]()
  }

  values() {
    return this.items.values()
  }

  keys() {
    return this.items.keys()
  }

  entries() {
    return this.items.entries()
  }

  filter<S extends T>(predicate: (value: T, index: number, array: Queue<T>) => value is S): Queue<S>
  filter(predicate: (value: T, index: number, array: Queue<T>) => unknown, thisArg?: any): Queue<T>
  filter(predicate: (value: T, index: number, array: Queue<T>) => unknown, thisArg?: any): Queue<T> {
    const q = new Queue<T>()
    q.items = this.items.filter((value, index) => (
      predicate.call(thisArg, value, index, this)
    ))
    return q
  }

  map<U>(predicate: (value: T, index: number, array: Queue<T>) => U, thisArg?: any): Queue<U> {
    const q = new Queue<U>()
    q.items = this.items.map((value, index) => (
      predicate.call(thisArg, value, index, this)
    ))
    return q
  }

  forEach(callback: (value: T, index: number, array: Queue<T>) => void, thisArg?: any) {
    this.items.forEach((value, index) => (
      callback.call(thisArg, value, index, this)
    ))
  }

}
