"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promise(callback) {
    return new Promise(callback);
}
exports.promise = promise;
function resolve(value) {
    return promise(function (r) { return r(value); });
}
exports.resolve = resolve;
