import { DeferredPromise, defer } from "./index";

export class Cache {

  items: Record<string, DeferredPromise<any>> = {}

  get<T>( key: string ) {
    return this.items[key] as DeferredPromise<T>
  }

  async set<T>( key: string, resolve: (() => T | Promise<T>) | T | Promise<T> ) {
    if (this.items[key]) return this.items[key].promise as Promise<T>

    const d = this.create( key )

    if (typeof resolve == 'function') {
      const res = resolve as () => T | Promise<T>
      d.resolve( await res() )
    } else {
      d.resolve( resolve )
    }

    return d.promise as Promise<T>
  }

  create( key: string ) {
    if (this.items[key]) return this.items[key]
    return this.items[key] = defer()
  }

  createBatch<T>( keys: string[] ) {
    let records: DeferredPromise<T>[] = []

    for (let i = 0; i < keys.length; i++) {
      records.push( this.create(keys[i]) )
    }

    return records
  }

  createBatchByKey<T>( keys: string[] ) {
    let records: Record<string, DeferredPromise<T>> = {}

    for (let i = 0; i < keys.length; i++) {
      records[keys[i]] = this.create(keys[i])
    }

    return records
  }

  remove(key: string) {
    delete this.items[key]
  }

  removeBatch( keys: string[] ) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      this.remove( key )
    }
  }

  resolve<T>( key: string, value: T ) {
    if (!this.items[key]) {
      throw new Error(`[Cache] No item with key "${key}" found`)
    }

    this.items[key].resolve( value )
  }

  resolveBatch<T>( items: Record<string, string|T>[], keys: [string, string] = [ 'key', 'value' ] ) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this.resolve( item[keys[0]] as string, item[keys[1]] as T )
    }
  }

  reject<T>( key: string, value: T ) {
    if (!this.items[key]) {
      throw new Error(`[Cache] No item with key "${key}" found`)
    }

    this.items[key].reject( value )
  }

  rejectBatch<T>( items: Record<string, string|T>[], keys: [string, string] = [ 'key', 'value' ] ) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this.reject( item[keys[0]] as string, item[keys[1]] as T )
    }
  }

}