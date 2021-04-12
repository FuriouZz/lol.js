"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
exports.readEnvFile = void 0;
var fs_1 = require("fs");
function readEnvFile(target, global) {
    var e_1, _a;
    if (target === void 0) { target = process.env['NODE_ENV']; }
    if (global === void 0) { global = true; }
    var result = {};
    var filename = ".env";
    if (target)
        filename += "." + target;
    try {
        var lines = fs_1.readFileSync(filename, { encoding: "utf-8" }).split(/\r?\n/);
        try {
            for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                var line = lines_1_1.value;
                var _b = __read(line.split(/=/), 2), key = _b[0], value = _b[1];
                key = key.trim();
                value = value.trim();
                if (key[0] === "#")
                    continue;
                if (global)
                    process.env[key] = value;
                result[key] = value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    catch (e) { }
    return result;
}
exports.readEnvFile = readEnvFile;
