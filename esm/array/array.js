/**
 * Shuffle an array
 */
export function shuffle(arr) {
    let length = arr.length;
    let tmp, rand;
    while (length != 0) {
        rand = Math.floor(Math.random() * length);
        length--;
        tmp = arr[length];
        arr[length] = arr[rand];
        arr[rand] = tmp;
    }
    return arr;
}
export const randomize = shuffle;
/**
 * Sort an array
 */
export function sort(arr) {
    let currIndex = -1;
    let tmp = [];
    let tm;
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
        currIndex = tmp.length;
        tmp[currIndex] = arr[i];
        for (let j = 0, jlen = tmp.length; j < jlen; j++) {
            if (tmp[currIndex] < tmp[j]) {
                tm = tmp[j];
                tmp[j] = tmp[currIndex];
                tmp[currIndex] = tm;
            }
        }
    }
    return tmp;
}
/**
 * Sort array relative to object key
 */
export function sortByKey(arr, key) {
    let currIndex = -1;
    let tmp = [];
    let tm;
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
        currIndex = tmp.length;
        tmp[currIndex] = arr[i];
        for (let j = 0, jlen = tmp.length; j < jlen; j++) {
            if (tmp[currIndex][key] < tmp[j][key]) {
                tm = tmp[j];
                tmp[j] = tmp[currIndex];
                tmp[currIndex] = tm;
            }
        }
    }
    return tmp;
}
/**
 * Inverse array
 */
export function inverse(arr) {
    let tmp = [];
    for (let ilen = arr.length - 1, i = ilen; i >= 0; i--) {
        tmp.push(arr[i]);
    }
    return tmp;
}
/**
 * Remove duplicates
 */
export function unique(arr) {
    let tmp = [];
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
        if (tmp.indexOf(arr[i]) === -1) {
            tmp.push(arr[i]);
        }
    }
    return tmp;
}
/**
 * Split array into chunks
 */
export function chunk(array, count) {
    const arr = [];
    for (var i = 0, ilen = array.length; i < ilen; i += count) {
        arr.push(array.slice(i, i + count));
    }
    return arr;
}
/**
 * Generate an array
 */
export function generate(callback) {
    const arr = [];
    let i = 0;
    let running = true;
    let previous;
    function stop_running() { running = false; }
    while (running) {
        previous = callback(i, stop_running, previous);
        arr.push(previous);
        i++;
    }
    return arr;
}
/**
 * Generate enumeration
 */
export function generate_enumeration(count = 10, random = false) {
    return generate((index, stop_running, previous) => {
        if (index + 1 == count)
            stop_running();
        return random ? Math.random() : index;
    });
}
/**
 * Find similar elements between two arrays
 */
export function similarity(arr0, arr1) {
    const arr = [];
    for (let i = 0; i < arr0.length; i++) {
        const el0 = arr0[i];
        for (let j = 0; j < arr1.length; j++) {
            const el1 = arr1[j];
            if (el0 == el1)
                arr.push(el0);
        }
    }
    return arr;
}
/**
 * Find different elements between two arrays
 */
export function difference(arr0, arr1) {
    const arr = [];
    for (let i = 0; i < arr0.length; i++) {
        const el0 = arr0[i];
        if (arr1.indexOf(el0) == -1)
            arr.push(el0);
    }
    return arr;
}
/**
 * Transform an array into an KeyValue object
 */
export function to_record(arr, cb) {
    const record = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = cb(item);
        record[key] = item;
    }
    return record;
}
/**
 * Transform an array into an KeyValue object
 */
export const to_object = to_record;
/**
 * Multi dimensional array to one
 */
export function flat(arr) {
    return [].concat(...arr);
}
/**
 * Select an item into an array
 */
export function select(arr, index) {
    return arr[index];
}
/**
 * Select a random item into an array
 */
export function random(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return select(arr, index);
}
