"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIterator = void 0;
var array_1 = require("./array");
function createIterator(arr, options) {
    if (options === void 0) { options = { loop: false, random: false }; }
    var index = -1;
    var end = arr.length;
    arr = options.random ? array_1.shuffle(arr) : arr;
    var iterator = {
        next: function () {
            if (index < end - 1) {
                index++;
                return { value: arr[index], done: false };
            }
            else if (options.loop) {
                if (options.random)
                    arr = array_1.shuffle(arr);
                index = -1;
                return iterator.next();
            }
            return { value: arr[index - 1], done: true };
        }
    };
    return iterator;
}
exports.createIterator = createIterator;
