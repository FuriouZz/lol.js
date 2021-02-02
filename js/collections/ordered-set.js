"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderedSet = /** @class */ (function () {
    function OrderedSet() {
        this.items = [];
    }
    Object.defineProperty(OrderedSet.prototype, "size", {
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    OrderedSet.prototype.add = function (v) {
        if (!this.has(v)) {
            this.items.push(v);
        }
    };
    OrderedSet.prototype.insertAt = function (v, index) {
        if (!this.has(v)) {
            this.items.splice(index, 0, v);
        }
    };
    OrderedSet.prototype.index = function (v) {
        return this.items.indexOf(v);
    };
    OrderedSet.prototype.get = function (index) {
        return this.items[index];
    };
    OrderedSet.prototype.has = function (v) {
        return this.items.indexOf(v) > -1;
    };
    OrderedSet.prototype.remove = function (v) {
        var index = this.items.indexOf(v);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    };
    OrderedSet.prototype.removeAt = function (index) {
        this.items.splice(index, 1);
    };
    OrderedSet.prototype.clear = function () {
        this.items = [];
    };
    OrderedSet.prototype.shift = function () {
        return this.items.shift();
    };
    OrderedSet.prototype.pop = function () {
        return this.items.pop();
    };
    OrderedSet.prototype.join = function (separator) {
        return this.items.join(separator);
    };
    OrderedSet.prototype[Symbol.iterator] = function () {
        return this.values();
    };
    OrderedSet.prototype.values = function () {
        var len = this.size;
        var items = this.items.slice(0);
        var index = -1;
        return {
            next: function () {
                if (index + 1 < len) {
                    index++;
                    var value = items[index];
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
    };
    OrderedSet.prototype.entries = function () {
        var len = this.size;
        var items = this.items.slice(0);
        var index = -1;
        return {
            next: function () {
                if (index + 1 < len) {
                    index++;
                    var value = items[index];
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
    };
    OrderedSet.prototype.forEach = function (cb) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            cb(item, i, this);
        }
    };
    OrderedSet.prototype.map = function (cb) {
        var set = new OrderedSet();
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            set.add(cb(item, i, this));
        }
        return set;
    };
    OrderedSet.prototype.filter = function (predicate) {
        var set = new OrderedSet();
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (predicate(item, i, this)) {
                set.add(item);
            }
        }
        return set;
    };
    OrderedSet.prototype.clone = function () {
        var set = new OrderedSet();
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            set.add(item);
        }
        return set;
    };
    return OrderedSet;
}());
exports.OrderedSet = OrderedSet;
