import { PipeSync, PipeAsync } from ".";
export declare class PipeArray<T> {
    private async;
    pipeSync: PipeSync<T[]>;
    pipeAsync: PipeAsync<T[]>;
    constructor(items: T[], async?: boolean);
    filter(cb: (value: T, index: number, array: T[]) => boolean): this;
    sort(): this;
    shuffle(): this;
    inverse(): this;
    unique(): this;
    similarity(arr0: T[]): this;
    difference(arr0: T[]): this;
    value(): T[] | Promise<T[]>;
}
