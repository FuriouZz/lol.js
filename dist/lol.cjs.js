'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Shuffle an array
 */
function shuffle(arr) {
    let length = arr.length;
    let tmp, rand;
    while (length != 0) {
        rand = Math.floor(Math.random() * length);
        length--;
        tmp = arr[length];
        arr[length] = arr[rand];
        arr[rand] = tmp;
    }
    return arr;
}
const randomize = shuffle;
/**
 * Sort an array
 */
function sort(arr) {
    let currIndex = -1;
    let tmp = [];
    let tm;
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
        currIndex = tmp.length;
        tmp[currIndex] = arr[i];
        for (let j = 0, jlen = tmp.length; j < jlen; j++) {
            if (tmp[currIndex] < tmp[j]) {
                tm = tmp[j];
                tmp[j] = tmp[currIndex];
                tmp[currIndex] = tm;
            }
        }
    }
    return tmp;
}
/**
 * Sort array relative to object key
 */
function sortByKey(arr, key) {
    let currIndex = -1;
    let tmp = [];
    let tm;
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
        currIndex = tmp.length;
        tmp[currIndex] = arr[i];
        for (let j = 0, jlen = tmp.length; j < jlen; j++) {
            if (tmp[currIndex][key] < tmp[j][key]) {
                tm = tmp[j];
                tmp[j] = tmp[currIndex];
                tmp[currIndex] = tm;
            }
        }
    }
    return tmp;
}
/**
 * Inverse array
 */
function inverse(arr) {
    let tmp = [];
    for (let ilen = arr.length - 1, i = ilen; i >= 0; i--) {
        tmp.push(arr[i]);
    }
    return tmp;
}
/**
 * Remove duplicates
 */
function unique(arr) {
    let tmp = [];
    for (let i = 0, ilen = arr.length; i < ilen; i++) {
        if (tmp.indexOf(arr[i]) === -1) {
            tmp.push(arr[i]);
        }
    }
    return tmp;
}
/**
 * Split array into chunks
 */
function chunk(array, count) {
    const arr = [];
    for (var i = 0, ilen = array.length; i < ilen; i += count) {
        arr.push(array.slice(i, i + count));
    }
    return arr;
}
/**
 * Generate an array
 */
function generate(callback) {
    const arr = [];
    let i = 0;
    let running = true;
    let previous;
    function stop_running() { running = false; }
    while (running) {
        previous = callback(i, stop_running, previous);
        arr.push(previous);
        i++;
    }
    return arr;
}
/**
 * Generate enumeration
 */
function generate_enumeration(count = 10, random = false) {
    return generate((index, stop_running, previous) => {
        if (index + 1 == count)
            stop_running();
        return random ? Math.random() : index;
    });
}
/**
 * Find similar elements between two arrays
 */
function similarity(arr0, arr1) {
    const arr = [];
    for (let i = 0; i < arr0.length; i++) {
        const el0 = arr0[i];
        for (let j = 0; j < arr1.length; j++) {
            const el1 = arr1[j];
            if (el0 == el1)
                arr.push(el0);
        }
    }
    return arr;
}
/**
 * Find different elements between two arrays
 */
function difference(arr0, arr1) {
    const arr = [];
    for (let i = 0; i < arr0.length; i++) {
        const el0 = arr0[i];
        if (arr1.indexOf(el0) == -1)
            arr.push(el0);
    }
    return arr;
}
/**
 * Transform an array into an KeyValue object
 */
function to_record(arr, cb) {
    const record = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = cb(item);
        record[key] = item;
    }
    return record;
}
/**
 * Transform an array into an KeyValue object
 */
const to_object = to_record;
/**
 * Multi dimensional array to one
 */
function flat(arr) {
    return [].concat(...arr);
}
/**
 * Select an item into an array
 */
function select(arr, index) {
    return arr[index];
}
/**
 * Select a random item into an array
 */
function random(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return select(arr, index);
}

var _ArrayIndex = /*#__PURE__*/Object.freeze({
    shuffle: shuffle,
    randomize: randomize,
    sort: sort,
    sortByKey: sortByKey,
    inverse: inverse,
    unique: unique,
    chunk: chunk,
    generate: generate,
    generate_enumeration: generate_enumeration,
    similarity: similarity,
    difference: difference,
    to_record: to_record,
    to_object: to_object,
    flat: flat,
    select: select,
    random: random
});

function iterator(arr, options = { loop: false, random: false }) {
    let index = -1;
    const end = arr.length;
    arr = options.random ? shuffle(arr) : arr;
    const iterator = {
        next() {
            if (index < end - 1) {
                index++;
                return { value: arr[index], done: false };
            }
            else if (options.loop) {
                if (options.random)
                    arr = shuffle(arr);
                index = -1;
                return iterator.next();
            }
            return { value: arr[index - 1], done: true };
        }
    };
    return iterator;
}

var _ArrayIterator = /*#__PURE__*/Object.freeze({
    iterator: iterator
});

const PI2 = Math.PI * 2;
const RAG2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;
/**
 * Clamp a value
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
/**
 * Clamp a value
 */
function clamp01(value, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
}
/**
 * Radian to Degree
 */
function toDegree(radian) {
    return radian / RAG2DEG;
}
/**
 * Degree to Radian
 */
function toRadian(degree) {
    return degree / DEG2RAD;
}
/**
 * Set float precision
 */
function toPrecision(value, precision) {
    const p = Math.pow(10, precision);
    return Math.floor(value * p) / p;
}
/**
 * Map value
 */
function map(value, min0, max0, min1, max1) {
    return min1 + ((value - min0) / (max0 - min0)) * (max1 - min1);
}

var _Math = /*#__PURE__*/Object.freeze({
    PI2: PI2,
    RAG2DEG: RAG2DEG,
    DEG2RAD: DEG2RAD,
    clamp: clamp,
    clamp01: clamp01,
    toDegree: toDegree,
    toRadian: toRadian,
    toPrecision: toPrecision,
    map: map
});

function drawEllipse(ctx, centerX, centerY, width, height) {
    ctx.save();
    ctx.scale(width / width, height / width);
    ctx.arc(centerX, centerY, width * 0.5, 0, PI2, false);
    ctx.restore();
}

var _Canvas = /*#__PURE__*/Object.freeze({
    drawEllipse: drawEllipse
});

class List {
    constructor(array) {
        this._root = {};
        this._count = 0;
        if (Array.isArray(array)) {
            for (let i = 0; i < array.length; i++) {
                this.add(array[i]);
            }
        }
    }
    get length() {
        return this._count;
    }
    insertAt(index, value) {
        const item = { value: value };
        let previous = this._root;
        let current = previous.next;
        // Fetch current at index
        let i = 0;
        while (i < index && current) {
            previous = current;
            current = current.next;
            i++;
        }
        if (previous.next)
            item.next = previous.next;
        previous.next = item;
        // Increment list count
        this._count++;
        return index;
    }
    removeAt(index) {
        let previous = this._root;
        let current = previous.next;
        // Fetch current at index
        let i = 0;
        while (i < index && current) {
            previous = current;
            current = current.next;
            i++;
        }
        if (!current)
            return null;
        previous.next = current.next;
        // Decrement list count
        this._count--;
        return current.value;
    }
    unshift(value) {
        return this.insertAt(0, value);
    }
    push(value) {
        return this.insertAt(this._count, value);
    }
    shift() {
        return this.removeAt(0);
    }
    pop() {
        return this.removeAt(this._count - 1);
    }
    add(value) {
        return this.insertAt(this._count, value);
    }
    remove(value) {
        const index = this.indexOf(value);
        if (index == -1)
            return null;
        return this.removeAt(index);
    }
    indexOf(value) {
        let previous = this._root;
        let current = previous.next;
        let i = -1;
        while (current) {
            previous = current;
            current = current.next;
            i++;
            if (previous.value === value)
                return i;
        }
        return -1;
    }
    forEach(cb) {
        let next = this._root.next;
        let i = 0;
        while (next) {
            cb(next.value, i);
            next = next.next;
            i++;
        }
    }
    map(cb) {
        const l = new List();
        let next = this._root.next;
        let i = 0;
        while (next) {
            l.push(cb(next.value, i));
            next = next.next;
            i++;
        }
        return l;
    }
    filter(cb) {
        const l = new List();
        let next = this._root.next;
        let i = 0;
        while (next) {
            if (cb(next.value, i)) {
                l.push(next.value);
            }
            next = next.next;
            i++;
        }
        return l;
    }
    clone() {
        const l = new List();
        let next = this._root.next;
        while (next) {
            l.push(next.value);
            next = next.next;
        }
        return l;
    }
    inverse() {
        let i = 0;
        while (i < this._count) {
            this.unshift(this.removeAt(i));
            i++;
        }
    }
    toArray() {
        const arr = new Array(this._count);
        let next = this._root.next;
        let i = 0;
        while (next) {
            arr[i] = next.value;
            next = next.next;
            i++;
        }
        return arr;
    }
}

var _ListIndex = /*#__PURE__*/Object.freeze({
    List: List
});

function toIterable(list) {
    return {
        [Symbol.iterator]() {
            return toIterator(list);
        }
    };
}
function toIterator(list) {
    let current = list._root.next;
    return {
        next() {
            if (current) {
                let value = current.value;
                current = current.next;
                return {
                    done: false,
                    value: value
                };
            }
            else {
                return {
                    done: true,
                    value: null
                };
            }
        }
    };
}

var _ListUtils = /*#__PURE__*/Object.freeze({
    toIterable: toIterable,
    toIterator: toIterator
});

class Dispatcher {
    constructor() {
        this.listeners = new List();
    }
    on(listener) {
        this.listeners.add({ once: false, fn: listener });
    }
    once(listener) {
        this.listeners.add({ once: true, fn: listener });
    }
    off(listener) {
        for (const l of toIterable(this.listeners)) {
            if (l.fn == listener) {
                this.listeners.remove(l);
                break;
            }
        }
    }
    dispatch(value) {
        for (const listener of toIterable(this.listeners)) {
            listener.fn(value);
            if (listener.once) {
                this.listeners.remove(listener);
            }
        }
    }
}

var _Dispatcher = /*#__PURE__*/Object.freeze({
    Dispatcher: Dispatcher
});

function metadata($audio) {
    return {
        url: $audio.src,
        duration: $audio.duration
    };
}
function load(url) {
    return new Promise((resolve, reject) => {
        const $audio = document.createElement('audio');
        function onLoadedMetaData() {
            $audio.removeEventListener('loadedmetadata', onLoadedMetaData);
            resolve(Object.assign({ element: $audio }, metadata($audio)));
        }
        $audio.addEventListener('loadedmetadata', onLoadedMetaData);
        $audio.src = url;
    });
}

var _DomAudio = /*#__PURE__*/Object.freeze({
    metadata: metadata,
    load: load
});

function load$1(file, type) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (!reader.result) {
                reject('[FileReader] No result found');
                return;
            }
            resolve({
                file,
                type,
                reader,
                response: reader.result
            });
        };
        reader.onerror = function (e) {
            reject(e);
        };
        if (type == 'arraybuffer') {
            reader.readAsArrayBuffer(file);
        }
        else if (type == 'binarystring') {
            reader.readAsBinaryString(file);
        }
        else if (type == 'dataurl') {
            reader.readAsDataURL(file);
        }
        else if (type == 'text') {
            reader.readAsText(file);
        }
    });
}

var _DomFile = /*#__PURE__*/Object.freeze({
    load: load$1
});

function metadata$1($img) {
    return {
        url: $img.src,
        width: $img.naturalWidth,
        height: $img.naturalHeight,
        ratio: $img.naturalWidth / $img.naturalHeight
    };
}
function load$2(url) {
    return new Promise((resolve, reject) => {
        const $img = new Image();
        $img.onload = () => {
            resolve(Object.assign({ element: $img }, metadata$1($img)));
        };
        $img.onerror = (e) => {
            reject(e);
        };
        $img.src = url;
    });
}

var _DomImage = /*#__PURE__*/Object.freeze({
    metadata: metadata$1,
    load: load$2
});

function response_format(request, options) {
    var response;
    if (options.responseType && options.responseType.match(/json/gi) && request.hasOwnProperty('responseText')) {
        response = JSON.parse(request.responseText);
    }
    else if (options.responseType && options.responseType.match(/json/gi) && typeof request.response === 'string') {
        response = JSON.parse(request.response);
    }
    else {
        response = request.response;
    }
    return response;
}
class Net {
    static xhr(url, options) {
        const opts = Object.assign({
            method: 'GET',
            responseType: ''
        }, options || {});
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(opts.method, url, true);
            request.responseType = opts.responseType;
            if (opts.headers) {
                for (const key in opts.headers) {
                    if (opts.headers.hasOwnProperty(key)) {
                        request.setRequestHeader(key, opts.headers[key]);
                    }
                }
            }
            if (opts.mimeType && request.overrideMimeType) {
                request.overrideMimeType(opts.mimeType);
            }
            request.onload = (e) => {
                const response = response_format(request, opts);
                resolve({
                    request,
                    response
                });
            };
            request.onerror = (e) => {
                reject({
                    request
                });
            };
            request.send(opts.data);
        });
    }
    static text(url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'text'
        }, options || {}));
    }
    static json(url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'json'
        }, options || {}));
    }
    static bytes(url, options) {
        return Net.xhr(url, Object.assign({
            responseType: 'arraybuffer'
        }, options || {}));
    }
}

var _DomNet = /*#__PURE__*/Object.freeze({
    Net: Net
});

/**
 * raf.js
 *
 * Global RequestAnimationFrame
 *
 * ----------------------------
 *
 * use example
 *
 * var RAF = require('./libs/raf)'
 *
 * RAF.subscribe( 'mySubscriberId', mySubscriberFn )
 * RAF.unsubscribe( 'mySubscriberId' )
 * RAF.start()
 * RAF.stop()
 */
const requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        // @ts-ignore
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
const cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        // @ts-ignore
        window.webkitCancelRequestAnimationFrame ||
        // @ts-ignore
        window.mozCancelRequestAnimationFrame ||
        // @ts-ignore
        window.oCancelRequestAnimationFrame ||
        // @ts-ignore
        window.msCancelRequestAnimationFrame;
})();
class RAF {
    /**
     * Run all subscribers
     */
    static _update() {
        RAF._now = Date.now();
        RAF.dt = RAF._now - RAF._lt;
        RAF._elapsedInterval += RAF.dt;
        if (RAF._elapsedInterval >= RAF.framerate) {
            RAF._elapsedInterval = 0;
            RAF._processUpdate();
        }
        RAF._lt = RAF._now;
        RAF._raf = requestAnimFrame(RAF._update);
    }
    static _processUpdate() {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            var [_, subscriber] = RAF.subscribers[i];
            // execute handler
            subscriber();
        }
    }
    /**
     * Register a new subscriber
     */
    static subscribe(id, fn) {
        RAF.subscribers.push([id, fn]);
    }
    /**
    * Unregister a subscriber
    */
    static unsubscribe(id) {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            // if id matches, removes
            if (RAF.subscribers[i][0] === id) {
                RAF.subscribers.splice(i, 1);
            }
        }
    }
    /**
     * Start globally the RAF
     */
    static start() {
        RAF._raf = requestAnimFrame(RAF._update);
    }
    /**
     * Stop globally the RAF
     */
    static stop() {
        cancelRequestAnimFrame(RAF._raf);
    }
}
RAF.subscribers = [];
RAF.dt = 0;
RAF.framerate = 16;
RAF._now = Date.now();
RAF._lt = RAF._now;
RAF._elapsedInterval = 0;
RAF._raf = requestAnimFrame(RAF._update);

var _DomRaf = /*#__PURE__*/Object.freeze({
    RAF: RAF
});

function metadata$2($video) {
    return {
        url: $video.src,
        width: $video.videoWidth,
        height: $video.videoHeight,
        ratio: $video.videoWidth / $video.videoHeight,
        poster: $video.poster
    };
}
function load$3(url) {
    return new Promise((resolve, reject) => {
        const $video = document.createElement('video');
        function onLoadedMetaData() {
            $video.removeEventListener('loadedmetadata', onLoadedMetaData);
            resolve(Object.assign({ element: $video }, metadata$2($video)));
        }
        $video.addEventListener('loadedmetadata', onLoadedMetaData);
        $video.src = url;
    });
}

var _DomVideo = /*#__PURE__*/Object.freeze({
    metadata: metadata$2,
    load: load$3
});

function try_or(callback, default_value, message) {
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

var _Error = /*#__PURE__*/Object.freeze({
    try_or: try_or
});

/**
 * Scope a function inside another one. Prevent from binding.
 */
function scope(fn, context = null) {
    return function $scope(...args) {
        return fn.apply(context, args);
    };
}
/**
 * Bind a list methods to the context
 */
function bind(context, ...methods) {
    methods.forEach(function (str) {
        context[str] = context[str].bind(context);
    });
}

var _Function = /*#__PURE__*/Object.freeze({
    scope: scope,
    bind: bind
});

function $enumerable(obj, property, value) {
    return Object.defineProperty(obj, property, {
        enumerable: value
    });
}
function $configurable(obj, property, value) {
    return Object.defineProperty(obj, property, {
        configurable: value
    });
}
function $writable(obj, property, value) {
    return Object.defineProperty(obj, property, {
        writable: value
    });
}
function $setter(obj, property, setter) {
    return Object.defineProperty(obj, property, {
        set: setter
    });
}
function $getter(obj, property, getter) {
    return Object.defineProperty(obj, property, {
        get: getter
    });
}
function $define(obj, property, descriptor) {
    return Object.defineProperty(obj, property, descriptor);
}
function $readOnly(obj, property) {
    return Object.defineProperty(obj, property, {
        writable: false,
        configurable: false
    });
}
function $private(obj, property) {
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

var _ObjectDefine = /*#__PURE__*/Object.freeze({
    $enumerable: $enumerable,
    $configurable: $configurable,
    $writable: $writable,
    $setter: $setter,
    $getter: $getter,
    $define: $define,
    $readOnly: $readOnly,
    $private: $private
});

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
function merge(obj, ...objs) {
    var i = 0;
    var len = objs.length;
    for (i = 0; i < len; i++) {
        obj = _merge(obj, objs[i]);
    }
    return obj;
}
/**
 * Create an object with only property keys
 */
function expose(obj, ...keys) {
    var xprt = {};
    for (var i = 0, ilen = keys.length; i < ilen; i++) {
        if (keys[i] && obj.hasOwnProperty(keys[i])) {
            xprt[keys[i]] = obj[keys[i]];
        }
    }
    return xprt;
}
/**
 * Create a new object without listed property keys
 */
function omit(obj, ...keys) {
    var xprt = {};
    for (var key in obj) {
        if (keys.indexOf(key) == -1) {
            xprt[key] = obj[key];
        }
    }
    return xprt;
}
/**
 * Flatten object to one level
 */
function flat$1(obj) {
    var xprt = {};
    for (var key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            var children = flat$1(obj[key]);
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
/**
 * Transform a flatten object to a deflatten object
 */
function deflat(obj) {
    var xprt = {};
    Object.keys(obj).forEach((id) => {
        const keys = id.split('.');
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
/**
 * Clone an object
 */
function clone(obj) {
    var cloneObj = {};
    for (var key in obj) {
        // Clone array
        if (Array.isArray(obj[key])) {
            cloneObj[key] = [];
            for (let i = 0; i < obj[key].length; i++) {
                const element = obj[key][i];
                if (Array.isArray(element)) {
                    const n = clone({ array: element });
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
/**
 * Do a clone with JSON.parse/JSON.stringify.
 */
function deep_clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * Transform an KeyValue object into an array
 */
function to_array(obj) {
    return Object.keys(obj).map((key) => {
        return obj[key];
    });
}

var _ObjectIndex = /*#__PURE__*/Object.freeze({
    merge: merge,
    expose: expose,
    omit: omit,
    flat: flat$1,
    deflat: deflat,
    immutable: immutable,
    clone: clone,
    deep_clone: deep_clone,
    to_array: to_array
});

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
function pipe_async(value) {
    return _pipe_async(value, (v) => v);
}
function pipe_sync(value) {
    return _pipe_sync(value, (v) => v);
}

var _PipeIndex = /*#__PURE__*/Object.freeze({
    pipe_async: pipe_async,
    pipe_sync: pipe_sync
});

class PipeArray {
    constructor(items, async = false) {
        this.async = async;
        if (async) {
            this.pipeAsync = pipe_async(items);
        }
        else {
            this.pipeSync = pipe_sync(items);
        }
    }
    filter(cb) {
        if (this.async) {
            this.pipeAsync.pipe((items) => items.filter(cb));
        }
        else {
            this.pipeSync.pipe((items) => items.filter(cb));
        }
        return this;
    }
    sort() {
        if (this.async) {
            this.pipeAsync.pipe((items) => sort(items));
        }
        else {
            this.pipeSync.pipe((items) => sort(items));
        }
        return this;
    }
    shuffle() {
        if (this.async) {
            this.pipeAsync.pipe((items) => shuffle(items));
        }
        else {
            this.pipeSync.pipe((items) => shuffle(items));
        }
        return this;
    }
    inverse() {
        if (this.async) {
            this.pipeAsync.pipe((items) => inverse(items));
        }
        else {
            this.pipeSync.pipe((items) => inverse(items));
        }
        return this;
    }
    unique() {
        if (this.async) {
            this.pipeAsync.pipe((items) => unique(items));
        }
        else {
            this.pipeSync.pipe((items) => unique(items));
        }
        return this;
    }
    similarity(arr0) {
        if (this.async) {
            this.pipeAsync.pipe((items) => similarity(items, arr0));
        }
        else {
            this.pipeSync.pipe((items) => similarity(items, arr0));
        }
        return this;
    }
    difference(arr0) {
        if (this.async) {
            this.pipeAsync.pipe((items) => difference(items, arr0));
        }
        else {
            this.pipeSync.pipe((items) => difference(items, arr0));
        }
        return this;
    }
    value() {
        if (this.async) {
            return this.pipeAsync.value();
        }
        return this.pipeSync.value();
    }
}

var _PipeArray = /*#__PURE__*/Object.freeze({
    PipeArray: PipeArray
});

function promise(callback) {
    return new Promise(callback);
}
function resolve(value) {
    return new Promise((r) => r(value));
}
function defer() {
    const def = {
        promise: new Promise((resolve, reject) => {
            def.resolve = resolve;
            def.reject = reject;
        })
    };
    return def;
}
function defer_all(promises) {
    return Promise.all(promises.map(p => p.promise));
}

var _PromiseIndex = /*#__PURE__*/Object.freeze({
    promise: promise,
    resolve: resolve,
    defer: defer,
    defer_all: defer_all
});

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Cache {
    constructor() {
        this.items = {};
    }
    get(key) {
        return this.items[key];
    }
    set(key, resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.items[key])
                return this.items[key].promise;
            const d = this.create(key);
            if (typeof resolve == 'function') {
                const res = resolve;
                d.resolve(yield res());
            }
            else {
                d.resolve(resolve);
            }
            return d.promise;
        });
    }
    create(key) {
        if (this.items[key])
            return this.items[key];
        return this.items[key] = defer();
    }
    createBatch(keys) {
        let records = [];
        for (let i = 0; i < keys.length; i++) {
            records.push(this.create(keys[i]));
        }
        return records;
    }
    createBatchByKey(keys) {
        let records = {};
        for (let i = 0; i < keys.length; i++) {
            records[keys[i]] = this.create(keys[i]);
        }
        return records;
    }
    remove(key) {
        delete this.items[key];
    }
    removeBatch(keys) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            this.remove(key);
        }
    }
    resolve(key, value) {
        if (!this.items[key]) {
            throw new Error(`[Cache] No item with key "${key}" found`);
        }
        this.items[key].resolve(value);
    }
    resolveBatch(items, keys = ['key', 'value']) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            this.resolve(item[keys[0]], item[keys[1]]);
        }
    }
    reject(key, value) {
        if (!this.items[key]) {
            throw new Error(`[Cache] No item with key "${key}" found`);
        }
        this.items[key].reject(value);
    }
    rejectBatch(items, keys = ['key', 'value']) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            this.reject(item[keys[0]], item[keys[1]]);
        }
    }
}

var _PromiseCache = /*#__PURE__*/Object.freeze({
    Cache: Cache
});

function milliseconds(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function seconds(s) {
    return new Promise((resolve) => {
        setTimeout(resolve, s * 1000);
    });
}
function minutes(mn) {
    return new Promise((resolve) => {
        setTimeout(resolve, mn * 60 * 1000);
    });
}
function hours(h) {
    return new Promise((resolve) => {
        setTimeout(resolve, h * 60 * 60 * 1000);
    });
}

var _PromiseTime = /*#__PURE__*/Object.freeze({
    milliseconds: milliseconds,
    seconds: seconds,
    minutes: minutes,
    hours: hours
});

function word(min = 2, max = 15) {
    const vowels = iterator("aeiouy".split(""), { loop: true, random: true });
    const consonants = iterator("bcdfghjklmnpqrstvwxz".split(''), { loop: true, random: true });
    let length = min + (Math.random() * (max - min));
    let isVowel = 0;
    let isConsonant = 0;
    function generate(letters, word, is_vowels = false) {
        const l = letters.next().value;
        if (is_vowels) {
            isVowel++;
        }
        else {
            isConsonant++;
        }
        if (isVowel >= 2) {
            isVowel = 0;
            letters = consonants;
            is_vowels = false;
        }
        if (isConsonant >= 2) {
            isConsonant = 0;
            letters = vowels;
            is_vowels = true;
        }
        word += l;
        return word.length >= length ? word : generate(letters, word, is_vowels);
    }
    return generate(Math.random() > 0.5 ? vowels : consonants, "");
}
function phone() {
    const numbers = iterator("0123456789".split(''), { loop: true, random: true });
    const p = iterator("123456789".split(''), { loop: true, random: true });
    let phone = [p.next().value];
    for (let i = 0; i < 4; i++) {
        phone.push([numbers.next().value, numbers.next().value].join(''));
    }
    let prefix = '+';
    const count = 2 + Math.floor(Math.random() * 3);
    for (let j = 0; j < count; j++) {
        prefix += numbers.next().value;
    }
    return prefix + '(0)' + phone.join(' ');
}

var _StringGenerate = /*#__PURE__*/Object.freeze({
    word: word,
    phone: phone
});

/**
 * Generate a random string chain
 */
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
/**
 * Generate a guid
 */
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var _StringGuid = /*#__PURE__*/Object.freeze({
    s4: s4,
    guid: guid
});

const TRIM_SPACE_REGEX = new RegExp('(^\\s+|\\s+$)', 'g');
/**
 * Remove white spaces at the beginning and at the end of the string
 */
function trimWhiteSpace(str) {
    return str.replace(TRIM_SPACE_REGEX, '');
}
/**
 * Append or preprend a character to a string
 */
function pad(str, limit = 2, char = "0", insertAfter = false) {
    var s = str.toString();
    if (s.length < limit) {
        if (insertAfter)
            s = s + char;
        else
            s = char + s;
        return pad(s, limit, char, insertAfter);
    }
    return s;
}
/**
 * Slug string
 */
function toSlug(str) {
    return str.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
/**
 * Camel case
 */
function toCamelCase(str) {
    str = toSlug(str);
    var words = str.split('-').map(function (word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
    });
    return words.join('');
}
/**
 * Slugify a string and replace tiret to underscore
 */
function toUnderscore(str) {
    return toSlug(str).replace(/-+/, '_');
}
/**
 * Capitalize
 */
function toCapitalize(str) {
    var strs = str.split(/\s/g);
    strs = strs.map(function (s) {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
    });
    return strs.join(' ');
}
/**
 * Capitalize first letter
 */
function toUCFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Generate version from datetime
 */
function generateVersionFromDate() {
    const now = new Date();
    const date = pad(now.getDate() + "", 2, "0");
    const month = pad((now.getMonth() + 1) + "", 2, "0");
    const year = pad(now.getFullYear() + "", 4, "0");
    const hours = pad(now.getHours() + "", 2, "0");
    const minutes = pad(now.getMinutes() + "", 2, "0");
    const seconds = pad(now.getSeconds() + "", 2, "0");
    return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
}

var _StringIndex = /*#__PURE__*/Object.freeze({
    trimWhiteSpace: trimWhiteSpace,
    pad: pad,
    toSlug: toSlug,
    toCamelCase: toCamelCase,
    toUnderscore: toUnderscore,
    toCapitalize: toCapitalize,
    toUCFirst: toUCFirst,
    generateVersionFromDate: generateVersionFromDate
});

/**
 * Clean path
 */
function cleanPath(path) {
    path = toUnixPath(path);
    path = path.replace(/^\.\/|\/$/g, '');
    return path;
}
/**
 *
 */
function toUnixPath(pth) {
    pth = pth.replace(/\\/g, '/');
    const double = /\/\//;
    while (pth.match(double)) {
        pth = pth.replace(double, '/'); // node on windows doesn't replace doubles
    }
    return pth;
}
/**
 * Remove extras
 */
function removeSearch(pth) {
    return pth.split(/\?|\#/)[0];
}

var _StringPath = /*#__PURE__*/Object.freeze({
    cleanPath: cleanPath,
    toUnixPath: toUnixPath,
    removeSearch: removeSearch
});

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
function template(string, obj = {}, regex = _TEMPLATE_REGEX) {
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
function template2(string, obj = {}, options = Template2DefaultOptions) {
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

var _StringTemplate = /*#__PURE__*/Object.freeze({
    template: template,
    template2: template2
});

function toString(parameters) {
    return Object.keys(parameters).map((key) => {
        return `${key}=${parameters[key]}`;
    }).join('&');
}
function toObject(body) {
    const items = body.split('&');
    const parameters = {};
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const kv = item.split('=');
        parameters[kv[0]] = kv[1];
    }
    return parameters;
}

var _Url = /*#__PURE__*/Object.freeze({
    toString: toString,
    toObject: toObject
});

const Array$1 = _ArrayIndex;
const ArrayIterator = _ArrayIterator;
const Canvas = _Canvas;
const Dispatcher$1 = _Dispatcher;
const DomAudio = _DomAudio;
const DomFile = _DomFile;
const DomImage = _DomImage;
const DomNet = _DomNet;
const DomRaf = _DomRaf;
const DomVideo = _DomVideo;
const Error$1 = _Error;
const Function = _Function;
const List$1 = _ListIndex;
const ListUtils = _ListUtils;
const Math$1 = _Math;
const ObjectDefine = _ObjectDefine;
const Object$1 = _ObjectIndex;
const PipeArray$1 = _PipeArray;
const Pipe = _PipeIndex;
const PromiseCache = _PromiseCache;
const Promise$1 = _PromiseIndex;
const PromiseTime = _PromiseTime;
const StringGenerate = _StringGenerate;
const StringGuid = _StringGuid;
const String = _StringIndex;
const StringPath = _StringPath;
const StringTemplate = _StringTemplate;
const Url = _Url;

exports.Array = Array$1;
exports.ArrayIterator = ArrayIterator;
exports.Canvas = Canvas;
exports.Dispatcher = Dispatcher$1;
exports.DomAudio = DomAudio;
exports.DomFile = DomFile;
exports.DomImage = DomImage;
exports.DomNet = DomNet;
exports.DomRaf = DomRaf;
exports.DomVideo = DomVideo;
exports.Error = Error$1;
exports.Function = Function;
exports.List = List$1;
exports.ListUtils = ListUtils;
exports.Math = Math$1;
exports.Object = Object$1;
exports.ObjectDefine = ObjectDefine;
exports.Pipe = Pipe;
exports.PipeArray = PipeArray$1;
exports.Promise = Promise$1;
exports.PromiseCache = PromiseCache;
exports.PromiseTime = PromiseTime;
exports.String = String;
exports.StringGenerate = StringGenerate;
exports.StringGuid = StringGuid;
exports.StringPath = StringPath;
exports.StringTemplate = StringTemplate;
exports.Url = Url;
