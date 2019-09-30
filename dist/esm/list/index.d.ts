interface ItemValueOptional<T> {
    value?: T;
    next?: ItemValue<T>;
}
interface ItemValue<T> extends ItemValueOptional<T> {
    value: T;
}
export declare class List<T> {
    protected _root: ItemValueOptional<T>;
    protected _count: number;
    constructor(array?: T[]);
    readonly length: number;
    insertAt(index: number, value: T): number;
    removeAt(index: number): T | null;
    unshift(value: T): number;
    push(value: T): number;
    shift(): T | null;
    pop(): T | null;
    add(value: T): number;
    remove(value: T): T | null;
    indexOf(value: T): number;
    forEach(cb: (value: T, index: number) => void): void;
    map<U>(cb: (value: T, index: number) => U): List<U>;
    filter(cb: (value: T, index: number) => boolean): List<T>;
    clone(): List<T>;
    inverse(): void;
    toArray(): T[];
}
export {};