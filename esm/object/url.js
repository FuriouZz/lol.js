export function toString(parameters) {
    return Object.keys(parameters).map((key) => {
        return `${key}=${parameters[key]}`;
    }).join('&');
}
export function toObject(body) {
    const items = body.split('&');
    const parameters = {};
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const kv = item.split('=');
        parameters[kv[0]] = kv[1];
    }
    return parameters;
}
