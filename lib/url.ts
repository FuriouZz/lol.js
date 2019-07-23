export function toString(parameters: Record<string, any>) {
  return Object.keys(parameters).map((key) => {
    return `${key}=${parameters[key]}`
  }).join('&')
}

export function toObject(body: string) {
  const items = body.split('&')
  const parameters: Record<string, string> = {}

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const kv = item.split('=')
    parameters[kv[0]] = kv[1]
  }

  return parameters
}