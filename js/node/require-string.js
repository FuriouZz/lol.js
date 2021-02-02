"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var module_1 = __importDefault(require("module"));
function requireContent(code, filename, context) {
    // @ts-ignore
    var paths = module_1.default._nodeModulePaths(path_1.dirname(filename));
    var parent = require.main;
    var mod = new module_1.default(filename, parent);
    mod.filename = filename;
    mod.exports = context;
    mod.loaded = true;
    mod.paths = paths;
    // @ts-ignore
    mod._compile(code, filename);
    var xports = mod.exports;
    parent && parent.children && parent.children.splice(parent.children.indexOf(mod), 1);
    return xports;
}
exports.requireContent = requireContent;
function requireJSON(json, filename, context) {
    return requireContent("module.exports = " + json, filename, context);
}
exports.requireJSON = requireJSON;
