interface ItemValue<T> {
  value: T
  next?: ItemValue<T>
}

interface ItemValueOptional<T> extends Partial<ItemValue<T>> {}

export class List<T> {
  protected _root: ItemValueOptional<T> = {}
  protected _count = 0

  constructor(array?: T[]) {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        this.add(array[i])
      }
    }
  }

  get length() {
    return this._count
  }

  insertAt(index: number, value: T) {
    const item: ItemValue<T> = { value: value }

    let previous = this._root as ItemValue<T>
    let current = previous.next

    // Fetch current at index
    let i = 0
    while (i < index && current) {
      previous = current
      current = current.next
      i++
    }

    if (previous.next) item.next = previous.next

    previous.next = item

    // Increment list count
    this._count++

    return index
  }

  removeAt(index: number) {
    let previous = this._root as ItemValue<T>
    let current = previous.next

    // Fetch current at index
    let i = 0
    while (i < index && current) {
      previous = current
      current = current.next
      i++
    }

    if (!current) return null

    previous.next = current.next

    // Decrement list count
    this._count--

    return current.value
  }

  unshift(value: T) {
    return this.insertAt(0, value)
  }

  push(value: T) {
    return this.insertAt(this._count, value)
  }

  shift() {
    return this.removeAt(0)
  }

  pop() {
    return this.removeAt(this._count - 1)
  }

  add(value: T) {
    return this.insertAt(this._count, value)
  }

  remove(value: T) {
    const index = this.indexOf(value)
    if (index == -1) return null
    return this.removeAt(index)
  }

  indexOf(value: T) {
    let previous = this._root as ItemValue<T>
    let current = previous.next

    let i = -1
    while (current) {
      previous = current
      current = current.next

      i++

      if (previous.value === value) return i
    }

    return -1
  }

  forEach(cb: (value: T, index: number) => void) {
    let next = this._root.next
    let i = 0
    while (next) {
      cb(next.value, i)
      next = next.next
      i++
    }
  }

  map<U>(cb: (value: T, index: number) => U) {
    const l = new List<U>()

    let next = this._root.next
    let i = 0
    while (next) {
      l.push(cb(next.value, i))
      next = next.next
      i++
    }

    return l
  }

  filter(cb: (value: T, index: number) => boolean) {
    const l = new List<T>()

    let next = this._root.next
    let i = 0
    while (next) {
      if (cb(next.value, i)) {
        l.push(next.value)
      }
      next = next.next
      i++
    }

    return l
  }

  clone() {
    const l = new List<T>()

    let next = this._root.next
    while (next) {
      l.push(next.value)
      next = next.next
    }

    return l
  }

  inverse() {
    let i = 0
    while (i < this._count) {
      this.unshift(this.removeAt(i) as T)
      i++
    }
  }

  toArray() {
    const arr = new Array<T>(this._count)

    let next = this._root.next
    let i = 0
    while (next) {
      arr[i] = next.value
      next = next.next
      i++
    }

    arr.values

    return arr
  }

  [Symbol.iterator](): Iterator<T> {
    return this.values()
  }

  // @ts-ignore
  values(): Iterator<T, null> {
    let current = this._root.next
    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.value
          current = current.next
          return {
            done: false,
            value
          }
        }

        return {
          done: true,
          // @ts-ignore
          value: null
        }
      }
    }
  }

}