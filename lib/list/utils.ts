import { List } from ".";

export function toIterable<T>(list: List<T>) : Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return toIterator(list)
    }
  }
}

export function toIterator<T>(list: List<T>) : Iterator<T> {
  let current = (list as any)._root.next

  return {
    next() {
      if (current) {
        let value = current.value
        current = current.next
        return {
          done: false,
          value: value
        }
      } else {
        return {
          done: true,
          value: null as any
        }
      }
    }
  }
}