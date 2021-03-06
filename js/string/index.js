"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUCFirst = exports.toCapitalize = exports.toUnderscore = exports.toCamelCase = exports.toSlug = exports.trimWhiteSpace = void 0;
var TRIM_SPACE_REGEX = new RegExp('(^\\s+|\\s+$)', 'g');
/**
 * Remove white spaces at the beginning and at the end of the string
 */
function trimWhiteSpace(str) {
    return str.replace(TRIM_SPACE_REGEX, '');
}
exports.trimWhiteSpace = trimWhiteSpace;
/**
 * Slug string
 */
function toSlug(str) {
    return str.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
exports.toSlug = toSlug;
/**
 * Camel case
 */
function toCamelCase(str) {
    str = toSlug(str);
    var words = str.split('-').map(function (word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
    });
    return words.join('');
}
exports.toCamelCase = toCamelCase;
/**
 * Slugify a string and replace tiret to underscore
 */
function toUnderscore(str) {
    return toSlug(str).replace(/-+/, '_');
}
exports.toUnderscore = toUnderscore;
/**
 * Capitalize
 */
function toCapitalize(str) {
    var strs = str.split(/\s/g);
    strs = strs.map(function (s) {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
    });
    return strs.join(' ');
}
exports.toCapitalize = toCapitalize;
/**
 * Capitalize first letter
 */
function toUCFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.toUCFirst = toUCFirst;
