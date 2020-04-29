/// <reference lib="dom" />
export class RAF {
    /**
     * Run all subscribers
     */
    static _update() {
        RAF._now = performance.now();
        RAF.dt = RAF._now - RAF._lt;
        RAF._elapsedInterval += RAF.dt;
        if (RAF._elapsedInterval >= RAF.framerate) {
            RAF._elapsedInterval = 0;
            RAF._processUpdate();
        }
        RAF._lt = RAF._now;
        RAF._raf = window.requestAnimationFrame(RAF._update);
    }
    static _processUpdate() {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            var [_, subscriber] = RAF.subscribers[i];
            // execute handler
            subscriber(RAF.dt, RAF._now);
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
        RAF._raf = window.requestAnimationFrame(RAF._update);
    }
    /**
     * Stop globally the RAF
     */
    static stop() {
        window.cancelAnimationFrame(RAF._raf);
    }
}
RAF.subscribers = [];
RAF.dt = 0;
RAF.framerate = 16;
RAF._now = performance.now();
RAF._lt = RAF._now;
RAF._elapsedInterval = 0;
RAF._raf = window.requestAnimationFrame(RAF._update);
