/**
 * Scope a function inside another one. Prevent from binding.
 */
export declare function scope<R>(fn: (...args: any[]) => R, context?: any): (...args: any[]) => R;
/**
 * Bind a list methods to the context
 */
export declare function bind<T extends string>(context: any, ...methods: T[]): void;
