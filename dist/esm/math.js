export const PI2 = Math.PI * 2;
export const RAG2DEG = 180 / Math.PI;
export const DEG2RAD = Math.PI / 180;
/**
 * Clamp a value
 */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
/**
 * Clamp a value
 */
export function clamp01(value, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
}
/**
 * Radian to Degree
 */
export function toDegree(radian) {
    return radian / RAG2DEG;
}
/**
 * Degree to Radian
 */
export function toRadian(degree) {
    return degree / DEG2RAD;
}
/**
 * Set float precision
 */
export function toPrecision(value, precision) {
    const p = Math.pow(10, precision);
    return Math.floor(value * p) / p;
}
/**
 * Map value
 */
export function map(value, min0, max0, min1, max1) {
    return min1 + ((value - min0) / (max0 - min0)) * (max1 - min1);
}
