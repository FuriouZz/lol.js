export interface DeferredPromise<T> {
  promise: Promise<T>
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (value?: any) => void
}

interface DeferredPromiseOptional<T> {
  promise: Promise<T>
  resolve?: (value?: T | PromiseLike<T>) => void
  reject?: (value?: any) => void
}

export function promise<T>(callback: (resolve: (value: T | PromiseLike<T> | undefined) => void, reject: (reason: any) => void) => void) {
  return new Promise<T>(callback)
}

export function resolve<T>(value: T) {
  return new Promise<T>((r) => r(value))
}

export function defer<T>(): DeferredPromise<T> {
  const def: DeferredPromiseOptional<T> = {
    promise: new Promise((resolve, reject) => {
      def.resolve = resolve
      def.reject = reject
    })
  }

  return def as DeferredPromise<T>
}