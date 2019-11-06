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
export function bind<T extends string>(context: any, ...methods: T[]) {
  methods.forEach(function(str: string) {
    context[str] = context[str].bind(context)
  })
}