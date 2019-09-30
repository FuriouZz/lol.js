export interface DeferredPromise<T> {
    promise: Promise<T>;
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (value?: any) => void;
}
export declare function promise<T>(callback: (resolve: (value: T | PromiseLike<T> | undefined) => void, reject: (reason: any) => void) => void): Promise<T>;
export declare function resolve<T>(value: T): Promise<T>;
export declare function defer<T>(): DeferredPromise<T>;
export declare function defer_all<T>(promises: DeferredPromise<T>[]): Promise<T[]>;
