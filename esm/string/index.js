const TRIM_SPACE_REGEX = new RegExp("(^\\s+|\\s+$)", "g");
/**
 * Remove white spaces at the beginning and at the end of the string
 */
export function trimWhiteSpace(str) {
    return str.replace(TRIM_SPACE_REGEX, "");
}
/**
 * Slug string
 */
export function toSlug(str) {
    return str
        .toString()
        .toLowerCase()
        .replace(/(\s|_)+/g, "-") // Replace spaces and underscores with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}
/**
 * Camel case
 */
export function toCamelCase(str) {
    return toSlug(str)
        .split("-")
        .map(function (word, index) {
        if (index === 0)
            return toLCFirst(word);
        return toUCFirst(word);
    })
        .join("");
}
/**
 * Slugify a string and replace tiret to underscore
 */
export function toUnderscore(str) {
    return toSlug(str).replace(/-+/, "_");
}
/**
 * Capitalize
 */
export function toCapitalize(str) {
    return str
        .split(/\s/g)
        .map(function (s) {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
    })
        .join(" ");
}
/**
 * Capitalize first letter
 */
export function toUCFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Capitalize first letter
 */
export function toLCFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
