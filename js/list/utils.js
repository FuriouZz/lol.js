"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toIterable(list) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            return toIterator(list);
        },
        _a;
}
exports.toIterable = toIterable;
function toIterator(list) {
    var current = list._root.next;
    return {
        next: function () {
            if (current) {
                var value = current.value;
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
exports.toIterator = toIterator;
