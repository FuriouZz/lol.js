import { DeferredPromise, defer } from ".";

export interface CacheItem<T> {
  item?: T
  promise: Promise<T>
  resolve: (item: T) => void
}

export class Cache<T> {

  items: Record<string, DeferredPromise<T>> = {}

  get( key: string ) {
    return this.items[key]
  }

  async set( key: string, resolve: () => T | Promise<T> ) {
    if (this.items[key]) return this.items[key].promise

    const d = this.create( key )
    d.resolve( await resolve() )

    return d.promise
  }

  create( key: string ) {
    if (this.items[key]) return this.items[key]
    return this.items[key] = defer()
  }

  createBatch( keys: string[], to_object = false ) {
    let records: DeferredPromise<T>[] = []

    for (let i = 0; i < keys.length; i++) {
      records.push( this.create(keys[i]) )
    }

    return records
  }

  createBatchByKey( keys: string[] ) {
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

  resolve( key: string, value: T ) {
    if (!this.items[key]) {
      throw new Error(`[Cache] No item with key "${key}" found`)
    }

    this.items[key].resolve( value )
  }

  resolveBatch( items: Record<string, string|T>[], keys: [string, string] = [ 'key', 'value' ] ) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this.resolve( item[keys[0]] as string, item[keys[1]] as T )
    }
  }

  reject( key: string, value: T ) {
    if (!this.items[key]) {
      throw new Error(`[Cache] No item with key "${key}" found`)
    }

    this.items[key].reject( value )
  }

  rejectBatch( items: Record<string, string|T>[], keys: [string, string] = [ 'key', 'value' ] ) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this.reject( item[keys[0]] as string, item[keys[1]] as T )
    }
  }

}