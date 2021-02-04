"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSearch = exports.toUnixPath = exports.cleanPath = void 0;
/**
 * Clean path
 */
function cleanPath(path) {
    path = toUnixPath(path);
    path = path.replace(/^\.\/|\/$/g, '');
    return path;
}
exports.cleanPath = cleanPath;
/**
 *
 */
function toUnixPath(pth) {
    pth = pth.replace(/\\/g, '/');
    var double = /\/\//;
    while (pth.match(double)) {
        pth = pth.replace(double, '/'); // node on windows doesn't replace doubles
    }
    return pth;
}
exports.toUnixPath = toUnixPath;
/**
 * Remove extras
 */
function removeSearch(pth) {
    return pth.split(/\?|\#/)[0];
}
exports.removeSearch = removeSearch;
