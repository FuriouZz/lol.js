export declare type LoadableData = (() => Promise<any>) | (() => any) | Promise<any>;
export declare class Loadable {
    private _promises;
    private _all;
    add(data: LoadableData): void;
    push(data: LoadableData): void;
    finish(): Promise<any[]>;
}
