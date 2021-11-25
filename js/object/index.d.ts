/**
 * Merge objects
 */
export declare function merge<T>(obj: any, ...objs: any[]): T;
/**
 * Create an object with only property keys
 */
export declare function expose<T extends object, U = T>(obj: T, ...keys: (keyof T)[]): U;
/**
 * Create a new object without listed property keys
 */
export declare function omit<T extends object, U = Partial<T>>(obj: T, ...keys: (keyof T)[]): U;
/**
 * Flatten object to one level
 */
export declare function flat<T extends object, U = Record<string, any>>(obj: T): U;
/**
 * Transform a flatten object to a deflatten object
 */
export declare function deflat<T extends object>(obj: Record<string, any>): T;
/**
 * Freeze object
 */
export declare function immutable<T extends object>(obj: T): T;
/**
 * Clone an object
 */
export declare function clone<T extends object>(obj: T): T;
/**
 * Do a clone with JSON.parse/JSON.stringify.
 */
export declare function deep_clone<T extends object>(obj: T): T;
/**
 * Transform an KeyValue object into an array
 */
export declare function to_array<T>(obj: Record<string, T>): T[];
export * from "./argv";
export * from "./url";
