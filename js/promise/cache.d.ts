import { DeferredPromise } from ".";
export declare class Cache {
    items: Record<string, DeferredPromise<any>>;
    get<T>(key: string): DeferredPromise<T>;
    set<T>(key: string, resolve: () => T | Promise<T>): Promise<any>;
    create(key: string): DeferredPromise<any>;
    createBatch<T>(keys: string[]): DeferredPromise<T>[];
    createBatchByKey<T>(keys: string[]): Record<string, DeferredPromise<T>>;
    remove(key: string): void;
    removeBatch(keys: string[]): void;
    resolve<T>(key: string, value: T): void;
    resolveBatch<T>(items: Record<string, string | T>[], keys?: [string, string]): void;
    reject<T>(key: string, value: T): void;
    rejectBatch<T>(items: Record<string, string | T>[], keys?: [string, string]): void;
}
