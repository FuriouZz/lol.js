export declare class OrderedSet<T> {
    private items;
    readonly size: number;
    add(v: T): void;
    index(v: T): number;
    get(index: number): T;
    has(v: T): boolean;
    remove(v: T): void;
    clear(): void;
    shift(): T | undefined;
    pop(): T | undefined;
    [Symbol.iterator](): Iterator<T>;
    values(): Iterator<T>;
    entries(): Iterator<[number, T]>;
    forEach(cb: (item: T, index: number, set: OrderedSet<T>) => void): void;
    map<U>(cb: (item: T, index: number, set: OrderedSet<T>) => U): OrderedSet<U>;
    clone(): OrderedSet<T>;
}
