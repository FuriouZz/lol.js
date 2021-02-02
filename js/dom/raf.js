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
Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = require("../string/guid");
var RAF = /** @class */ (function () {
    function RAF() {
    }
    Object.defineProperty(RAF, "time", {
        get: function () {
            return RAF._time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RAF, "deltaTime", {
        get: function () {
            return RAF._deltaTime;
        },
        enumerable: true,
        configurable: true
    });
    RAF.getFramerate = function () {
        return (1 / RAF._framerate) * 1000;
    };
    RAF.setFramerate = function (value) {
        RAF._framerate = (1 / value) * 1000;
    };
    RAF._update = function () {
        if (!RAF._running)
            return;
        RAF._time = performance.now();
        RAF._deltaTime = RAF._time - RAF._lt;
        RAF._elapsedInterval += RAF._deltaTime;
        if (RAF._elapsedInterval >= RAF._framerate) {
            RAF._elapsedInterval = 0;
            RAF._processUpdate();
        }
        RAF._lt = RAF._time;
        RAF._raf = window.requestAnimationFrame(RAF._update);
    };
    RAF._processUpdate = function () {
        var e_1, _a;
        try {
            for (var _b = __values(RAF._listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), _id = _d[0], update = _d[1];
                update(RAF._deltaTime, RAF._time);
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
    RAF.add = function (listener, id) {
        if (!id)
            id = guid_1.guid();
        this._listeners.push([id, listener]);
        return id;
    };
    RAF.delete = function (listenerOrId) {
        var index = this._listeners.findIndex(function (_a) {
            var _b = __read(_a, 2), id = _b[0], listener = _b[1];
            return listenerOrId === id || listenerOrId === listener;
        });
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    };
    RAF.start = function () {
        if (RAF._running)
            return;
        RAF._running = true;
        RAF._raf = window.requestAnimationFrame(RAF._update);
    };
    RAF.stop = function () {
        if (!RAF._running)
            return;
        RAF._running = false;
        window.cancelAnimationFrame(RAF._raf);
    };
    RAF._listeners = [];
    RAF._framerate = 16;
    RAF._deltaTime = 0;
    RAF._time = performance.now();
    RAF._lt = performance.now();
    RAF._elapsedInterval = 0;
    RAF._raf = -1;
    RAF._running = false;
    return RAF;
}());
exports.RAF = RAF;
