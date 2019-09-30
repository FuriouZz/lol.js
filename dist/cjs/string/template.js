"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _TEMPLATE_REGEX(key) {
    return new RegExp("\\$\\{" + key + "\\}", 'g');
}
function _TEMPLATE_ESCAPE_REGEX(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var Template2DefaultOptions = {
    open: '${',
    body: '[a-z@$#-_?!]+',
    close: '}'
};
/**
 * Interpolate string with the object
 */
function template(string, obj, regex) {
    if (obj === void 0) { obj = {}; }
    if (regex === void 0) { regex = _TEMPLATE_REGEX; }
    var value, str = string;
    for (var key in obj) {
        value = obj[key];
        str = str.replace(regex(key), value);
    }
    return str;
}
exports.template = template;
/**
 * Interpolate string with the object
 */
function template2(string, obj, options) {
    if (obj === void 0) { obj = {}; }
    if (options === void 0) { options = Template2DefaultOptions; }
    options = Object.assign({
        open: '${',
        body: '[a-z@$#-_?!]+',
        close: '}'
    }, options);
    var value, str = string;
    var matches = str.match(new RegExp(_TEMPLATE_ESCAPE_REGEX(options.open) +
        options.body +
        _TEMPLATE_ESCAPE_REGEX(options.close), 'g')) || [];
    var nmatches = matches.map(function (m) { return ''; });
    for (var key in obj) {
        value = obj[key];
        if (typeof value === 'string') {
            nmatches = nmatches.map(function (m, index) {
                if (matches[index].match(new RegExp(key))) {
                    var s = matches[index].replace(key, value);
                    return s.slice(options.open.length, s.length - options.close.length);
                }
                return m;
            });
        }
    }
    matches.forEach(function (m, index) {
        str = str.replace(m, nmatches[index]);
    });
    return str;
}
exports.template2 = template2;
