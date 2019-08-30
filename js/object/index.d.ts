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
export declare function clone<T>(obj: any): T;
export declare function deep_clone<T>(obj: any): T;
