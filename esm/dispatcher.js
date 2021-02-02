import { List } from "./collections/list";
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
        for (const l of this.listeners) {
            if (l.fn == listener) {
                this.listeners.remove(l);
                break;
            }
        }
    }
    dispatch(value) {
        for (const listener of this.listeners) {
            listener.fn(value);
            if (listener.once) {
                this.listeners.remove(listener);
            }
        }
    }
}
