export function milliseconds(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export function seconds(s) {
    return new Promise((resolve) => {
        setTimeout(resolve, s * 1000);
    });
}
export function minutes(mn) {
    return new Promise((resolve) => {
        setTimeout(resolve, mn * 60 * 1000);
    });
}
export function hours(h) {
    return new Promise((resolve) => {
        setTimeout(resolve, h * 60 * 60 * 1000);
    });
}
