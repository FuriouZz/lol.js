"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toString(parameters) {
    return Object.keys(parameters).map(function (key) {
        return key + "=" + parameters[key];
    }).join('&');
}
exports.toString = toString;
function toObject(body) {
    var items = body.split('&');
    var parameters = {};
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var kv = item.split('=');
        parameters[kv[0]] = kv[1];
    }
    return parameters;
}
exports.toObject = toObject;
