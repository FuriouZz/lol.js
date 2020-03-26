import { List } from "./list";
export declare type DispatcherListener<T> = (value?: T) => void;
interface ListenerObject<T> {
    once: boolean;
    fn: DispatcherListener<T>;
}
export declare class Dispatcher<T> {
    listeners: List<ListenerObject<T>>;
    on(listener: DispatcherListener<T>): void;
    once(listener: DispatcherListener<T>): void;
    off(listener: DispatcherListener<T>): void;
    dispatch(value?: T): void;
}
export {};
