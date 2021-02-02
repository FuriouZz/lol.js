"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
