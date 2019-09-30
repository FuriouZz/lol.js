export function try_or(callback, default_value, message) {
    let value;
    try {
        value = callback();
    }
    catch (e) {
        value = default_value;
        console.log(message || e);
    }
    return value;
}
