export interface IXHROptions {
  method?: string;
  responseType?: XMLHttpRequestResponseType;
  mimeType?: string;
  headers?: {
    [key: string]: string;
  };
  data?: any
}

export interface IXHRResponse {
  request: XMLHttpRequest;
  response: any
}

function response_format( request: XMLHttpRequest, options:IXHROptions ) {
  var response

  if (options.responseType && options.responseType.match(/json/gi) && request.hasOwnProperty('responseText')) {
    response = JSON.parse( request.responseText )
  } else if (options.responseType && options.responseType.match(/json/gi) && typeof request.response === 'string') {
    response = JSON.parse(request.response)
  } else {
    response = request.response
  }

  return response
}

export class Net {

  static xhr(url:string, options?: IXHROptions) {
    const opts: IXHROptions = Object.assign({
      method: 'GET',
      responseType: ''
    }, options || {})

    return new Promise<IXHRResponse>((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(opts.method as string, url, true)
      request.responseType = opts.responseType as XMLHttpRequestResponseType

      if (opts.headers) {
        for (const key in opts.headers) {
          if (opts.headers.hasOwnProperty(key)) {
            request.setRequestHeader(key, opts.headers[key])
          }
        }
      }

      if (opts.mimeType && request.overrideMimeType) {
        request.overrideMimeType(opts.mimeType)
      }

      request.onload = (e) => {
        const response = response_format(request, opts)
        resolve({
          request,
          response
        })
      }

      request.onerror = (e) => {
        reject({
          request
        })
      }

      request.send(opts.data)
    })
  }

  static text(url: string, options?: IXHROptions) {
    return Net.xhr(url, Object.assign({
      responseType: 'text'
    }, options || {}))
  }

  static json(url: string, options?: IXHROptions) {
    return Net.xhr(url, Object.assign({
      responseType: 'json'
    }, options || {}))
  }

  static bytes(url: string, options?: IXHROptions) {
    return Net.xhr(url, Object.assign({
      responseType: 'arraybuffer'
    }, options || {}))
  }

}