export function $enumerable(obj, property, value) {
    return Object.defineProperty(obj, property, {
        enumerable: value
    });
}
export function $configurable(obj, property, value) {
    return Object.defineProperty(obj, property, {
        configurable: value
    });
}
export function $writable(obj, property, value) {
    return Object.defineProperty(obj, property, {
        writable: value
    });
}
export function $setter(obj, property, setter) {
    return Object.defineProperty(obj, property, {
        set: setter
    });
}
export function $getter(obj, property, getter) {
    return Object.defineProperty(obj, property, {
        get: getter
    });
}
export function $define(obj, property, descriptor) {
    return Object.defineProperty(obj, property, descriptor);
}
export function $readOnly(obj, property) {
    return Object.defineProperty(obj, property, {
        writable: false,
        configurable: false
    });
}
export function $private(obj, property) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, property);
    if (!descriptor && obj.hasOwnProperty(property)) {
        descriptor = {
            get: function () {
                return obj[property];
            },
            set: function (newValue) {
                obj[property] = newValue;
            }
        };
    }
    if (!descriptor)
        return;
    var getter = descriptor.get;
    var setter = descriptor.set;
    var value = obj[property]; //descriptor.default
    if (getter)
        descriptor.get = function $get() {
            if (assertCalledBy(getter, $get)) {
                return value;
            }
        };
    if (setter)
        descriptor.set = function $set(newValue) {
            if (assertCalledBy(setter, $set)) {
                value = newValue;
            }
        };
    function assertCalledBy(caller, f) {
        if (f.caller === caller)
            return true;
        throw new Error('Unauthorized access to the private \'' + property + '\' property');
    }
    return Object.defineProperty(obj, property, descriptor);
}
