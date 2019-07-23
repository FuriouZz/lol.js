"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promise(callback) {
    return new Promise(callback);
}
exports.promise = promise;
function resolve(value) {
    return new Promise(function (r) { return r(value); });
}
exports.resolve = resolve;
function defer() {
    var def = {
        promise: new Promise(function (resolve, reject) {
            def.resolve = resolve;
            def.reject = reject;
        })
    };
    return def;
}
exports.defer = defer;
