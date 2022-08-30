import { Dispatcher } from "./Dispatcher.js";

export interface EmitterEvent<T, K extends keyof T> {
  event: K;
  value: T[K];
}

export type EmitterCallback<T, K extends keyof T> = (
  event: EmitterEvent<T, K>
) => void;

export class Emitter<T> {
  private dispatchers: {
    [K in keyof T]?: Dispatcher<EmitterEvent<T, K>>
  }

  constructor() {
    this.dispatchers = {};
  }

  private getOrCreateDispatcher<K extends keyof T>(name: K) {
    this.dispatchers[name] = this.dispatchers[name] || new Dispatcher();
    return this.dispatchers[name]!;
  }

  on<K extends keyof T>(name: K, cb: EmitterCallback<T, K>, caller?: object) {
    this.getOrCreateDispatcher(name).on(cb, caller);
  }

  once<K extends keyof T>(name: K, cb: EmitterCallback<T, K>, caller?: object) {
    this.getOrCreateDispatcher(name).once(cb, caller);
  }

  off<K extends keyof T>(name: K, cb: EmitterCallback<T, K>) {
    const dispatcher = this.dispatchers[name];
    if (dispatcher !== undefined) {
      dispatcher.off(cb);
    }
  }

  removeListeners() {
    for (const d in this.dispatchers) {
      if (this.dispatchers[d]) {
        this.dispatchers[d]!.removeListeners();
      }
    }
  }

  emit<K extends keyof T>(event: K, value: T[K]) {
    const dispatcher = this.dispatchers[event];
    if (dispatcher !== undefined) {
      dispatcher.dispatch({
        event,
        value,
      });
    }
  }
}
