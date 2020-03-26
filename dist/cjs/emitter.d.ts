export interface EmitterListener {
    once: boolean;
    cb: (value?: any) => void;
}
export declare class Emitter<T> {
    private listeners;
    private getOrCreateListener;
    /**
     * Listen from native
     * eg.: "WebNative.on('message', msg => console.log(msg))"
     */
    on<K extends keyof T>(name: K, cb: (value?: T[K]) => void): void;
    /**
     * Listen from native, once
     * eg.: "WebNative.once('message', msg => console.log(msg))"
     */
    once<K extends keyof T>(name: K, cb: (value?: T[K]) => void): void;
    /**
     * Stop listening native event
     * eg.: "WebNative.off('message', myListener)"
     */
    off<K extends keyof T>(name: K, cb: (value?: T[K]) => void): void;
    /**
     * Called by the native to dispatch an event
     */
    dispatch<K extends keyof T>(name: K, value?: T[K]): void;
}
