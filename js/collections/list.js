"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List(array) {
        this._root = {};
        this._count = 0;
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.add(array[i]);
            }
        }
    }
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.insertAt = function (index, value) {
        var item = { value: value };
        var previous = this._root;
        var current = previous.next;
        // Fetch current at index
        var i = 0;
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
    };
    List.prototype.removeAt = function (index) {
        var previous = this._root;
        var current = previous.next;
        // Fetch current at index
        var i = 0;
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
    };
    List.prototype.unshift = function (value) {
        return this.insertAt(0, value);
    };
    List.prototype.push = function (value) {
        return this.insertAt(this._count, value);
    };
    List.prototype.shift = function () {
        return this.removeAt(0);
    };
    List.prototype.pop = function () {
        return this.removeAt(this._count - 1);
    };
    List.prototype.add = function (value) {
        return this.insertAt(this._count, value);
    };
    List.prototype.remove = function (value) {
        var index = this.indexOf(value);
        if (index == -1)
            return null;
        return this.removeAt(index);
    };
    List.prototype.indexOf = function (value) {
        var previous = this._root;
        var current = previous.next;
        var i = -1;
        while (current) {
            previous = current;
            current = current.next;
            i++;
            if (previous.value === value)
                return i;
        }
        return -1;
    };
    List.prototype.has = function (value) {
        return this.indexOf(value) > -1;
    };
    List.prototype.forEach = function (cb) {
        var next = this._root.next;
        var i = 0;
        while (next) {
            cb(next.value, i);
            next = next.next;
            i++;
        }
    };
    List.prototype.map = function (cb) {
        var l = new List();
        var next = this._root.next;
        var i = 0;
        while (next) {
            l.push(cb(next.value, i));
            next = next.next;
            i++;
        }
        return l;
    };
    List.prototype.filter = function (cb) {
        var l = new List();
        var next = this._root.next;
        var i = 0;
        while (next) {
            if (cb(next.value, i)) {
                l.push(next.value);
            }
            next = next.next;
            i++;
        }
        return l;
    };
    List.prototype.clone = function () {
        var l = new List();
        var next = this._root.next;
        while (next) {
            l.push(next.value);
            next = next.next;
        }
        return l;
    };
    List.prototype.inverse = function () {
        var i = 0;
        while (i < this._count) {
            this.unshift(this.removeAt(i));
            i++;
        }
    };
    List.prototype.toArray = function () {
        var arr = new Array(this._count);
        var next = this._root.next;
        var i = 0;
        while (next) {
            arr[i] = next.value;
            next = next.next;
            i++;
        }
        arr.values;
        return arr;
    };
    List.prototype[Symbol.iterator] = function () {
        return this.values();
    };
    List.prototype.values = function () {
        var _this = this;
        var _a;
        var current = this._root.next;
        return _a = {},
            _a[Symbol.iterator] = function () {
                return _this.values();
            },
            _a.next = function () {
                if (current) {
                    var value = current.value;
                    current = current.next;
                    return {
                        done: false,
                        value: value
                    };
                }
                return {
                    done: true,
                    value: null
                };
            },
            _a;
    };
    List.prototype.clear = function () {
        while (this.length > 0) {
            this.pop();
        }
    };
    return List;
}());
exports.List = List;
