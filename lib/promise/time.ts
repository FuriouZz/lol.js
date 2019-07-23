export function milliseconds(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function seconds(s: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, s * 1000)
  })
}

export function minutes(mn: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, mn * 60 * 1000)
  })
}

export function hours(h: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, h * 60 * 60 * 1000)
  })
}