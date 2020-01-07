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
    window.msCancelRequestAnimationFrame
})();

export type Subscriber = [ string, (dt: number, now: number) => void ]

export class RAF {

  static subscribers: Subscriber[] = []
  static dt = 0
  static framerate = 16

  private static _now = Date.now();
  private static _lt = RAF._now;
  private static _elapsedInterval = 0;
  private static _raf = requestAnimFrame(RAF._update)

  /**
   * Run all subscribers
   */
  private static _update() {

    RAF._now = performance.now()

    RAF.dt = RAF._now - RAF._lt

    RAF._elapsedInterval += RAF.dt

    if (RAF._elapsedInterval >= RAF.framerate) {
      RAF._elapsedInterval = 0
      RAF._processUpdate()
    }

    RAF._lt = RAF._now
    RAF._raf = requestAnimFrame(RAF._update)

  }

  private static _processUpdate() {

    for (var i = 0; i < RAF.subscribers.length; i++) {
      var [ _, subscriber ] = RAF.subscribers[i]
      // execute handler
      subscriber(RAF.dt, RAF._now)
    }

  }

  /**
   * Register a new subscriber
   */
  static subscribe(id: string, fn: () => void) {
    RAF.subscribers.push([id, fn])
  }

  /**
  * Unregister a subscriber
  */
  static unsubscribe(id: string) {

    for (var i = 0; i < RAF.subscribers.length; i++) {
      // if id matches, removes
      if (RAF.subscribers[i][0] === id) {
        RAF.subscribers.splice(i, 1)
      }
    }

  }

  /**
   * Start globally the RAF
   */
  static start() {
    RAF._raf = requestAnimFrame(RAF._update)
  }

  /**
   * Stop globally the RAF
   */
  static stop() {
    cancelRequestAnimFrame(RAF._raf)
  }
}