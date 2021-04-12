import { Dispatcher } from "../dispatcher";
export interface QueueUnresolvedEntry<T> {
    key: T;
    relative: T;
    move: "before" | "after" | "replace" | "swap" | "remove";
}
export declare class Queue<T> {
    items: T[];
    unresolved: QueueUnresolvedEntry<T>[];
    onresolve: Dispatcher<QueueUnresolvedEntry<T>>;
    indexOf(item: T): number;
    has(item: T): boolean;
    insert(...items: T[]): void;
    insertAt(index: number, ...items: T[]): void;
    remove(...items: T[]): void;
    removeAt(index: number): void;
    before(before: T, ...keys: T[]): void;
    after(after: T, ...keys: T[]): void;
    swap(first: T, second: T): void;
    replace(replaced: T, ...items: T[]): this;
    resolveDependencies(): void;
    [Symbol.iterator](): IterableIterator<T>;
    values(): IterableIterator<T>;
    keys(): IterableIterator<number>;
    entries(): IterableIterator<[number, T]>;
    filter<S extends T>(predicate: (value: T, index: number, array: Queue<T>) => value is S): Queue<S>;
    filter(predicate: (value: T, index: number, array: Queue<T>) => unknown, thisArg?: any): Queue<T>;
    map<U>(predicate: (value: T, index: number, array: Queue<T>) => U, thisArg?: any): Queue<U>;
    forEach(callback: (value: T, index: number, array: Queue<T>) => void, thisArg?: any): void;
}
