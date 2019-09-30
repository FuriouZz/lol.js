function _pipe_async(value, action, parameters) {
    const _params = parameters || [];
    const promise = new Promise((resolve) => {
        if (value instanceof Promise) {
            value.then((newValue) => {
                resolve(action(newValue, ..._params));
            });
        }
        else {
            resolve(action(value, ..._params));
        }
    });
    return {
        pipe(callback, ...params) {
            return _pipe_async(promise, callback, params);
        },
        value: () => promise
    };
}
function _pipe_sync(value, action, parameters) {
    parameters = parameters || [];
    const result = action(value, ...parameters);
    return {
        pipe(callback, ...parameters) {
            return _pipe_sync(result, callback, parameters);
        },
        value: () => result
    };
}
export function pipe_async(value) {
    return _pipe_async(value, (v) => v);
}
export function pipe_sync(value) {
    return _pipe_sync(value, (v) => v);
}
