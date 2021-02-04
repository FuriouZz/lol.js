export declare type RAFListener = (dt: number, now: number) => void;
export declare class RAF {
    private static _listeners;
    private static _framerate;
    private static _deltaTime;
    private static _time;
    private static _lt;
    private static _elapsedInterval;
    private static _raf;
    private static _running;
    static get time(): number;
    static get deltaTime(): number;
    static getFramerate(): number;
    static setFramerate(value: number): void;
    private static _update;
    private static _processUpdate;
    static add(listener: RAFListener, id?: string): string;
    static delete(listenerOrId: RAFListener | string): void;
    static start(): void;
    static stop(): void;
}
