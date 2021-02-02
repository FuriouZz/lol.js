function _TEMPLATE_REGEX(key) {
    return new RegExp("\\$\\{" + key + "\\}", 'g');
}
function _TEMPLATE_ESCAPE_REGEX(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
const Template2DefaultOptions = {
    open: '${',
    body: '[a-z@$#-_?!]+',
    close: '}'
};
/**
 * Interpolate string with the object
 */
export function template(string, obj = {}, regex = _TEMPLATE_REGEX) {
    let value, str = string;
    for (let key in obj) {
        value = obj[key];
        str = str.replace(regex(key), value);
    }
    return str;
}
/**
 * Interpolate string with the object
 */
export function template2(str, obj = {}, options = Template2DefaultOptions) {
    options = Object.assign({
        open: '${',
        body: '[a-z@$#-_?!]+',
        close: '}',
        defaultValue: ''
    }, options);
    const matches = str.match(new RegExp(_TEMPLATE_ESCAPE_REGEX(options.open) +
        options.body +
        _TEMPLATE_ESCAPE_REGEX(options.close), 'g')) || [];
    matches.forEach((m) => {
        let key = m;
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
export function template3(str, obj = {}) {
    if (typeof str !== 'string' || !str) {
        throw new Error('[template] template is missing');
    }
    if (typeof obj !== "object" || obj === null) {
        throw new Error('[template] object is missing');
    }
    const keys = [];
    const values = [];
    for (const key in obj) {
        keys.push(key);
        values.push(obj[key]);
    }
    const f = new Function(...keys, `return \`${str}\``);
    return f.apply(null, values);
}
