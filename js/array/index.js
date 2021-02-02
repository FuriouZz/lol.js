"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Shuffle an array
 */
function shuffle(arr) {
    var length = arr.length;
    var tmp, rand;
    while (length != 0) {
        rand = Math.floor(Math.random() * length);
        length--;
        tmp = arr[length];
        arr[length] = arr[rand];
        arr[rand] = tmp;
    }
    return arr;
}
exports.shuffle = shuffle;
exports.randomize = shuffle;
/**
 * Sort an array
 */
function sort(arr) {
    var currIndex = -1;
    var tmp = [];
    var tm;
    for (var i = 0, ilen = arr.length; i < ilen; i++) {
        currIndex = tmp.length;
        tmp[currIndex] = arr[i];
        for (var j = 0, jlen = tmp.length; j < jlen; j++) {
            if (tmp[currIndex] < tmp[j]) {
                tm = tmp[j];
                tmp[j] = tmp[currIndex];
                tmp[currIndex] = tm;
            }
        }
    }
    return tmp;
}
exports.sort = sort;
/**
 * Sort array relative to object key
 */
function sortByKey(arr, key) {
    var currIndex = -1;
    var tmp = [];
    var tm;
    for (var i = 0, ilen = arr.length; i < ilen; i++) {
        currIndex = tmp.length;
        tmp[currIndex] = arr[i];
        for (var j = 0, jlen = tmp.length; j < jlen; j++) {
            if (tmp[currIndex][key] < tmp[j][key]) {
                tm = tmp[j];
                tmp[j] = tmp[currIndex];
                tmp[currIndex] = tm;
            }
        }
    }
    return tmp;
}
exports.sortByKey = sortByKey;
/**
 * Inverse array
 */
function inverse(arr) {
    var tmp = [];
    for (var ilen = arr.length - 1, i = ilen; i >= 0; i--) {
        tmp.push(arr[i]);
    }
    return tmp;
}
exports.inverse = inverse;
/**
 * Remove duplicates
 */
function unique(arr) {
    var tmp = [];
    for (var i = 0, ilen = arr.length; i < ilen; i++) {
        if (tmp.indexOf(arr[i]) === -1) {
            tmp.push(arr[i]);
        }
    }
    return tmp;
}
exports.unique = unique;
/**
 * Split array into chunks
 */
function chunk(array, count) {
    var arr = [];
    for (var i = 0, ilen = array.length; i < ilen; i += count) {
        arr.push(array.slice(i, i + count));
    }
    return arr;
}
exports.chunk = chunk;
/**
 * Generate an array
 */
function generate(callback) {
    var arr = [];
    var i = 0;
    var running = true;
    var previous;
    function stop_running() { running = false; }
    while (running) {
        previous = callback(i, stop_running, previous);
        arr.push(previous);
        i++;
    }
    return arr;
}
exports.generate = generate;
/**
 * Generate enumeration
 */
function generate_enumeration(count, random) {
    if (count === void 0) { count = 10; }
    if (random === void 0) { random = false; }
    return generate(function (index, stop_running, previous) {
        if (index + 1 == count)
            stop_running();
        return random ? Math.random() : index;
    });
}
exports.generate_enumeration = generate_enumeration;
/**
 * Find similar elements between two arrays
 */
function similarity(arr0, arr1) {
    var arr = [];
    for (var i = 0; i < arr0.length; i++) {
        var el0 = arr0[i];
        for (var j = 0; j < arr1.length; j++) {
            var el1 = arr1[j];
            if (el0 == el1)
                arr.push(el0);
        }
    }
    return arr;
}
exports.similarity = similarity;
/**
 * Find different elements between two arrays
 */
function difference(arr0, arr1) {
    var arr = [];
    for (var i = 0; i < arr0.length; i++) {
        var el0 = arr0[i];
        if (arr1.indexOf(el0) == -1)
            arr.push(el0);
    }
    return arr;
}
exports.difference = difference;
/**
 * Transform an array into an KeyValue object
 */
function to_record(arr, cb) {
    var record = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var key = cb(item);
        record[key] = item;
    }
    return record;
}
exports.to_record = to_record;
/**
 * Transform an array into an KeyValue object
 */
exports.to_object = to_record;
/**
 * Multi dimensional array to one
 */
function flat(arr) {
    var _a;
    return (_a = []).concat.apply(_a, __spread(arr));
}
exports.flat = flat;
/**
 * Select an item into an array
 */
function select(arr, index) {
    return arr[index];
}
exports.select = select;
/**
 * Select a random item into an array
 */
function random(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return select(arr, index);
}
exports.random = random;
__export(require("./iterator"));
