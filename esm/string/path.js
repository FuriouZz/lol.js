/**
 * Clean path
 */
export function cleanPath(path) {
    path = toUnixPath(path);
    path = path.replace(/^\.\/|\/$/g, '');
    return path;
}
/**
 *
 */
export function toUnixPath(pth) {
    pth = pth.replace(/\\/g, '/');
    const double = /\/\//;
    while (pth.match(double)) {
        pth = pth.replace(double, '/'); // node on windows doesn't replace doubles
    }
    return pth;
}
/**
 * Remove extras
 */
export function removeSearch(pth) {
    return pth.split(/\?|\#/)[0];
}
