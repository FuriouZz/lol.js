interface Pipe<S> {
    pipe<U>(callback: (v: S) => U, ...parameters: any[]): Pipe<U>;
    value(): Promise<S>;
}
export declare function pipe<T>(value: T): Pipe<T>;
export {};
