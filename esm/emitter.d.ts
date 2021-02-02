export interface EmitterListener<K = any, V = any> {
    once: boolean;
    cb: EmitterCallback<K, V>;
}
export interface EmitterEvent<K = string, V = any> {
    event: K;
    value: V;
}
export declare type EmitterCallback<K = string, V = any> = (event: EmitterEvent<K, V>) => void;
export declare class Emitter<T = any> {
    private listeners;
    private getOrCreateListener;
    /**
     * Listen from native
     */
    on<K extends keyof T>(name: K, cb: EmitterCallback<K, T[K]>): void;
    /**
     * Listen from native, once
     */
    once<K extends keyof T>(name: K, cb: EmitterCallback<K, T[K]>): void;
    /**
     * Stop listening native event
     */
    off<K extends keyof T>(name: K, cb: EmitterCallback<K, T[K]>): void;
    /**
     * Called by the native to dispatch an event
     */
    dispatch<K extends keyof T>(name: K, value?: T[K]): void;
}
