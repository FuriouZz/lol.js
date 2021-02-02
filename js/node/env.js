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
var fs_1 = require("fs");
function readEnvFile(global) {
    var e_1, _a;
    if (global === void 0) { global = true; }
    var result = {};
    var _env = process.env['NODE_ENV'];
    var filename = ".env";
    if (_env)
        filename += "." + _env;
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
