function _merge(obj0, obj1) {
    for (const key in obj1) {
        // Duplicate array and concat
        if (Array.isArray(obj1[key])) {
            obj0[key] = Array.isArray(obj0[key]) ? obj0[key] : [];
            obj0[key] = obj0[key].concat(obj1[key].slice(0));
        }
        // Merge object
        else if (typeof obj1[key] === "object" && obj1[key] !== null) {
            if (typeof obj0[key] === "object" && obj0[key] !== null) {
                obj0[key] = merge(obj0[key], obj1[key]);
            }
            else {
                obj0[key] = obj1[key];
            }
        }
        // Number / String / Boolean
        else {
            obj0[key] = obj1[key];
        }
    }
    return obj0;
}
/**
 * Merge objects
 */
export function merge(obj, ...objs) {
    let i = 0;
    const len = objs.length;
    for (i = 0; i < len; i++) {
        obj = _merge(obj, objs[i]);
    }
    return obj;
}
/**
 * Create an object with only property keys
 */
export function expose(obj, ...keys) {
    const xprt = {};
    for (let i = 0, ilen = keys.length; i < ilen; i++) {
        if (keys[i] && obj.hasOwnProperty(keys[i])) {
            xprt[keys[i]] = obj[keys[i]];
        }
    }
    return xprt;
}
/**
 * Create a new object without listed property keys
 */
export function omit(obj, ...keys) {
    const xprt = {};
    for (const key in obj) {
        if (keys.indexOf(key) == -1) {
            xprt[key] = obj[key];
        }
    }
    return xprt;
}
/**
 * Flatten object to one level
 */
export function flat(obj) {
    const xprt = {};
    for (const key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            const children = flat(obj[key]);
            for (const k in children) {
                xprt[key + "." + k] = children[k];
            }
        }
        else {
            xprt[key] = obj[key];
        }
    }
    return xprt;
}
/**
 * Transform a flatten object to a deflatten object
 */
export function deflat(obj) {
    const xprt = {};
    Object.keys(obj).forEach((id) => {
        const keys = id.split(".");
        let current = xprt;
        keys.forEach((key, i) => {
            if (i == keys.length - 1) {
                current[key] = obj[id];
            }
            else {
                current[key] = current[key] || {};
            }
            current = current[key];
        });
    });
    return xprt;
}
/**
 * Freeze object
 */
export function immutable(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (name) {
        const prop = obj[name];
        if (typeof prop == "object" && prop !== null) {
            immutable(prop);
        }
    });
    return Object.isFrozen(obj) ? obj : Object.freeze(obj);
}
/**
 * Clone an object
 */
export function clone(obj) {
    const cloneObj = {};
    for (const key in obj) {
        // Clone array
        if (Array.isArray(obj[key])) {
            cloneObj[key] = [];
            const arr = obj[key];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (Array.isArray(element)) {
                    const n = clone({ array: element });
                    cloneObj[key].push(n.array);
                }
                else if (typeof element == "object" && element !== null) {
                    cloneObj[key].push(clone(element));
                }
                else {
                    cloneObj[key].push(element);
                }
            }
        }
        // Clone object
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            cloneObj[key] = clone(obj[key]);
        }
        // Copy Number / String / Boolean
        else {
            cloneObj[key] = obj[key];
        }
    }
    return cloneObj;
}
/**
 * Do a clone with JSON.parse/JSON.stringify.
 */
export function deep_clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * Transform an KeyValue object into an array
 */
export function to_array(obj) {
    return Object.keys(obj).map((key) => {
        return obj[key];
    });
}
export * from "./argv";
export * from "./url";
