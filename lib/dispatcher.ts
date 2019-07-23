import { List } from "./list";
import { toIterable } from "./list/utils";

export type DispatcherListener<T> = (value?: T) => void

interface ListenerObject<T> {
  once: boolean,
  fn: DispatcherListener<T>
}

export class Dispatcher<T> {

  listeners = new List<ListenerObject<T>>()

  on(listener: DispatcherListener<T>) {
    this.listeners.add({ once: false, fn: listener })
  }

  once(listener: DispatcherListener<T>) {
    this.listeners.add({ once: true, fn: listener })
  }

  off(listener: DispatcherListener<T>) {
    for (const l of toIterable(this.listeners)) {
      if (l.fn == listener) {
        this.listeners.remove(l)
        break
      }
    }
  }

  dispatch(value?: T) {
    for (const listener of toIterable(this.listeners)) {
      listener.fn(value)
      if (listener.once) {
        this.listeners.remove(listener)
      }
    }
  }

}