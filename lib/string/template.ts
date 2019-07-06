function _TEMPLATE_REGEX( key: string ) {
  return new RegExp("\\$\\{"+key+"\\}", 'g')
}

function _TEMPLATE_ESCAPE_REGEX(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

interface Template2Options {
  open: string
  close: string
  body: string
}

const Template2DefaultOptions: Template2Options = {
  open: '${',
  body: '[a-z@$#-_?!]+',
  close: '}'
}

/**
 * Interpolate string with the object
 */
export function template( string: string, obj: any = {}, regex: (key: string) => RegExp = _TEMPLATE_REGEX ) {
  let value: any, str = string

  for (let key in obj) {
    value = obj[key]
    str   = str.replace( regex(key), value )
  }

  return str
}

/**
 * Interpolate string with the object
 */
export function template2( string: string, obj: any = {}, options: Template2Options = Template2DefaultOptions ) {
  options = Object.assign({
    open: '${',
    body: '[a-z@$#-_?!]+',
    close: '}'
  }, options)

  var value: any, str = string

  var matches  = str.match(new RegExp(
    _TEMPLATE_ESCAPE_REGEX(options.open) +
    options.body +
    _TEMPLATE_ESCAPE_REGEX(options.close)
  , 'g')) || []

  var nmatches = matches.map(function(m) { return '' })

  for (var key in obj) {
    value = obj[key]

    if (typeof value === 'string') {
      nmatches = nmatches.map(function(m, index) {
        if (matches[index].match(new RegExp(key))) {
          var s = matches[index].replace( key, value )
          return s.slice(options.open.length, s.length-options.close.length)
        }

        return m
      })
    }
  }

  matches.forEach(function(m, index) {
    str = str.replace(m, nmatches[index])
  })

  return str
}
