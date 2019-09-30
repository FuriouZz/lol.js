export interface PipeAsync<S> {
    pipe<U>(callback: (v: S, ...parameters: any[]) => U, ...parameters: any[]): PipeAsync<U>;
    value(): Promise<S>;
}
export interface PipeSync<S> {
    pipe<U>(callback: (v: S, ...parameters: any[]) => U, ...parameters: any[]): PipeSync<U>;
    value(): S;
}
export declare function pipe_async<T>(value: T): PipeAsync<T>;
export declare function pipe_sync<T>(value: T): PipeSync<T>;
