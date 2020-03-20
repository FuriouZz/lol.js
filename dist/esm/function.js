/**
 * Scope a function inside another one. Prevent from binding.
 */
export function scope(fn, context = null) {
    return function $scope(...args) {
        return fn.apply(context, args);
    };
}
/**
 * Bind a list methods to the context
 */
export function bind(context, ...methods) {
    for (let i = 0; i < methods.length; i++) {
        const method = methods[i];
        const fn = context[method];
        if (typeof fn === 'function') {
            context[method] = fn.bind(context);
        }
    }
}
