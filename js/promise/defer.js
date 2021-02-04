"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer_all = exports.defer = void 0;
function defer() {
    var def = {};
    def.promise = new Promise(function (resolve, reject) {
        // @ts-ignore
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
