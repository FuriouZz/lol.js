const TRIM_SPACE_REGEX = new RegExp('(^\\s+|\\s+$)', 'g')

/**
 * Remove white spaces at the beginning and at the end of the string
 */
export function trimWhiteSpace(str: string) {
  return str.replace(TRIM_SPACE_REGEX, '')
}

/**
 * Slug string
 */
export function toSlug(str: string) {
  return str.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Camel case
 */
export function toCamelCase(str: string) {
  str = toSlug(str)

  var words = str.split('-').map(function(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  })

  return words.join('')
}

/**
 * Slugify a string and replace tiret to underscore
 */
export function toUnderscore(str: string) {
  return toSlug(str).replace(/-+/, '_')
}

/**
 * Capitalize
 */
export function toCapitalize(str: string) {
  var strs = str.split(/\s/g)
  strs = strs.map(function(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase()
  })
  return strs.join(' ')
}

/**
 * Capitalize first letter
 */
export function toUCFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}