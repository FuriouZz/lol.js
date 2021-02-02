var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// lib/index-dom.ts
__export(exports, {
  _: () => _2
});

// lib/array/index.ts
var array_exports = {};
__export(array_exports, {
  chunk: () => chunk,
  difference: () => difference,
  flat: () => flat,
  generate: () => generate,
  generate_enumeration: () => generate_enumeration,
  inverse: () => inverse,
  iterator: () => iterator,
  random: () => random,
  randomize: () => randomize,
  select: () => select,
  shuffle: () => shuffle,
  similarity: () => similarity,
  sort: () => sort,
  sortByKey: () => sortByKey,
  to_object: () => to_object,
  to_record: () => to_record,
  unique: () => unique
});

// lib/array/iterator.ts
function iterator(arr, options = {loop: false, random: false}) {
  let index = -1;
  const end = arr.length;
  arr = options.random ? shuffle(arr) : arr;
  const iterator2 = {
    next() {
      if (index < end - 1) {
        index++;
        return {value: arr[index], done: false};
      } else if (options.loop) {
        if (options.random)
          arr = shuffle(arr);
        index = -1;
        return iterator2.next();
      }
      return {value: arr[index - 1], done: true};
    }
  };
  return iterator2;
}

// lib/array/index.ts
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
var randomize = shuffle;
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
function inverse(arr) {
  let tmp = [];
  for (let ilen = arr.length - 1, i = ilen; i >= 0; i--) {
    tmp.push(arr[i]);
  }
  return tmp;
}
function unique(arr) {
  let tmp = [];
  for (let i = 0, ilen = arr.length; i < ilen; i++) {
    if (tmp.indexOf(arr[i]) === -1) {
      tmp.push(arr[i]);
    }
  }
  return tmp;
}
function chunk(array, count) {
  const arr = [];
  for (var i = 0, ilen = array.length; i < ilen; i += count) {
    arr.push(array.slice(i, i + count));
  }
  return arr;
}
function generate(callback) {
  const arr = [];
  let i = 0;
  let running = true;
  let previous;
  function stop_running() {
    running = false;
  }
  while (running) {
    previous = callback(i, stop_running, previous);
    arr.push(previous);
    i++;
  }
  return arr;
}
function generate_enumeration(count = 10, random2 = false) {
  return generate((index, stop_running, previous) => {
    if (index + 1 == count)
      stop_running();
    return random2 ? Math.random() : index;
  });
}
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
function difference(arr0, arr1) {
  const arr = [];
  for (let i = 0; i < arr0.length; i++) {
    const el0 = arr0[i];
    if (arr1.indexOf(el0) == -1)
      arr.push(el0);
  }
  return arr;
}
function to_record(arr, cb) {
  const record = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = cb(item);
    record[key] = item;
  }
  return record;
}
var to_object = to_record;
function flat(arr) {
  return [].concat(...arr);
}
function select(arr, index) {
  return arr[index];
}
function random(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return select(arr, index);
}

// lib/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  List: () => List,
  OrderedSet: () => OrderedSet,
  Queue: () => Queue
});

// lib/collections/list.ts
var List = class {
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
    const item = {value};
    let previous = this._root;
    let current = previous.next;
    let i = 0;
    while (i < index && current) {
      previous = current;
      current = current.next;
      i++;
    }
    if (previous.next)
      item.next = previous.next;
    previous.next = item;
    this._count++;
    return index;
  }
  removeAt(index) {
    let previous = this._root;
    let current = previous.next;
    let i = 0;
    while (i < index && current) {
      previous = current;
      current = current.next;
      i++;
    }
    if (!current)
      return null;
    previous.next = current.next;
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
  has(value) {
    return this.indexOf(value) > -1;
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
    arr.values;
    return arr;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  values() {
    let current = this._root.next;
    return {
      [Symbol.iterator]: () => {
        return this.values();
      },
      next() {
        if (current) {
          const value = current.value;
          current = current.next;
          return {
            done: false,
            value
          };
        }
        return {
          done: true,
          value: null
        };
      }
    };
  }
  clear() {
    while (this.length > 0) {
      this.pop();
    }
  }
};

// lib/collections/ordered-set.ts
var OrderedSet = class {
  constructor() {
    this.items = [];
  }
  get size() {
    return this.items.length;
  }
  add(v) {
    if (!this.has(v)) {
      this.items.push(v);
    }
  }
  insertAt(v, index) {
    if (!this.has(v)) {
      this.items.splice(index, 0, v);
    }
  }
  index(v) {
    return this.items.indexOf(v);
  }
  get(index) {
    return this.items[index];
  }
  has(v) {
    return this.items.indexOf(v) > -1;
  }
  remove(v) {
    const index = this.items.indexOf(v);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
  removeAt(index) {
    this.items.splice(index, 1);
  }
  clear() {
    this.items = [];
  }
  shift() {
    return this.items.shift();
  }
  pop() {
    return this.items.pop();
  }
  join(separator) {
    return this.items.join(separator);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  values() {
    const len = this.size;
    const items = this.items.slice(0);
    let index = -1;
    return {
      next() {
        if (index + 1 < len) {
          index++;
          const value = items[index];
          return {
            done: false,
            value
          };
        } else {
          return {
            done: true,
            value: null
          };
        }
      }
    };
  }
  entries() {
    const len = this.size;
    const items = this.items.slice(0);
    let index = -1;
    return {
      next() {
        if (index + 1 < len) {
          index++;
          const value = items[index];
          return {
            done: false,
            value: [index, value]
          };
        } else {
          return {
            done: true,
            value: null
          };
        }
      }
    };
  }
  forEach(cb) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      cb(item, i, this);
    }
  }
  map(cb) {
    const set = new OrderedSet();
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      set.add(cb(item, i, this));
    }
    return set;
  }
  filter(predicate) {
    const set = new OrderedSet();
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (predicate(item, i, this)) {
        set.add(item);
      }
    }
    return set;
  }
  clone() {
    const set = new OrderedSet();
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      set.add(item);
    }
    return set;
  }
};

// lib/dispatcher.ts
var dispatcher_exports = {};
__export(dispatcher_exports, {
  Dispatcher: () => Dispatcher
});
var Dispatcher = class {
  constructor() {
    this.listeners = new List();
  }
  on(listener) {
    this.listeners.add({once: false, fn: listener});
  }
  once(listener) {
    this.listeners.add({once: true, fn: listener});
  }
  off(listener) {
    for (const l of this.listeners) {
      if (l.fn == listener) {
        this.listeners.remove(l);
        break;
      }
    }
  }
  dispatch(value) {
    for (const listener of this.listeners) {
      listener.fn(value);
      if (listener.once) {
        this.listeners.remove(listener);
      }
    }
  }
};

// lib/collections/queue.ts
var Queue = class {
  constructor() {
    this.unresolved = [];
    this.items = new OrderedSet();
    this.onresolve = new Dispatcher();
  }
  pushFront(...keys) {
    for (const key of keys.reverse()) {
      this.items.insertAt(key, 0);
    }
    this.resolveDependencies();
    return this;
  }
  pushBack(...keys) {
    for (const key of keys) {
      this.items.add(key);
    }
    this.resolveDependencies();
    return this;
  }
  pushBefore(before, ...keys) {
    for (const key of keys.reverse()) {
      if (!this.items.has(before)) {
        this.unresolved.push({key, relative: before, move: "before"});
      } else {
        const index = this.items.index(before);
        this.items.insertAt(key, index);
        this.resolveDependencies();
      }
      before = key;
    }
    return this;
  }
  pushAfter(after, ...keys) {
    for (const key of keys) {
      if (!this.items.has(after)) {
        this.unresolved.push({key, relative: after, move: "after"});
      } else {
        const index = this.items.index(after) + 1;
        this.items.insertAt(key, index);
        this.resolveDependencies();
      }
      after = key;
    }
    return this;
  }
  swap(first, second) {
    if (this.items.has(first) && this.items.has(second)) {
      const i0 = this.items.index(first);
      const i1 = this.items.index(second);
      const imin = Math.min(i0, i1);
      const imax = Math.max(i0, i1);
      this.items.removeAt(imax);
      this.items.removeAt(imin);
      if (i0 === imin) {
        this.items.insertAt(second, i0);
        this.items.insertAt(first, i1);
      } else {
        this.items.insertAt(first, i1);
        this.items.insertAt(second, i0);
      }
      this.resolveDependencies();
    } else {
      this.unresolved.push({key: first, relative: second, move: "swap"});
    }
    return this;
  }
  replace(replaced, ...keys) {
    if (!this.items.has(replaced)) {
      let prev;
      for (const key of keys) {
        if (prev) {
          this.unresolved.push({key, relative: prev, move: "after"});
        } else {
          this.unresolved.push({key, relative: replaced, move: "replace"});
        }
        prev = key;
      }
    } else {
      let prev = replaced;
      for (const key of keys) {
        this.pushAfter(key, prev);
        prev = key;
      }
      this.items.remove(replaced);
      this.resolveDependencies();
    }
    return this;
  }
  remove(...keys) {
    for (const key of keys) {
      if (this.items.has(key)) {
        this.items.remove(key);
      } else {
        this.unresolved.push({key: null, relative: key, move: "remove"});
      }
    }
    return this;
  }
  resolveDependencies() {
    if (this.unresolved.length === 0)
      return;
    let pendings = [];
    while (this.unresolved.length > 0) {
      const pending = this.unresolved.shift();
      if (!pending)
        return;
      if (!this.items.has(pending.relative)) {
        pendings.push(pending);
        continue;
      }
      if (pending.move === "before") {
        this.pushBefore(pending.relative, pending.key);
      } else if (pending.move === "after") {
        this.pushAfter(pending.relative, pending.key);
      } else if (pending.move === "replace") {
        this.replace(pending.relative, pending.key);
      } else if (pending.move === "swap") {
        this.swap(pending.key, pending.relative);
      } else if (pending.move === "remove") {
        this.remove(pending.relative);
      }
      this.onresolve.dispatch(pending);
      this.unresolved.unshift(...pendings);
      pendings = [];
    }
    this.unresolved = pendings;
  }
  toString() {
    return this.items["items"];
  }
};

// lib/object/index.ts
var object_exports = {};
__export(object_exports, {
  clone: () => clone,
  deep_clone: () => deep_clone,
  deflat: () => deflat,
  expose: () => expose,
  flat: () => flat2,
  immutable: () => immutable,
  merge: () => merge,
  omit: () => omit,
  parse: () => parse,
  toObject: () => toObject,
  toString: () => toString,
  to_array: () => to_array
});

// lib/object/argv.ts
var KEY_REG = /^-{1,2}/;
var EQUAL_REG = /=/;
function parse(argv) {
  const parameters = {};
  let key = "";
  let index = 0;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.match(KEY_REG)) {
      const split = arg.split(EQUAL_REG);
      key = split[0].replace(KEY_REG, "");
      if (split[1]) {
        parameters[key] = split[1];
      } else if (argv[i + 1] && !argv[i + 1].match(KEY_REG)) {
        parameters[key] = argv[i + 1];
        i++;
      } else {
        parameters[key] = true;
      }
      continue;
    } else {
      parameters[index] = arg;
      index++;
    }
  }
  return parameters;
}

// lib/object/url.ts
function toString(parameters) {
  return Object.keys(parameters).map((key) => {
    return `${key}=${parameters[key]}`;
  }).join("&");
}
function toObject(body) {
  const items = body.split("&");
  const parameters = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const kv = item.split("=");
    parameters[kv[0]] = kv[1];
  }
  return parameters;
}

// lib/object/index.ts
function _merge(obj0, obj1) {
  for (var key in obj1) {
    if (Array.isArray(obj1[key])) {
      obj0[key] = Array.isArray(obj0[key]) ? obj0[key] : [];
      obj0[key] = obj0[key].concat(obj1[key].slice(0));
    } else if (typeof obj1[key] === "object" && obj1[key] !== null) {
      if (typeof obj0[key] === "object" && obj0[key] !== null) {
        obj0[key] = merge(obj0[key], obj1[key]);
      } else {
        obj0[key] = obj1[key];
      }
    } else {
      obj0[key] = obj1[key];
    }
  }
  return obj0;
}
function merge(obj, ...objs) {
  var i = 0;
  var len = objs.length;
  for (i = 0; i < len; i++) {
    obj = _merge(obj, objs[i]);
  }
  return obj;
}
function expose(obj, ...keys) {
  var xprt = {};
  for (var i = 0, ilen = keys.length; i < ilen; i++) {
    if (keys[i] && obj.hasOwnProperty(keys[i])) {
      xprt[keys[i]] = obj[keys[i]];
    }
  }
  return xprt;
}
function omit(obj, ...keys) {
  var xprt = {};
  for (var key in obj) {
    if (keys.indexOf(key) == -1) {
      xprt[key] = obj[key];
    }
  }
  return xprt;
}
function flat2(obj) {
  var xprt = {};
  for (var key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      var children = flat2(obj[key]);
      for (var k in children) {
        xprt[key + "." + k] = children[k];
      }
    } else {
      xprt[key] = obj[key];
    }
  }
  return xprt;
}
function deflat(obj) {
  var xprt = {};
  Object.keys(obj).forEach((id) => {
    const keys = id.split(".");
    let current = xprt;
    keys.forEach((key, i) => {
      if (i == keys.length - 1) {
        current[key] = obj[id];
      } else {
        current[key] = current[key] || {};
      }
      current = current[key];
    });
  });
  return xprt;
}
function immutable(obj) {
  var propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(function(name) {
    var prop = obj[name];
    if (typeof prop == "object" && prop !== null) {
      immutable(prop);
    }
  });
  return Object.isFrozen(obj) ? obj : Object.freeze(obj);
}
function clone(obj) {
  var cloneObj = {};
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      cloneObj[key] = [];
      for (let i = 0; i < obj[key].length; i++) {
        const element = obj[key][i];
        if (Array.isArray(element)) {
          const n = clone({array: element});
          cloneObj[key].push(n.array);
        } else if (typeof element == "object" && element !== null) {
          cloneObj[key].push(clone(element));
        } else {
          cloneObj[key].push(element);
        }
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      cloneObj[key] = clone(obj[key]);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}
function deep_clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function to_array(obj) {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
}

// lib/pipe/index.ts
var pipe_exports = {};
__export(pipe_exports, {
  pipe_async: () => pipe_async,
  pipe_sync: () => pipe_sync
});
function _pipe_async(value, action, parameters) {
  const _params = parameters || [];
  const promise = new Promise((resolve) => {
    if (value instanceof Promise) {
      value.then((newValue) => {
        resolve(action(newValue, ..._params));
      });
    } else {
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
    pipe(callback, ...parameters2) {
      return _pipe_sync(result, callback, parameters2);
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

// lib/promise/index.ts
var promise_exports = {};
__export(promise_exports, {
  defer: () => defer,
  defer_all: () => defer_all
});
function defer() {
  const def = {};
  def.promise = new Promise(function(resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
}
function defer_all(promises) {
  return Promise.all(promises.map((p) => p.promise));
}

// lib/string/index.ts
var string_exports = {};
__export(string_exports, {
  pad: () => pad,
  toCamelCase: () => toCamelCase,
  toCapitalize: () => toCapitalize,
  toSlug: () => toSlug,
  toUCFirst: () => toUCFirst,
  toUnderscore: () => toUnderscore,
  trimWhiteSpace: () => trimWhiteSpace
});
var TRIM_SPACE_REGEX = new RegExp("(^\\s+|\\s+$)", "g");
function trimWhiteSpace(str) {
  return str.replace(TRIM_SPACE_REGEX, "");
}
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
function toSlug(str) {
  return str.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
function toCamelCase(str) {
  str = toSlug(str);
  var words = str.split("-").map(function(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  });
  return words.join("");
}
function toUnderscore(str) {
  return toSlug(str).replace(/-+/, "_");
}
function toCapitalize(str) {
  var strs = str.split(/\s/g);
  strs = strs.map(function(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  });
  return strs.join(" ");
}
function toUCFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// lib/emitter.ts
var emitter_exports = {};
__export(emitter_exports, {
  Emitter: () => Emitter
});
var Emitter = class {
  constructor() {
    this.listeners = {};
  }
  getOrCreateListener(name) {
    let n = name;
    return this.listeners[n] = this.listeners[n] || new List();
  }
  on(name, cb) {
    this.getOrCreateListener(name).push({once: false, cb});
  }
  once(name, cb) {
    this.getOrCreateListener(name).push({once: true, cb});
  }
  off(name, cb) {
    const listeners = this.getOrCreateListener(name);
    for (const listener of listeners) {
      if (listener.cb == cb) {
        listeners.remove(listener);
        break;
      }
    }
  }
  dispatch(name, value) {
    const n = name;
    const listeners = this.listeners[n];
    if (listeners) {
      for (const listener of listeners) {
        listener.cb({
          event: name,
          value
        });
        if (listener.once)
          listeners.remove(listener);
      }
    }
  }
};

// lib/error.ts
var error_exports = {};
__export(error_exports, {
  try_or: () => try_or
});
function try_or(callback, default_value, message) {
  let value;
  try {
    value = callback();
  } catch (e) {
    value = default_value;
    console.log(message || e);
  }
  return value;
}

// lib/function.ts
var function_exports = {};
__export(function_exports, {
  bind: () => bind,
  scope: () => scope
});
function scope(fn, context = null) {
  return function $scope(...args) {
    return fn.apply(context, args);
  };
}
function bind(context, ...methods) {
  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];
    const fn = context[method];
    if (typeof fn === "function") {
      context[method] = fn.bind(context);
    }
  }
}

// lib/index.ts
var _ = {
  array: array_exports,
  collections: collections_exports,
  object: object_exports,
  pipe: pipe_exports,
  promise: promise_exports,
  string: string_exports,
  dispatcher: dispatcher_exports,
  emitter: emitter_exports,
  error: error_exports,
  function: function_exports
};

// lib/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  Net: () => Net,
  RAF: () => RAF,
  createDocument: () => createDocument,
  createElement: () => createElement,
  createElements: () => createElements,
  drawEllipse: () => drawEllipse,
  getAudioMetadata: () => getAudioMetadata,
  getImageMetadata: () => getImageMetadata,
  getVideoMetadata: () => getVideoMetadata,
  load: () => load,
  loadAudio: () => loadAudio,
  loadFile: () => loadFile,
  loadImage: () => loadImage,
  removeChildren: () => removeChildren,
  saveAs: () => saveAs
});

// lib/dom/audio.ts
function getAudioMetadata($audio) {
  return {
    url: $audio.src,
    duration: $audio.duration
  };
}
function loadAudio(url, beforeLoad) {
  return new Promise((resolve, reject) => {
    const $audio = document.createElement("audio");
    if (typeof beforeLoad === "function")
      beforeLoad($audio);
    $audio.addEventListener("error", reject, {once: true});
    $audio.addEventListener("loadedmetadata", () => {
      resolve({
        element: $audio,
        ...getAudioMetadata($audio)
      });
    }, {once: true});
    $audio.src = url;
  });
}

// lib/math.ts
var PI2 = Math.PI * 2;
var RAG2DEG = 180 / Math.PI;
var DEG2RAD = Math.PI / 180;

// lib/dom/canvas.ts
function drawEllipse(ctx, centerX, centerY, width, height) {
  ctx.save();
  ctx.scale(width / width, height / width);
  ctx.arc(centerX, centerY, width * 0.5, 0, PI2, false);
  ctx.restore();
}

// lib/dom/download.ts
function saveAs(data, filename = "file.json", type = "application/json") {
  return new Promise((resolve) => {
    const blob = new Blob([data], {type});
    const $a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    $a.href = url;
    $a.download = filename;
    document.body.appendChild($a);
    $a.click();
    setTimeout(() => {
      document.body.removeChild($a);
      window.URL.revokeObjectURL(url);
      resolve();
    }, 100);
  });
}

// lib/dom/file.ts
function loadFile(file, type, beforeLoad) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (typeof beforeLoad === "function")
      beforeLoad(reader);
    reader.addEventListener("error", reject, {once: true});
    reader.addEventListener("load", () => {
      if (!reader.result) {
        reject("[FileReader] No result found");
        return;
      }
      resolve({
        file,
        type,
        reader,
        response: reader.result
      });
    }, {once: true});
    if (type == "arraybuffer") {
      reader.readAsArrayBuffer(file);
    } else if (type == "binarystring") {
      reader.readAsBinaryString(file);
    } else if (type == "dataurl") {
      reader.readAsDataURL(file);
    } else if (type == "text") {
      reader.readAsText(file);
    }
  });
}

// lib/dom/image.ts
function getImageMetadata($img) {
  return {
    url: $img.src,
    width: $img.naturalWidth,
    height: $img.naturalHeight,
    ratio: $img.naturalWidth / $img.naturalHeight
  };
}
function loadImage(url, beforeLoad) {
  return new Promise((resolve, reject) => {
    const $img = new Image();
    if (typeof beforeLoad === "function")
      beforeLoad($img);
    $img.addEventListener("load", () => {
      resolve({
        element: $img,
        ...getImageMetadata($img)
      });
    }, {once: true});
    $img.addEventListener("error", reject, {once: true});
    $img.src = url;
  });
}

// lib/dom/net.ts
function response_format(request, options) {
  var response;
  if (options.responseType && options.responseType.match(/json/gi) && request.hasOwnProperty("responseText")) {
    response = JSON.parse(request.responseText);
  } else if (options.responseType && options.responseType.match(/json/gi) && typeof request.response === "string") {
    response = JSON.parse(request.response);
  } else {
    response = request.response;
  }
  return response;
}
var Net = class {
  static xhr(url, options) {
    const opts = Object.assign({
      method: "GET",
      responseType: ""
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
      responseType: "text"
    }, options || {}));
  }
  static json(url, options) {
    return Net.xhr(url, Object.assign({
      responseType: "json"
    }, options || {}));
  }
  static bytes(url, options) {
    return Net.xhr(url, Object.assign({
      responseType: "arraybuffer"
    }, options || {}));
  }
};

// lib/string/guid.ts
function s4() {
  return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
}
function guid() {
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

// lib/dom/raf.ts
var RAF2 = class {
  static get time() {
    return RAF2._time;
  }
  static get deltaTime() {
    return RAF2._deltaTime;
  }
  static getFramerate() {
    return 1 / RAF2._framerate * 1e3;
  }
  static setFramerate(value) {
    RAF2._framerate = 1 / value * 1e3;
  }
  static _update() {
    if (!RAF2._running)
      return;
    RAF2._time = performance.now();
    RAF2._deltaTime = RAF2._time - RAF2._lt;
    RAF2._elapsedInterval += RAF2._deltaTime;
    if (RAF2._elapsedInterval >= RAF2._framerate) {
      RAF2._elapsedInterval = 0;
      RAF2._processUpdate();
    }
    RAF2._lt = RAF2._time;
    RAF2._raf = window.requestAnimationFrame(RAF2._update);
  }
  static _processUpdate() {
    for (const [_id, update] of RAF2._listeners) {
      update(RAF2._deltaTime, RAF2._time);
    }
  }
  static add(listener, id) {
    if (!id)
      id = guid();
    this._listeners.push([id, listener]);
    return id;
  }
  static delete(listenerOrId) {
    const index = this._listeners.findIndex(([id, listener]) => {
      return listenerOrId === id || listenerOrId === listener;
    });
    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }
  static start() {
    if (RAF2._running)
      return;
    RAF2._running = true;
    RAF2._raf = window.requestAnimationFrame(RAF2._update);
  }
  static stop() {
    if (!RAF2._running)
      return;
    RAF2._running = false;
    window.cancelAnimationFrame(RAF2._raf);
  }
};
var RAF = RAF2;
RAF._listeners = [];
RAF._framerate = 16;
RAF._deltaTime = 0;
RAF._time = performance.now();
RAF._lt = performance.now();
RAF._elapsedInterval = 0;
RAF._raf = -1;
RAF._running = false;

// lib/dom/video.ts
function getVideoMetadata($video) {
  return {
    url: $video.src,
    width: $video.videoWidth,
    height: $video.videoHeight,
    ratio: $video.videoWidth / $video.videoHeight,
    poster: $video.poster
  };
}
function load(url, beforeLoad) {
  return new Promise((resolve, reject) => {
    const $video = document.createElement("video");
    if (typeof beforeLoad === "function")
      beforeLoad($video);
    $video.addEventListener("error", reject, {once: true});
    $video.addEventListener("loadedmetadata", () => {
      resolve({
        element: $video,
        ...getVideoMetadata($video)
      });
    }, {once: true});
    $video.src = url;
  });
}

// lib/dom/index.ts
var PARSER = new DOMParser();
function createElement(template) {
  let is_text_node = false;
  template = template.trim();
  if (template.length === 0) {
    is_text_node = true;
    template = ".";
  }
  const doc = PARSER.parseFromString(template, "text/html");
  const $node = doc.body.childNodes[0];
  if (is_text_node) {
    $node.textContent = "";
  }
  return $node;
}
function createElements(template) {
  template = template.trim();
  const doc = PARSER.parseFromString(template, "text/html");
  const $nodes = Array.from(doc.body.childNodes);
  return $nodes;
}
function createDocument(template) {
  template = template.trim();
  const doc = PARSER.parseFromString(template, "text/html");
  return doc;
}
function removeChildren($el) {
  while ($el.firstChild) {
    if ($el.lastChild == null) {
      break;
    }
    $el.lastChild.remove();
  }
}

// lib/index-dom.ts
var _2 = {
  dom: dom_exports,
  ..._
};
