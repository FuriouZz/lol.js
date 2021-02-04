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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
var list_1 = require("./collections/list");
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.listeners = {};
    }
    Emitter.prototype.getOrCreateListener = function (name) {
        var n = name;
        return this.listeners[n] = this.listeners[n] || new list_1.List();
    };
    /**
     * Listen from native
     */
    Emitter.prototype.on = function (name, cb) {
        this.getOrCreateListener(name).push({ once: false, cb: cb });
    };
    /**
     * Listen from native, once
     */
    Emitter.prototype.once = function (name, cb) {
        this.getOrCreateListener(name).push({ once: true, cb: cb });
    };
    /**
     * Stop listening native event
     */
    Emitter.prototype.off = function (name, cb) {
        var e_1, _a;
        var listeners = this.getOrCreateListener(name);
        try {
            for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                var listener = listeners_1_1.value;
                if (listener.cb == cb) {
                    listeners.remove(listener);
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Called by the native to dispatch an event
     */
    Emitter.prototype.dispatch = function (name, value) {
        var e_2, _a;
        var n = name;
        var listeners = this.listeners[n];
        if (listeners) {
            try {
                for (var listeners_2 = __values(listeners), listeners_2_1 = listeners_2.next(); !listeners_2_1.done; listeners_2_1 = listeners_2.next()) {
                    var listener = listeners_2_1.value;
                    listener.cb({
                        event: name,
                        value: value
                    });
                    if (listener.once)
                        listeners.remove(listener);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (listeners_2_1 && !listeners_2_1.done && (_a = listeners_2.return)) _a.call(listeners_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    return Emitter;
}());
exports.Emitter = Emitter;
