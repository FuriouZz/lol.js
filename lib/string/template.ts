function _TEMPLATE_REGEX(key: string) {
  return new RegExp("\\$\\{" + key + "\\}", 'g')
}

function _TEMPLATE_ESCAPE_REGEX(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

interface Template2Options {
  open: string
  close: string
  body: string
  defaultValue?: string
}

const Template2DefaultOptions: Template2Options = {
  open: '${',
  body: '[a-z@$#-_?!]+',
  close: '}'
}

/**
 * Interpolate string with the object
 */
export function template(string: string, obj: any = {}, regex: (key: string) => RegExp = _TEMPLATE_REGEX) {
  let value: any, str = string

  for (let key in obj) {
    value = obj[key]
    str = str.replace(regex(key), value)
  }

  return str
}

/**
 * Interpolate string with the object
 */
export function template2(str: string, obj: any = {}, options: Template2Options = Template2DefaultOptions) {
  options = Object.assign({
    open: '${',
    body: '[a-z@$#-_?!]+',
    close: '}',
    defaultValue: ''
  }, options)

  const matches = str.match(new RegExp(
    _TEMPLATE_ESCAPE_REGEX(options.open) +
    options.body +
    _TEMPLATE_ESCAPE_REGEX(options.close)
    , 'g')) || []

  matches.forEach((m) => {
    let key = m
    key = key.slice(options.open.length)
    key = key.slice(0, key.length - options.close.length)

    if (obj[key]) {
      str = str.split(m).join(obj[key])
    } else {
      str = str.split(m).join(typeof options.defaultValue === "string" ? options.defaultValue : m)
    }
  })

  return str
}

export function template3(str: string, obj: Record<string, any> = {}) {
  if (typeof str !== 'string' || !str) {
    throw new Error('[template] template is missing')
  }

  if (typeof obj !== "object" || obj === null) {
    throw new Error('[template] object is missing')
  }

  const keys: string[] = []
  const values: any[] = []

  for (const key in obj) {
    keys.push(key)
    values.push(obj[key])
  }

  const f = new Function(...keys, `return \`${str}\``)
  return f.apply(null, values)
}