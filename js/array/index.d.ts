/**
 * Shuffle an array
 */
export declare function shuffle<T>(arr: T[]): T[];
export declare const randomize: typeof shuffle;
/**
 * Sort an array
 */
export declare function sort<T>(arr: T[]): T[];
/**
 * Sort array relative to object key
 */
export declare function sortByKey<T>(arr: Record<string, T>[], key: string): Record<string, T>[];
/**
 * Inverse array
 */
export declare function inverse<T>(arr: T[]): T[];
/**
 * Remove duplicates
 */
export declare function unique<T>(arr: T[]): T[];
/**
 * Split array into chunks
 */
export declare function chunk<T>(array: T[], count: number): T[][];
/**
 * Generate an array
 */
export declare function generate<T>(callback: (index: number, stop_running: () => void, previous: T) => T): T[];
/**
 * Generate enumeration
 */
export declare function generate_enumeration(count?: number, random?: boolean): number[];
/**
 * Find similar elements between two arrays
 */
export declare function similarity<T>(arr0: T[], arr1: T[]): T[];
/**
 * Find different elements between two arrays
 */
export declare function difference<T>(arr0: T[], arr1: T[]): T[];
/**
 * Transform an array into an KeyValue object
 */
export declare function to_record<T>(arr: T[], cb: (item: T) => string): Record<string, T>;
/**
 * Transform an array into an KeyValue object
 */
export declare const to_object: typeof to_record;
/**
 * Multi dimensional array to one
 */
export declare function flat<T>(arr: T[][]): T[];
/**
 * Select an item into an array
 */
export declare function select<T>(arr: T[], index: number): T;
/**
 * Select a random item into an array
 */
export declare function random<T>(arr: T[]): T;
