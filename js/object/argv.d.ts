export interface Parameters {
    a: string[];
    o: Record<string, string | boolean>;
}
export declare function parse(argv: string[]): Record<string, string | boolean>;
