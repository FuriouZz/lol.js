"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function try_or(callback, default_value, message) {
    var value;
    try {
        value = callback();
    }
    catch (e) {
        value = default_value;
        console.log(message || e);
    }
    return value;
}
exports.try_or = try_or;
