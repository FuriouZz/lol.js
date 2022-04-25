export type DispatcherListener<T> = (value?: T) => void;

interface ListenerObject<T> {
  once: boolean;
  fn: DispatcherListener<T>;
  caller?: object;
}

export class Dispatcher<T> {
  private listeners: ListenerObject<T>[];

  constructor() {
    this.listeners = [];
  }

  on(listener: DispatcherListener<T>, caller?: object) {
    this.listeners.push({ once: false, fn: listener, caller });
    return () => this.off(listener);
  }

  once(listener: DispatcherListener<T>, caller?: object) {
    this.listeners.push({ once: true, fn: listener, caller });
    return () => this.off(listener);
  }

  off(listener: DispatcherListener<T>) {
    const index = this.listeners.findIndex((l) => l.fn === listener);
    if (index === -1) return;
    this.listeners.splice(index, 1);
  }

  removeListeners() {
    const listeners = this.listeners.slice(0);
    for (const listener of listeners) {
      this.off(listener.fn);
    }
  }

  dispatch(value: T) {
    const listeners = this.listeners.slice(0);
    for (const listener of listeners) {
      listener.fn.call(listener.caller, value);
      if (listener.once) {
        this.off(listener.fn);
      }
    }
  }
}
