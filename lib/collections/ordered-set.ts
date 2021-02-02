export class OrderedSet<T> {

  private items: T[] = []

  get size() {
    return this.items.length
  }

  add(v: T) {
    if (!this.has(v)) {
      this.items.push(v)
    }
  }

  insertAt(v: T, index: number) {
    if (!this.has(v)) {
      this.items.splice(index, 0, v)
    }
  }

  index(v: T) {
    return this.items.indexOf(v)
  }

  get(index: number) {
    return this.items[index]
  }

  has(v: T) {
    return this.items.indexOf(v) > -1
  }

  remove(v: T) {
    const index = this.items.indexOf(v)
    if (index > -1) {
      this.items.splice(index, 1)
    }
  }

  removeAt(index: number) {
    this.items.splice(index, 1)
  }

  clear() {
    this.items = []
  }

  shift() {
    return this.items.shift()
  }

  pop() {
    return this.items.pop()
  }

  join(separator?: string) {
    return this.items.join(separator)
  }

  [Symbol.iterator](): Iterator<T> {
    return this.values()
  }

  values(): Iterator<T> {
    const len = this.size
    const items = this.items.slice(0)
    let index = -1
    return {
      next(): IteratorResult<T> {
        if (index+1 < len) {
          index++
          const value = items[index]
          return {
            done: false,
            value: value
          }
        } else {
          return {
            done: true,
            // @ts-ignore
            value: null,
          }
        }
      }
    }
  }

  entries(): Iterator<[number, T]> {
    const len = this.size
    const items = this.items.slice(0)
    let index = -1
    return {
      next(): IteratorResult<[number, T]> {
        if (index+1 < len) {
          index++
          const value = items[index]
          return {
            done: false,
            value: [index, value]
          }
        } else {
          return {
            done: true,
            // @ts-ignore
            value: null,
          }
        }
      }
    }
  }

  forEach(cb: (item: T, index: number, set: OrderedSet<T>) => void) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      cb(item, i, this)
    }
  }

  map<U>(cb: (item: T, index: number, set: OrderedSet<T>) => U) {
    const set = new OrderedSet<U>()
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      set.add(cb(item, i, this))
    }
    return set
  }

  filter(predicate: (item: T, index: number, set: OrderedSet<T>) => unknown) {
    const set = new OrderedSet<T>()
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      if (predicate(item, i, this)) {
        set.add(item)
      }
    }
    return set
  }

  clone() {
    const set = new OrderedSet<T>()
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      set.add(item)
    }
    return set
  }

}