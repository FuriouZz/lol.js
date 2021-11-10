interface Template2Options {
    open: string;
    close: string;
    body: string;
    defaultValue?: string;
}
/**
 * Interpolate string with the object
 */
export declare function template(string: string, obj?: any, regex?: (key: string) => RegExp): string;
/**
 * Interpolate string with the object
 */
export declare function template2(str: string, obj?: any, options?: Template2Options): string;
export declare function template3(str: string, obj?: Record<string, any>): any;
/**
 * Interpolate template with a list of arguments
 */
export declare function template4(tmpl: string, ...args: string[]): string;
export {};
