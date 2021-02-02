export interface DeferredPromise<T> {
  promise: Promise<T>
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (value?: any) => void
}

export function defer<T>(): DeferredPromise<T> {
  const def: Partial<DeferredPromise<T>> = {}
  def.promise = new Promise<T>(function (resolve, reject) {
    // @ts-ignore
    def.resolve = resolve;
    def.reject = reject;
  })
  return def as DeferredPromise<T>
}

export function defer_all<T>( promises: DeferredPromise<T>[] ) {
  return Promise.all(promises.map(p => p.promise))
}