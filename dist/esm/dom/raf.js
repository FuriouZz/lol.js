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
const requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        // @ts-ignore
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
const cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        // @ts-ignore
        window.webkitCancelRequestAnimationFrame ||
        // @ts-ignore
        window.mozCancelRequestAnimationFrame ||
        // @ts-ignore
        window.oCancelRequestAnimationFrame ||
        // @ts-ignore
        window.msCancelRequestAnimationFrame;
})();
export class RAF {
    /**
     * Run all subscribers
     */
    static _update() {
        RAF._now = Date.now();
        RAF.dt = RAF._now - RAF._lt;
        RAF._elapsedInterval += RAF.dt;
        if (RAF._elapsedInterval >= RAF.framerate) {
            RAF._elapsedInterval = 0;
            RAF._processUpdate();
        }
        RAF._lt = RAF._now;
        RAF._raf = requestAnimFrame(RAF._update);
    }
    static _processUpdate() {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            var [_, subscriber] = RAF.subscribers[i];
            // execute handler
            subscriber();
        }
    }
    /**
     * Register a new subscriber
     */
    static subscribe(id, fn) {
        RAF.subscribers.push([id, fn]);
    }
    /**
    * Unregister a subscriber
    */
    static unsubscribe(id) {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            // if id matches, removes
            if (RAF.subscribers[i][0] === id) {
                RAF.subscribers.splice(i, 1);
            }
        }
    }
    /**
     * Start globally the RAF
     */
    static start() {
        RAF._raf = requestAnimFrame(RAF._update);
    }
    /**
     * Stop globally the RAF
     */
    static stop() {
        cancelRequestAnimFrame(RAF._raf);
    }
}
RAF.subscribers = [];
RAF.dt = 0;
RAF.framerate = 16;
RAF._now = Date.now();
RAF._lt = RAF._now;
RAF._elapsedInterval = 0;
RAF._raf = requestAnimFrame(RAF._update);
