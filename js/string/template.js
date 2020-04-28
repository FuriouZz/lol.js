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
function template2(str, obj, options) {
    if (obj === void 0) { obj = {}; }
    if (options === void 0) { options = Template2DefaultOptions; }
    options = Object.assign({
        open: '${',
        body: '[a-z@$#-_?!]+',
        close: '}',
        defaultValue: ''
    }, options);
    var matches = str.match(new RegExp(_TEMPLATE_ESCAPE_REGEX(options.open) +
        options.body +
        _TEMPLATE_ESCAPE_REGEX(options.close), 'g')) || [];
    matches.forEach(function (m) {
        var reg = new RegExp(m, 'g');
        var key = m;
        key = key.slice(options.open.length);
        key = key.slice(0, key.length - options.close.length);
        if (obj[key]) {
            str = str.replace(reg, obj[key]);
        }
        else {
            str = str.replace(reg, typeof options.defaultValue === "string" ? options.defaultValue : m);
        }
    });
    return str;
}
exports.template2 = template2;
