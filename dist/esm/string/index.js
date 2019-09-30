const TRIM_SPACE_REGEX = new RegExp('(^\\s+|\\s+$)', 'g');
/**
 * Remove white spaces at the beginning and at the end of the string
 */
export function trimWhiteSpace(str) {
    return str.replace(TRIM_SPACE_REGEX, '');
}
/**
 * Append or preprend a character to a string
 */
export function pad(str, limit = 2, char = "0", insertAfter = false) {
    var s = str.toString();
    if (s.length < limit) {
        if (insertAfter)
            s = s + char;
        else
            s = char + s;
        return pad(s, limit, char, insertAfter);
    }
    return s;
}
/**
 * Slug string
 */
export function toSlug(str) {
    return str.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
/**
 * Camel case
 */
export function toCamelCase(str) {
    str = toSlug(str);
    var words = str.split('-').map(function (word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
    });
    return words.join('');
}
/**
 * Slugify a string and replace tiret to underscore
 */
export function toUnderscore(str) {
    return toSlug(str).replace(/-+/, '_');
}
/**
 * Capitalize
 */
export function toCapitalize(str) {
    var strs = str.split(/\s/g);
    strs = strs.map(function (s) {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
    });
    return strs.join(' ');
}
/**
 * Capitalize first letter
 */
export function toUCFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Generate version from datetime
 */
export function generateVersionFromDate() {
    const now = new Date();
    const date = pad(now.getDate() + "", 2, "0");
    const month = pad((now.getMonth() + 1) + "", 2, "0");
    const year = pad(now.getFullYear() + "", 4, "0");
    const hours = pad(now.getHours() + "", 2, "0");
    const minutes = pad(now.getMinutes() + "", 2, "0");
    const seconds = pad(now.getSeconds() + "", 2, "0");
    return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
}
