/// <reference lib="dom" />
/**
 * raf.js
 *
 * Global RequestAnimationFrame
 *
 * ----------------------------
 *
 * use example
 *
 * var RAF = require('./libs/raf)'
 *
 * RAF.subscribe( 'mySubscriberId', mySubscriberFn )
 * RAF.unsubscribe( 'mySubscriberId' )
 * RAF.start()
 * RAF.stop()
 */
export declare type Subscriber = [string, (dt: number, now: number) => void];
export declare class RAF {
    static subscribers: Subscriber[];
    static dt: number;
    static framerate: number;
    private static _now;
    private static _lt;
    private static _elapsedInterval;
    private static _raf;
    /**
     * Run all subscribers
     */
    private static _update;
    private static _processUpdate;
    /**
     * Register a new subscriber
     */
    static subscribe(id: string, fn: (dt: number, now: number) => void): void;
    /**
    * Unregister a subscriber
    */
    static unsubscribe(id: string): void;
    /**
     * Start globally the RAF
     */
    static start(): void;
    /**
     * Stop globally the RAF
     */
    static stop(): void;
}
