import { Dispatcher } from "../dispatcher";
import { OrderedSet } from "./ordered-set";
export class Queue {
    constructor() {
        this.unresolved = [];
        this.items = new OrderedSet();
        this.onresolve = new Dispatcher();
    }
    pushFront(...keys) {
        for (const key of keys.reverse()) {
            this.items.insertAt(key, 0);
        }
        this.resolveDependencies();
        return this;
    }
    pushBack(...keys) {
        for (const key of keys) {
            this.items.add(key);
        }
        this.resolveDependencies();
        return this;
    }
    pushBefore(before, ...keys) {
        for (const key of keys.reverse()) {
            if (!this.items.has(before)) {
                this.unresolved.push({ key, relative: before, move: "before" });
            }
            else {
                const index = this.items.index(before);
                this.items.insertAt(key, index);
                this.resolveDependencies();
            }
            before = key;
        }
        return this;
    }
    pushAfter(after, ...keys) {
        for (const key of keys) {
            if (!this.items.has(after)) {
                this.unresolved.push({ key, relative: after, move: "after" });
            }
            else {
                const index = this.items.index(after) + 1;
                this.items.insertAt(key, index);
                this.resolveDependencies();
            }
            after = key;
        }
        return this;
    }
    swap(first, second) {
        if (this.items.has(first) && this.items.has(second)) {
            const i0 = this.items.index(first);
            const i1 = this.items.index(second);
            const imin = Math.min(i0, i1);
            const imax = Math.max(i0, i1);
            this.items.removeAt(imax);
            this.items.removeAt(imin);
            if (i0 === imin) {
                this.items.insertAt(second, i0);
                this.items.insertAt(first, i1);
            }
            else {
                this.items.insertAt(first, i1);
                this.items.insertAt(second, i0);
            }
            this.resolveDependencies();
        }
        else {
            this.unresolved.push({ key: first, relative: second, move: "swap" });
        }
        return this;
    }
    replace(replaced, ...keys) {
        if (!this.items.has(replaced)) {
            let prev;
            for (const key of keys) {
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
            for (const key of keys) {
                this.pushAfter(key, prev);
                prev = key;
            }
            this.items.remove(replaced);
            this.resolveDependencies();
        }
        return this;
    }
    remove(...keys) {
        for (const key of keys) {
            if (this.items.has(key)) {
                this.items.remove(key);
            }
            else {
                this.unresolved.push({ key: null, relative: key, move: "remove" });
            }
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
            if (!this.items.has(pending.relative)) {
                pendings.push(pending);
                continue;
            }
            if (pending.move === "before") {
                this.pushBefore(pending.relative, pending.key);
            }
            else if (pending.move === "after") {
                this.pushAfter(pending.relative, pending.key);
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
    toString() {
        return this.items['items'];
    }
}
