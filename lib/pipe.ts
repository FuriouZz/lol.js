interface Pipe<S> {
  pipe<U>(callback: (v: S) => U, ...parameters: any[]) : Pipe<U>
  value() : Promise<S>
}

function _pipe<T, S>(value: T | Promise<T>, action: (v: T, ...parameters: any[]) => S | Promise<S>, parameters?: any[]) : Pipe<S> {
  parameters = parameters || []

  const promise = new Promise<S>((resolve) => {
    if (value instanceof Promise) {
      value.then((newValue) => {
        resolve(action(newValue, ...parameters))
      })
    } else {
      resolve(action(value, ...parameters))
    }
  })

  return {
    pipe<U>(callback: (v: S) => U, ...parameters: any[]) {
      return _pipe(promise, callback, ...parameters)
    },

    value: () => promise
  }
}

export function pipe<T>(value: T) {
  return _pipe(value, (v) => v)
}