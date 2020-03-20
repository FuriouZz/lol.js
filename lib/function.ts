/**
 * Scope a function inside another one. Prevent from binding.
 */
export function scope<R>( fn: (...args: any[]) => R, context: any = null ) {
  return function $scope(...args: any[]) {
    return fn.apply(context, args)
  }
}

/**
 * Bind a list methods to the context
 */
export function bind<T extends object>(context: T, ...methods: (keyof T)[]) {
  for (let i = 0; i < methods.length; i++) {
    const method = methods[i]
    const fn = context[method]
    if (typeof fn === 'function') {
      context[method] = fn.bind(context)
    }
  }
}