interface Template2Options {
    open: string;
    close: string;
    body: string;
}
/**
 * Interpolate string with the object
 */
export declare function template(string: string, obj?: any, regex?: (key: string) => RegExp): string;
/**
 * Interpolate string with the object
 */
export declare function template2(string: string, obj?: any, options?: Template2Options): string;
export {};
