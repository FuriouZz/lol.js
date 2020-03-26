export class List {
    constructor(array) {
        this._root = {};
        this._count = 0;
        if (Array.isArray(array)) {
            for (let i = 0; i < array.length; i++) {
                this.add(array[i]);
            }
        }
    }
    get length() {
        return this._count;
    }
    insertAt(index, value) {
        const item = { value: value };
        let previous = this._root;
        let current = previous.next;
        // Fetch current at index
        let i = 0;
        while (i < index && current) {
            previous = current;
            current = current.next;
            i++;
        }
        if (previous.next)
            item.next = previous.next;
        previous.next = item;
        // Increment list count
        this._count++;
        return index;
    }
    removeAt(index) {
        let previous = this._root;
        let current = previous.next;
        // Fetch current at index
        let i = 0;
        while (i < index && current) {
            previous = current;
            current = current.next;
            i++;
        }
        if (!current)
            return null;
        previous.next = current.next;
        // Decrement list count
        this._count--;
        return current.value;
    }
    unshift(value) {
        return this.insertAt(0, value);
    }
    push(value) {
        return this.insertAt(this._count, value);
    }
    shift() {
        return this.removeAt(0);
    }
    pop() {
        return this.removeAt(this._count - 1);
    }
    add(value) {
        return this.insertAt(this._count, value);
    }
    remove(value) {
        const index = this.indexOf(value);
        if (index == -1)
            return null;
        return this.removeAt(index);
    }
    indexOf(value) {
        let previous = this._root;
        let current = previous.next;
        let i = -1;
        while (current) {
            previous = current;
            current = current.next;
            i++;
            if (previous.value === value)
                return i;
        }
        return -1;
    }
    has(value) {
        return this.indexOf(value) > -1;
    }
    forEach(cb) {
        let next = this._root.next;
        let i = 0;
        while (next) {
            cb(next.value, i);
            next = next.next;
            i++;
        }
    }
    map(cb) {
        const l = new List();
        let next = this._root.next;
        let i = 0;
        while (next) {
            l.push(cb(next.value, i));
            next = next.next;
            i++;
        }
        return l;
    }
    filter(cb) {
        const l = new List();
        let next = this._root.next;
        let i = 0;
        while (next) {
            if (cb(next.value, i)) {
                l.push(next.value);
            }
            next = next.next;
            i++;
        }
        return l;
    }
    clone() {
        const l = new List();
        let next = this._root.next;
        while (next) {
            l.push(next.value);
            next = next.next;
        }
        return l;
    }
    inverse() {
        let i = 0;
        while (i < this._count) {
            this.unshift(this.removeAt(i));
            i++;
        }
    }
    toArray() {
        const arr = new Array(this._count);
        let next = this._root.next;
        let i = 0;
        while (next) {
            arr[i] = next.value;
            next = next.next;
            i++;
        }
        arr.values;
        return arr;
    }
    [Symbol.iterator]() {
        return this.values();
    }
    values() {
        let current = this._root.next;
        return {
            [Symbol.iterator]: () => {
                return this.values();
            },
            next() {
                if (current) {
                    const value = current.value;
                    current = current.next;
                    return {
                        done: false,
                        value
                    };
                }
                return {
                    done: true,
                    value: null
                };
            }
        };
    }
    clear() {
        while (this.length > 0) {
            this.pop();
        }
    }
}
