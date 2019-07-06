"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var Net = /** @class */ (function () {
    function Net() {
    }
    Net.xhr = function (url, options) {
        var opts = Object.assign({
            method: 'GET',
            responseType: ''
        }, options || {});
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(opts.method, url, true);
            request.responseType = opts.responseType;
            if (opts.headers) {
                for (var key in opts.headers) {
                    if (opts.headers.hasOwnProperty(key)) {
                        request.setRequestHeader(key, opts.headers[key]);
                    }
                }
            }
            if (opts.mimeType && request.overrideMimeType) {
                request.overrideMimeType(opts.mimeType);
            }
            request.onload = function (e) {
                var response = response_format(request, opts);
                resolve({
                    request: request,
                    response: response
                });
            };
            request.onerror = function (e) {
                reject({
                    request: request
                });
            };
            request.send(opts.data);
        });
    };
    Net.text = function (url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'text'
        }, options || {}));
    };
    Net.json = function (url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'json'
        }, options || {}));
    };
    Net.bytes = function (url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'arraybuffer'
        }, options || {}));
    };
    return Net;
}());
exports.Net = Net;
