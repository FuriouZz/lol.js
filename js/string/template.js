"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.template4 = exports.template3 = exports.template2 = exports.template = void 0;
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
        var key = m;
        key = key.slice(options.open.length);
        key = key.slice(0, key.length - options.close.length);
        if (obj[key]) {
            str = str.split(m).join(obj[key]);
        }
        else {
            str = str.split(m).join(typeof options.defaultValue === "string" ? options.defaultValue : m);
        }
    });
    return str;
}
exports.template2 = template2;
function template3(str, obj) {
    if (obj === void 0) { obj = {}; }
    if (typeof str !== 'string' || !str) {
        throw new Error('[template] template is missing');
    }
    if (typeof obj !== "object" || obj === null) {
        throw new Error('[template] object is missing');
    }
    var keys = [];
    var values = [];
    for (var key in obj) {
        keys.push(key);
        values.push(obj[key]);
    }
    var f = new (Function.bind.apply(Function, __spread([void 0], keys, ["return `" + str + "`"])))();
    return f.apply(null, values);
}
exports.template3 = template3;
/**
 * Interpolate template with a list of arguments
 */
function template4(tmpl) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var str = tmpl;
    args.forEach(function (s, index) {
        str = str.replace(new RegExp("\\{" + index + "\\}", "g"), s);
    });
    return str.replace(/\{\}/, '');
}
exports.template4 = template4;
