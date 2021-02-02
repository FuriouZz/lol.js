export class OrderedSet {
    constructor() {
        this.items = [];
    }
    get size() {
        return this.items.length;
    }
    add(v) {
        if (!this.has(v)) {
            this.items.push(v);
        }
    }
    insertAt(v, index) {
        if (!this.has(v)) {
            this.items.splice(index, 0, v);
        }
    }
    index(v) {
        return this.items.indexOf(v);
    }
    get(index) {
        return this.items[index];
    }
    has(v) {
        return this.items.indexOf(v) > -1;
    }
    remove(v) {
        const index = this.items.indexOf(v);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    removeAt(index) {
        this.items.splice(index, 1);
    }
    clear() {
        this.items = [];
    }
    shift() {
        return this.items.shift();
    }
    pop() {
        return this.items.pop();
    }
    join(separator) {
        return this.items.join(separator);
    }
    [Symbol.iterator]() {
        return this.values();
    }
    values() {
        const len = this.size;
        const items = this.items.slice(0);
        let index = -1;
        return {
            next() {
                if (index + 1 < len) {
                    index++;
                    const value = items[index];
                    return {
                        done: false,
                        value: value
                    };
                }
                else {
                    return {
                        done: true,
                        // @ts-ignore
                        value: null,
                    };
                }
            }
        };
    }
    entries() {
        const len = this.size;
        const items = this.items.slice(0);
        let index = -1;
        return {
            next() {
                if (index + 1 < len) {
                    index++;
                    const value = items[index];
                    return {
                        done: false,
                        value: [index, value]
                    };
                }
                else {
                    return {
                        done: true,
                        // @ts-ignore
                        value: null,
                    };
                }
            }
        };
    }
    forEach(cb) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            cb(item, i, this);
        }
    }
    map(cb) {
        const set = new OrderedSet();
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            set.add(cb(item, i, this));
        }
        return set;
    }
    filter(predicate) {
        const set = new OrderedSet();
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (predicate(item, i, this)) {
                set.add(item);
            }
        }
        return set;
    }
    clone() {
        const set = new OrderedSet();
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            set.add(item);
        }
        return set;
    }
}
