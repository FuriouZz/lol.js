import { Dispatcher } from "../dispatcher";
export class Queue {
    constructor() {
        this.items = [];
        this.unresolved = [];
        this.onresolve = new Dispatcher();
    }
    indexOf(item) {
        return this.items.indexOf(item);
    }
    has(item) {
        return this.items.includes(item);
    }
    insert(...items) {
        this.items.push(...items);
        this.resolveDependencies();
    }
    insertAt(index, ...items) {
        this.items.splice(index, 0, ...items);
        this.resolveDependencies();
    }
    remove(...items) {
        for (const item of items) {
            if (this.has(item)) {
                const index = this.indexOf(item);
                this.removeAt(index);
            }
            else {
                this.unresolved.push({ key: null, relative: item, move: "remove" });
            }
        }
    }
    removeAt(index) {
        this.items.splice(index, 1);
        this.resolveDependencies();
    }
    before(before, ...keys) {
        for (const key of keys.reverse()) {
            if (!this.has(before)) {
                this.unresolved.push({ key, relative: before, move: "before" });
            }
            else {
                const index = this.indexOf(before);
                this.insertAt(index, key);
                this.resolveDependencies();
            }
            before = key;
        }
    }
    after(after, ...keys) {
        for (const key of keys) {
            if (!this.has(after)) {
                this.unresolved.push({ key, relative: after, move: "after" });
            }
            else {
                const index = this.indexOf(after) + 1;
                this.insertAt(index, key);
                this.resolveDependencies();
            }
            after = key;
        }
    }
    swap(first, second) {
        if (this.has(first) && this.has(second)) {
            const i0 = this.indexOf(first);
            const i1 = this.indexOf(second);
            const imin = Math.min(i0, i1);
            const imax = Math.max(i0, i1);
            this.removeAt(imax);
            this.removeAt(imin);
            if (i0 === imin) {
                this.insertAt(i0, second);
                this.insertAt(i1, first);
            }
            else {
                this.insertAt(i1, first);
                this.insertAt(i0, second);
            }
            this.resolveDependencies();
        }
        else {
            this.unresolved.push({ key: first, relative: second, move: "swap" });
        }
    }
    replace(replaced, ...items) {
        if (!this.has(replaced)) {
            let prev;
            for (const key of items) {
                if (prev) {
                    this.unresolved.push({ key, relative: prev, move: "after" });
                }
                else {
                    this.unresolved.push({ key, relative: replaced, move: "replace" });
                }
                prev = key;
            }
        }
        else {
            let prev = replaced;
            for (const key of items) {
                this.after(key, prev);
                prev = key;
            }
            this.remove(replaced);
            this.resolveDependencies();
        }
        return this;
    }
    resolveDependencies() {
        if (this.unresolved.length === 0)
            return;
        let pendings = [];
        while (this.unresolved.length > 0) {
            const pending = this.unresolved.shift();
            if (!pending)
                return;
            if (!this.has(pending.relative)) {
                pendings.push(pending);
                continue;
            }
            if (pending.move === "before") {
                this.before(pending.relative, pending.key);
            }
            else if (pending.move === "after") {
                this.after(pending.relative, pending.key);
            }
            else if (pending.move === "replace") {
                this.replace(pending.relative, pending.key);
            }
            else if (pending.move === "swap") {
                this.swap(pending.key, pending.relative);
            }
            else if (pending.move === "remove") {
                this.remove(pending.relative);
            }
            this.onresolve.dispatch(pending);
            this.unresolved.unshift(...pendings);
            pendings = [];
        }
        this.unresolved = pendings;
    }
    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }
    values() {
        return this.items.values();
    }
    keys() {
        return this.items.keys();
    }
    entries() {
        return this.items.entries();
    }
    filter(predicate, thisArg) {
        const q = new Queue();
        q.items = this.items.filter((value, index) => (predicate.call(thisArg, value, index, this)));
        return q;
    }
    map(predicate, thisArg) {
        const q = new Queue();
        q.items = this.items.map((value, index) => (predicate.call(thisArg, value, index, this)));
        return q;
    }
    forEach(callback, thisArg) {
        this.items.forEach((value, index) => (callback.call(thisArg, value, index, this)));
    }
}
