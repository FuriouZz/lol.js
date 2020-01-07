export function promise(callback) {
    return new Promise(callback);
}
export function resolve(value) {
    return new Promise((r) => r(value));
}
export function defer() {
    const def = {};
    def.promise = new Promise(function (resolve, reject) {
        def.resolve = resolve;
        def.reject = reject;
    });
    return def;
}
export function defer_all(promises) {
    return Promise.all(promises.map(p => p.promise));
}
