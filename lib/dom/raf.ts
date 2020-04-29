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


export type Subscriber = [ string, (dt: number, now: number) => void ]

export class RAF {

  static subscribers: Subscriber[] = []
  static dt = 0
  static framerate = 16

  private static _now = performance.now();
  private static _lt = RAF._now;
  private static _elapsedInterval = 0;
  private static _raf = window.requestAnimationFrame(RAF._update)

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
    RAF._raf = window.requestAnimationFrame(RAF._update)

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
  static subscribe(id: string, fn: (dt: number, now: number) => void) {
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
    RAF._raf = window.requestAnimationFrame(RAF._update)
  }

  /**
   * Stop globally the RAF
   */
  static stop() {
    window.cancelAnimationFrame(RAF._raf)
  }
}