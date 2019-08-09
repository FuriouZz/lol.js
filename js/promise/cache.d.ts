import { DeferredPromise } from ".";
export interface CacheItem<T> {
    item?: T;
    promise: Promise<T>;
    resolve: (item: T) => void;
}
export declare class Cache<T> {
    items: Record<string, DeferredPromise<T>>;
    get(key: string): DeferredPromise<T>;
    set(key: string, resolve: () => T | Promise<T>): Promise<T>;
    create(key: string): DeferredPromise<T>;
    createBatch(keys: string[], to_object?: boolean): DeferredPromise<T>[];
    createBatchByKey(keys: string[]): Record<string, DeferredPromise<T>>;
    remove(key: string): void;
    removeBatch(keys: string[]): void;
    resolve(key: string, value: T): void;
    resolveBatch(items: Record<string, string | T>[], keys?: [string, string]): void;
    reject(key: string, value: T): void;
    rejectBatch(items: Record<string, string | T>[], keys?: [string, string]): void;
}
