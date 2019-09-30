export function toIterable(list) {
    return {
        [Symbol.iterator]() {
            return toIterator(list);
        }
    };
}
export function toIterator(list) {
    let current = list._root.next;
    return {
        next() {
            if (current) {
                let value = current.value;
                current = current.next;
                return {
                    done: false,
                    value: value
                };
            }
            else {
                return {
                    done: true,
                    value: null
                };
            }
        }
    };
}
