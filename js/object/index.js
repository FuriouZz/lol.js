"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _merge(obj0, obj1) {
    for (var key in obj1) {
        // Duplicate array and concat
        if (Array.isArray(obj1[key])) {
            obj0[key] = Array.isArray(obj0[key]) ? obj0[key] : [];
            obj0[key] = obj0[key].concat(obj1[key].slice(0));
        }
        // Merge object
        else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            if (typeof obj0[key] === 'object' && obj0[key] !== null) {
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
function merge(obj) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    var i = 0;
    var len = objs.length;
    for (i = 0; i < len; i++) {
        obj = _merge(obj, objs[i]);
    }
    return obj;
}
exports.merge = merge;
/**
 * Create an object with only property keys
 */
function expose(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var xprt = {};
    for (var i = 0, ilen = keys.length; i < ilen; i++) {
        if (keys[i] && obj.hasOwnProperty(keys[i])) {
            xprt[keys[i]] = obj[keys[i]];
        }
    }
    return xprt;
}
exports.expose = expose;
/**
 * Create a new object without listed property keys
 */
function omit(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var xprt = {};
    for (var key in obj) {
        if (keys.indexOf(key) == -1) {
            xprt[key] = obj[key];
        }
    }
    return xprt;
}
exports.omit = omit;
/**
 * Flatten object to one level
 */
function flat(obj) {
    var xprt = {};
    for (var key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            var children = flat(obj[key]);
            for (var k in children) {
                xprt[key + '.' + k] = children[k];
            }
        }
        else {
            xprt[key] = obj[key];
        }
    }
    return xprt;
}
exports.flat = flat;
/**
 * Transform a flatten object to a deflatten object
 */
function deflat(obj) {
    var xprt = {};
    Object.keys(obj).forEach(function (id) {
        var keys = id.split('.');
        var current = xprt;
        keys.forEach(function (key, i) {
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
exports.deflat = deflat;
/**
 * Freeze object
 */
function immutable(obj) {
    var propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (name) {
        var prop = obj[name];
        if (typeof prop == 'object' && prop !== null) {
            immutable(prop);
        }
    });
    return Object.isFrozen(obj) ? obj : Object.freeze(obj);
}
exports.immutable = immutable;
/**
 * Clone an object
 */
function clone(obj) {
    var cloneObj = {};
    for (var key in obj) {
        // Clone array
        if (Array.isArray(obj[key])) {
            cloneObj[key] = [];
            for (var i = 0; i < obj[key].length; i++) {
                var element = obj[key][i];
                if (Array.isArray(element)) {
                    var n = clone({ array: element });
                    cloneObj[key].push(n.array);
                }
                else if (typeof element == 'object' && element !== null) {
                    cloneObj[key].push(clone(element));
                }
                else {
                    cloneObj[key].push(element);
                }
            }
        }
        // Clone object
        else if (typeof obj[key] === 'object' && obj[key] !== null) {
            cloneObj[key] = clone(obj[key]);
        }
        // Copy Number / String / Boolean
        else {
            cloneObj[key] = obj[key];
        }
    }
    return cloneObj;
}
exports.clone = clone;
/**
 * Do a clone with JSON.parse/JSON.stringify.
 */
function deep_clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deep_clone = deep_clone;
/**
 * Transform an KeyValue object into an array
 */
function to_array(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}
exports.to_array = to_array;
