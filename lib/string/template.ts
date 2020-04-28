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
    const reg = new RegExp(m, 'g')
    let key = m
    key = key.slice(options.open.length)
    key = key.slice(0, key.length - options.close.length)

    if (obj[key]) {
      str = str.replace(reg, obj[key])
    } else {
      str = str.replace(reg, typeof options.defaultValue === "string" ? options.defaultValue : m)
    }
  })

  return str
}
