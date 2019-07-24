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
Object.defineProperty(exports, "__esModule", { value: true });
function _pipe(value, action, parameters) {
    parameters = parameters || [];
    var promise = new Promise(function (resolve) {
        if (value instanceof Promise) {
            value.then(function (newValue) {
                resolve(action.apply(void 0, __spread([newValue], parameters)));
            });
        }
        else {
            resolve(action.apply(void 0, __spread([value], parameters)));
        }
    });
    return {
        pipe: function (callback) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            return _pipe.apply(void 0, __spread([promise, callback], parameters));
        },
        value: function () { return promise; }
    };
}
function pipe(value) {
    return _pipe(value, function (v) { return v; });
}
exports.pipe = pipe;
