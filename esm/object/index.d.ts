/**
 * Merge objects
 */
export declare function merge<T>(obj: any, ...objs: any[]): T;
/**
 * Create an object with only property keys
 */
export declare function expose<T>(obj: any, ...keys: string[]): T;
/**
 * Create a new object without listed property keys
 */
export declare function omit<T>(obj: any, ...keys: string[]): T;
/**
 * Flatten object to one level
 */
export declare function flat(obj: any): Record<string, any>;
/**
 * Transform a flatten object to a deflatten object
 */
export declare function deflat<T>(obj: any): T;
/**
 * Freeze object
 */
export declare function immutable<T>(obj: any): T;
/**
 * Clone an object
 */
export declare function clone<T>(obj: any): T;
/**
 * Do a clone with JSON.parse/JSON.stringify.
 */
export declare function deep_clone<T>(obj: any): T;
/**
 * Transform an KeyValue object into an array
 */
export declare function to_array<T>(obj: Record<string, T>): T[];
export * from "./argv";
export * from "./url";
