import { Dispatcher } from "./Dispatcher";

export interface EmitterEvent<T, K extends keyof T> {
  event: K;
  value: T[K];
}

export type EmitterCallback<T, K extends keyof T> = (
  event: EmitterEvent<T, K>
) => void;

export class Emitter<T> {
  private dispatchers: Partial<Record<keyof T, Dispatcher<any>>>;

  constructor() {
    this.dispatchers = {};
  }

  private getOrCreateDispatcher<K extends keyof T>(name: K) {
    this.dispatchers[name] = this.dispatchers[name] || new Dispatcher();
    return this.dispatchers[name]!;
  }

  on<K extends keyof T>(name: K, cb: EmitterCallback<T, K>) {
    this.getOrCreateDispatcher(name).on(cb);
  }

  once<K extends keyof T>(name: K, cb: EmitterCallback<T, K>) {
    this.getOrCreateDispatcher(name).once(cb);
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

  emit<K extends keyof T>(name: K, value: T[K]) {
    const dispatcher = this.dispatchers[name];
    if (dispatcher !== undefined) {
      dispatcher.dispatch(value);
    }
  }
}
