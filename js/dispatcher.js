"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./collections/list");
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.listeners = new list_1.List();
    }
    Dispatcher.prototype.on = function (listener) {
        this.listeners.add({ once: false, fn: listener });
    };
    Dispatcher.prototype.once = function (listener) {
        this.listeners.add({ once: true, fn: listener });
    };
    Dispatcher.prototype.off = function (listener) {
        var e_1, _a;
        try {
            for (var _b = __values(this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var l = _c.value;
                if (l.fn == listener) {
                    this.listeners.remove(l);
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Dispatcher.prototype.dispatch = function (value) {
        var e_2, _a;
        try {
            for (var _b = __values(this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var listener = _c.value;
                listener.fn(value);
                if (listener.once) {
                    this.listeners.remove(listener);
                }
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
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
