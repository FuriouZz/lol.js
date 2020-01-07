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
    var def = {};
    def.promise = new Promise(function (resolve, reject) {
        def.resolve = resolve;
        def.reject = reject;
    });
    return def;
}
exports.defer = defer;
function defer_all(promises) {
    return Promise.all(promises.map(function (p) { return p.promise; }));
}
exports.defer_all = defer_all;
