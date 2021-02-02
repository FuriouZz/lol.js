export function defer() {
    const def = {};
    def.promise = new Promise(function (resolve, reject) {
        // @ts-ignore
        def.resolve = resolve;
        def.reject = reject;
    });
    return def;
}
export function defer_all(promises) {
    return Promise.all(promises.map(p => p.promise));
}
