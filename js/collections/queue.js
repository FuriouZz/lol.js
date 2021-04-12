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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var dispatcher_1 = require("../dispatcher");
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
        this.unresolved = [];
        this.onresolve = new dispatcher_1.Dispatcher();
    }
    Queue.prototype.indexOf = function (item) {
        return this.items.indexOf(item);
    };
    Queue.prototype.has = function (item) {
        return this.items.includes(item);
    };
    Queue.prototype.insert = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        (_a = this.items).push.apply(_a, __spread(items));
        this.resolveDependencies();
    };
    Queue.prototype.insertAt = function (index) {
        var _a;
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        (_a = this.items).splice.apply(_a, __spread([index, 0], items));
        this.resolveDependencies();
    };
    Queue.prototype.remove = function () {
        var e_1, _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (this.has(item)) {
                    var index = this.indexOf(item);
                    this.removeAt(index);
                }
                else {
                    this.unresolved.push({ key: null, relative: item, move: "remove" });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Queue.prototype.removeAt = function (index) {
        this.items.splice(index, 1);
        this.resolveDependencies();
    };
    Queue.prototype.before = function (before) {
        var e_2, _a;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        try {
            for (var _b = __values(keys.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!this.has(before)) {
                    this.unresolved.push({ key: key, relative: before, move: "before" });
                }
                else {
                    var index = this.indexOf(before);
                    this.insertAt(index, key);
                    this.resolveDependencies();
                }
                before = key;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Queue.prototype.after = function (after) {
        var e_3, _a;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                if (!this.has(after)) {
                    this.unresolved.push({ key: key, relative: after, move: "after" });
                }
                else {
                    var index = this.indexOf(after) + 1;
                    this.insertAt(index, key);
                    this.resolveDependencies();
                }
                after = key;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    Queue.prototype.swap = function (first, second) {
        if (this.has(first) && this.has(second)) {
            var i0 = this.indexOf(first);
            var i1 = this.indexOf(second);
            var imin = Math.min(i0, i1);
            var imax = Math.max(i0, i1);
            this.removeAt(imax);
            this.removeAt(imin);
            if (i0 === imin) {
                this.insertAt(i0, second);
                this.insertAt(i1, first);
            }
            else {
                this.insertAt(i1, first);
                this.insertAt(i0, second);
            }
            this.resolveDependencies();
        }
        else {
            this.unresolved.push({ key: first, relative: second, move: "swap" });
        }
    };
    Queue.prototype.replace = function (replaced) {
        var e_4, _a, e_5, _b;
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        if (!this.has(replaced)) {
            var prev = void 0;
            try {
                for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                    var key = items_2_1.value;
                    if (prev) {
                        this.unresolved.push({ key: key, relative: prev, move: "after" });
                    }
                    else {
                        this.unresolved.push({ key: key, relative: replaced, move: "replace" });
                    }
                    prev = key;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else {
            var prev = replaced;
            try {
                for (var items_3 = __values(items), items_3_1 = items_3.next(); !items_3_1.done; items_3_1 = items_3.next()) {
                    var key = items_3_1.value;
                    this.after(key, prev);
                    prev = key;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (items_3_1 && !items_3_1.done && (_b = items_3.return)) _b.call(items_3);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.remove(replaced);
            this.resolveDependencies();
        }
        return this;
    };
    Queue.prototype.resolveDependencies = function () {
        var _a;
        if (this.unresolved.length === 0)
            return;
        var pendings = [];
        while (this.unresolved.length > 0) {
            var pending = this.unresolved.shift();
            if (!pending)
                return;
            if (!this.has(pending.relative)) {
                pendings.push(pending);
                continue;
            }
            if (pending.move === "before") {
                this.before(pending.relative, pending.key);
            }
            else if (pending.move === "after") {
                this.after(pending.relative, pending.key);
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
            (_a = this.unresolved).unshift.apply(_a, __spread(pendings));
            pendings = [];
        }
        this.unresolved = pendings;
    };
    Queue.prototype[Symbol.iterator] = function () {
        return this.items[Symbol.iterator]();
    };
    Queue.prototype.values = function () {
        return this.items.values();
    };
    Queue.prototype.keys = function () {
        return this.items.keys();
    };
    Queue.prototype.entries = function () {
        return this.items.entries();
    };
    Queue.prototype.filter = function (predicate, thisArg) {
        var _this = this;
        var q = new Queue();
        q.items = this.items.filter(function (value, index) { return (predicate.call(thisArg, value, index, _this)); });
        return q;
    };
    Queue.prototype.map = function (predicate, thisArg) {
        var _this = this;
        var q = new Queue();
        q.items = this.items.map(function (value, index) { return (predicate.call(thisArg, value, index, _this)); });
        return q;
    };
    Queue.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.items.forEach(function (value, index) { return (callback.call(thisArg, value, index, _this)); });
    };
    return Queue;
}());
exports.Queue = Queue;
