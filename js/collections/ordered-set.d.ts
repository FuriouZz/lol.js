export declare class OrderedSet<T> {
    private items;
    get size(): number;
    add(v: T): void;
    insertAt(v: T, index: number): void;
    index(v: T): number;
    get(index: number): T;
    has(v: T): boolean;
    remove(v: T): void;
    removeAt(index: number): void;
    clear(): void;
    shift(): T | undefined;
    pop(): T | undefined;
    join(separator?: string): string;
    [Symbol.iterator](): Iterator<T>;
    values(): Iterator<T>;
    entries(): Iterator<[number, T]>;
    forEach(cb: (item: T, index: number, set: OrderedSet<T>) => void): void;
    map<U>(cb: (item: T, index: number, set: OrderedSet<T>) => U): OrderedSet<U>;
    filter(predicate: (item: T, index: number, set: OrderedSet<T>) => unknown): OrderedSet<T>;
    clone(): OrderedSet<T>;
}
