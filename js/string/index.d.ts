/**
 * Remove white spaces at the beginning and at the end of the string
 */
export declare function trimWhiteSpace(str: string): string;
/**
 * Append or preprend a character to a string
 */
export declare function pad(str: string, limit?: number, char?: string, insertAfter?: boolean): string;
/**
 * Slug string
 */
export declare function toSlug(str: string): string;
/**
 * Camel case
 */
export declare function toCamelCase(str: string): string;
/**
 * Slugify a string and replace tiret to underscore
 */
export declare function toUnderscore(str: string): string;
/**
 * Capitalize
 */
export declare function toCapitalize(str: string): string;
/**
 * Capitalize first letter
 */
export declare function toUCFirst(str: string): string;
