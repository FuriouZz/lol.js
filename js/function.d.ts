/**
 * Scope a function inside another one. Prevent from binding.
 */
export declare function scope(fn: Function, context?: any): (...args: any[]) => any;
/**
 * Bind a list methods to the context
 */
export declare function bind(context: any, ...methods: string[]): void;
