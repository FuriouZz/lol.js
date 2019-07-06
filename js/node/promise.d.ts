export declare function promise<T>(callback: (resolve: (value: T | PromiseLike<T> | undefined) => void, reject: (reason: any) => void) => void): Promise<T>;
export declare function resolve<T>(value: T): Promise<T>;
