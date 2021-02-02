import { dirname } from "path";
import Module from "module";
export function requireContent(code, filename, context) {
    // @ts-ignore
    const paths = Module._nodeModulePaths(dirname(filename));
    const parent = require.main;
    const mod = new Module(filename, parent);
    mod.filename = filename;
    mod.exports = context;
    mod.loaded = true;
    mod.paths = paths;
    // @ts-ignore
    mod._compile(code, filename);
    const xports = mod.exports;
    parent && parent.children && parent.children.splice(parent.children.indexOf(mod), 1);
    return xports;
}
export function requireJSON(json, filename, context) {
    return requireContent(`module.exports = ${json}`, filename, context);
}
