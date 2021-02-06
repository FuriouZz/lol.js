"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var dispatcher_1 = require("../dispatcher");
var ordered_set_1 = require("./ordered-set");
var Queue = /** @class */ (function () {
    function Queue() {
        this.unresolved = [];
        this.items = new ordered_set_1.OrderedSet();
        this.onresolve = new dispatcher_1.Dispatcher();
    }
    Queue.prototype.front = function () {
        var e_1, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var _b = __values(keys.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                this.items.insertAt(key, 0);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.resolveDependencies();
        return this;
    };
    Queue.prototype.back = function () {
        var e_2, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                this.items.add(key);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.resolveDependencies();
        return this;
    };
    Queue.prototype.before = function (before) {
        var e_3, _a;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        try {
            for (var _b = __values(keys.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!this.items.has(before)) {
                    this.unresolved.push({ key: key, relative: before, move: "before" });
                }
                else {
                    var index = this.items.index(before);
                    this.items.insertAt(key, index);
                    this.resolveDependencies();
                }
                before = key;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return this;
    };
    Queue.prototype.after = function (after) {
        var e_4, _a;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        try {
            for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                var key = keys_2_1.value;
                if (!this.items.has(after)) {
                    this.unresolved.push({ key: key, relative: after, move: "after" });
                }
                else {
                    var index = this.items.index(after) + 1;
                    this.items.insertAt(key, index);
                    this.resolveDependencies();
                }
                after = key;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return this;
    };
    Queue.prototype.swap = function (first, second) {
        if (this.items.has(first) && this.items.has(second)) {
            var i0 = this.items.index(first);
            var i1 = this.items.index(second);
            var imin = Math.min(i0, i1);
            var imax = Math.max(i0, i1);
            this.items.removeAt(imax);
            this.items.removeAt(imin);
            if (i0 === imin) {
                this.items.insertAt(second, i0);
                this.items.insertAt(first, i1);
            }
            else {
                this.items.insertAt(first, i1);
                this.items.insertAt(second, i0);
            }
            this.resolveDependencies();
        }
        else {
            this.unresolved.push({ key: first, relative: second, move: "swap" });
        }
        return this;
    };
    Queue.prototype.replace = function (replaced) {
        var e_5, _a, e_6, _b;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        if (!this.items.has(replaced)) {
            var prev = void 0;
            try {
                for (var keys_3 = __values(keys), keys_3_1 = keys_3.next(); !keys_3_1.done; keys_3_1 = keys_3.next()) {
                    var key = keys_3_1.value;
                    if (prev) {
                        this.unresolved.push({ key: key, relative: prev, move: "after" });
                    }
                    else {
                        this.unresolved.push({ key: key, relative: replaced, move: "replace" });
                    }
                    prev = key;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (keys_3_1 && !keys_3_1.done && (_a = keys_3.return)) _a.call(keys_3);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else {
            var prev = replaced;
            try {
                for (var keys_4 = __values(keys), keys_4_1 = keys_4.next(); !keys_4_1.done; keys_4_1 = keys_4.next()) {
                    var key = keys_4_1.value;
                    this.after(key, prev);
                    prev = key;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (keys_4_1 && !keys_4_1.done && (_b = keys_4.return)) _b.call(keys_4);
                }
                finally { if (e_6) throw e_6.error; }
            }
            this.items.remove(replaced);
            this.resolveDependencies();
        }
        return this;
    };
    Queue.prototype.remove = function () {
        var e_7, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_5 = __values(keys), keys_5_1 = keys_5.next(); !keys_5_1.done; keys_5_1 = keys_5.next()) {
                var key = keys_5_1.value;
                if (this.items.has(key)) {
                    this.items.remove(key);
                }
                else {
                    this.unresolved.push({ key: null, relative: key, move: "remove" });
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (keys_5_1 && !keys_5_1.done && (_a = keys_5.return)) _a.call(keys_5);
            }
            finally { if (e_7) throw e_7.error; }
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
            if (!this.items.has(pending.relative)) {
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
    Queue.prototype.toString = function () {
        return this.items['items'];
    };
    return Queue;
}());
exports.Queue = Queue;
