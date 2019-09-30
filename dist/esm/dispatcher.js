import { List } from "./list/index";
import { toIterable } from "./list/utils";
export class Dispatcher {
    constructor() {
        this.listeners = new List();
    }
    on(listener) {
        this.listeners.add({ once: false, fn: listener });
    }
    once(listener) {
        this.listeners.add({ once: true, fn: listener });
    }
    off(listener) {
        for (const l of toIterable(this.listeners)) {
            if (l.fn == listener) {
                this.listeners.remove(l);
                break;
            }
        }
    }
    dispatch(value) {
        for (const listener of toIterable(this.listeners)) {
            listener.fn(value);
            if (listener.once) {
                this.listeners.remove(listener);
            }
        }
    }
}
