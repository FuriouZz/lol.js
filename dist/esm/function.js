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
    methods.forEach(function (str) {
        context[str] = context[str].bind(context);
    });
}
