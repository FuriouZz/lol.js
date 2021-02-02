function response_format(request, options) {
    var response;
    if (options.responseType && options.responseType.match(/json/gi) && request.hasOwnProperty('responseText')) {
        response = JSON.parse(request.responseText);
    }
    else if (options.responseType && options.responseType.match(/json/gi) && typeof request.response === 'string') {
        response = JSON.parse(request.response);
    }
    else {
        response = request.response;
    }
    return response;
}
export class Net {
    static xhr(url, options) {
        const opts = Object.assign({
            method: 'GET',
            responseType: ''
        }, options || {});
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(opts.method, url, true);
            request.responseType = opts.responseType;
            if (opts.headers) {
                for (const key in opts.headers) {
                    if (opts.headers.hasOwnProperty(key)) {
                        request.setRequestHeader(key, opts.headers[key]);
                    }
                }
            }
            if (opts.mimeType && request.overrideMimeType) {
                request.overrideMimeType(opts.mimeType);
            }
            request.onload = (e) => {
                const response = response_format(request, opts);
                resolve({
                    request,
                    response
                });
            };
            request.onerror = (e) => {
                reject({
                    request
                });
            };
            request.send(opts.data);
        });
    }
    static text(url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'text'
        }, options || {}));
    }
    static json(url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'json'
        }, options || {}));
    }
    static bytes(url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'arraybuffer'
        }, options || {}));
    }
}
