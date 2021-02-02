/**
 * Shuffle an array
 */
export function shuffle<T>(arr: T[]) {
  let length = arr.length
  let tmp: T, rand: number

  while (length != 0)
  {
    rand = Math.floor(Math.random() * length)
    length--
    tmp         = arr[length]
    arr[length] = arr[rand]
    arr[rand]   = tmp
  }

  return arr
}

export const randomize = shuffle

/**
 * Sort an array
 */
export function sort<T>(arr: T[]) {
  let currIndex = -1
  let tmp: T[] = []
  let tm: T

  for (let i = 0, ilen = arr.length; i < ilen; i++) {

    currIndex = tmp.length
    tmp[currIndex] = arr[i]

    for (let j = 0, jlen = tmp.length; j < jlen; j++) {
      if (tmp[currIndex] < tmp[j]) {
        tm             = tmp[j]
        tmp[j]         = tmp[currIndex]
        tmp[currIndex] = tm
      }
    }

  }

  return tmp
}

/**
 * Sort array relative to object key
 */
export function sortByKey<T>(arr: Record<string, T>[], key: string) {
  let currIndex = -1
  let tmp: Record<string, T>[]  = []
  let tm: Record<string, T>

  for (let i = 0, ilen = arr.length; i < ilen; i++) {

    currIndex = tmp.length
    tmp[currIndex] = arr[i]

    for (let j = 0, jlen = tmp.length; j < jlen; j++) {
      if (tmp[currIndex][key] < tmp[j][key]) {
        tm             = tmp[j]
        tmp[j]         = tmp[currIndex]
        tmp[currIndex] = tm
      }
    }

  }

  return tmp
}

/**
 * Inverse array
 */
export function inverse<T>(arr: T[]) {
  let tmp: T[] = []

  for(let ilen = arr.length-1, i = ilen; i >= 0; i--) {
    tmp.push(arr[i])
  }

  return tmp
}

/**
 * Remove duplicates
 */
export function unique<T>(arr: T[]) {
  let tmp: T[] = []

  for (let i = 0, ilen = arr.length; i < ilen; i++) {
    if (tmp.indexOf(arr[i]) === -1) {
      tmp.push(arr[i])
    }
  }

  return tmp
}

/**
 * Split array into chunks
 */
export function chunk<T>(array: T[], count: number) {
  const arr: T[][] = []

  for (var i = 0, ilen = array.length; i < ilen; i += count) {
    arr.push( array.slice(i, i+count) )
  }

  return arr
}

/**
 * Generate an array
 */
export function generate<T>(callback: (index: number, stop_running: () => void, previous: T) => T) {
  const arr:T[] = []

  let i = 0
  let running = true
  let previous: T|unknown

  function stop_running() { running = false }

  while (running) {
    previous = callback(i, stop_running, previous as T)
    arr.push( previous as T )
    i++
  }

  return arr
}

/**
 * Generate enumeration
 */
export function generate_enumeration(count: number = 10, random = false) {
  return generate<number>((index, stop_running, previous) => {
    if (index+1 == count) stop_running()
    return random ? Math.random() : index
  })
}


/**
 * Find similar elements between two arrays
 */
export function similarity<T>(arr0: T[], arr1: T[]) {
  const arr: T[] = []

  for (let i = 0; i < arr0.length; i++) {
    const el0 = arr0[i];
    for (let j = 0; j < arr1.length; j++) {
      const el1 = arr1[j];
      if (el0 == el1) arr.push(el0)
    }
  }

  return arr
}

/**
 * Find different elements between two arrays
 */
export function difference<T>(arr0: T[], arr1: T[]) {
  const arr: T[] = []

  for (let i = 0; i < arr0.length; i++) {
    const el0 = arr0[i];
    if (arr1.indexOf(el0) == -1) arr.push( el0 )
  }

  return arr
}

/**
 * Transform an array into an KeyValue object
 */
export function to_record<T>(arr: T[], cb: (item: T) => string) : Record<string, T> {
  const record: Record<string, T> = {}

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = cb(item)
    record[key] = item
  }

  return record
}

/**
 * Transform an array into an KeyValue object
 */
export const to_object = to_record

/**
 * Multi dimensional array to one
 */
export function flat<T>(arr: T[][]) : T[] {
  return ([] as T[]).concat(...arr)
}

/**
 * Select an item into an array
 */
export function select<T>(arr: T[], index: number) : T {
  return arr[index]
}

/**
 * Select a random item into an array
 */
export function random<T>(arr: T[]) : T {
  const index = Math.floor(Math.random() * arr.length)
  return select(arr, index)
}

export * from "./iterator"