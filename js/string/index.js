"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLCFirst = exports.toUCFirst = exports.toCapitalize = exports.toUnderscore = exports.toCamelCase = exports.toSlug = exports.trimWhiteSpace = void 0;
var TRIM_SPACE_REGEX = new RegExp("(^\\s+|\\s+$)", "g");
/**
 * Remove white spaces at the beginning and at the end of the string
 */
function trimWhiteSpace(str) {
    return str.replace(TRIM_SPACE_REGEX, "");
}
exports.trimWhiteSpace = trimWhiteSpace;
/**
 * Slug string
 */
function toSlug(str) {
    return str
        .toString()
        .toLowerCase()
        .replace(/(\s|_)+/g, "-") // Replace spaces and underscores with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}
exports.toSlug = toSlug;
/**
 * Camel case
 */
function toCamelCase(str) {
    return toSlug(str)
        .split("-")
        .map(function (word, index) {
        if (index === 0)
            return toLCFirst(word);
        return toUCFirst(word);
    })
        .join("");
}
exports.toCamelCase = toCamelCase;
/**
 * Slugify a string and replace tiret to underscore
 */
function toUnderscore(str) {
    return toSlug(str).replace(/-+/, "_");
}
exports.toUnderscore = toUnderscore;
/**
 * Capitalize
 */
function toCapitalize(str) {
    return str
        .split(/\s/g)
        .map(function (s) {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
    })
        .join(" ");
}
exports.toCapitalize = toCapitalize;
/**
 * Capitalize first letter
 */
function toUCFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.toUCFirst = toUCFirst;
/**
 * Capitalize first letter
 */
function toLCFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
exports.toLCFirst = toLCFirst;
