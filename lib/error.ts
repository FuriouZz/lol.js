export function try_or<T>(callback: (...args: any[]) => T, default_value: T, message?: string) : T {
  let value: T
  try {
    value = callback()
  } catch(e) {
    value = default_value
    console.log(message || e)
  }
  return value
}