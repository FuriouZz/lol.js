var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// lib/index-node.ts
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

// lib/node/index.ts
var node_exports = {};
__export(node_exports, {
  Exec: () => Exec,
  MemoryStream: () => MemoryStream,
  appendFile: () => appendFile2,
  copy: () => copy,
  editFile: () => editFile,
  editFileSync: () => editFileSync,
  ensureDir: () => ensureDir,
  ensureDirSync: () => ensureDirSync,
  exec: () => exec,
  execParallel: () => execParallel,
  execSerie: () => execSerie,
  exists: () => exists,
  fetch: () => fetch,
  fetchDirs: () => fetchDirs,
  isDirectory: () => isDirectory,
  isFile: () => isFile,
  isSymbolicLink: () => isSymbolicLink,
  mkdir: () => mkdir2,
  move: () => move,
  readEnvFile: () => readEnvFile,
  readFile: () => readFile2,
  remove: () => remove,
  removeDir: () => removeDir,
  removeDirSync: () => removeDirSync,
  removeSync: () => removeSync,
  rename: () => rename,
  requireContent: () => requireContent,
  requireJSON: () => requireJSON,
  symlink: () => symlink2,
  symlink2: () => symlink22,
  touch: () => touch,
  writeFile: () => writeFile2,
  writeFileSync: () => writeFileSync2
});

// lib/node/env.ts
var import_fs = __toModule(require("fs"));
function readEnvFile(global = true) {
  const result = {};
  const _env = process.env["NODE_ENV"];
  let filename = `.env`;
  if (_env)
    filename += `.${_env}`;
  try {
    const lines = import_fs.readFileSync(filename, {encoding: "utf-8"}).split(/\r?\n/);
    for (const line of lines) {
      let [key, value] = line.split(/=/);
      key = key.trim();
      value = value.trim();
      if (key[0] === "#")
        continue;
      if (global)
        process.env[key] = value;
      result[key] = value;
    }
  } catch (e) {
  }
  return result;
}

// lib/node/exec.ts
var import_child_process = __toModule(require("child_process"));
var Exec = class {
  constructor() {
    this.defer = defer();
    this.stdio = [void 0, void 0, void 0];
  }
  async then(onfulfilled, onrejected) {
    return this.defer.promise.then(onfulfilled);
  }
  async catch(onrejected) {
    return this.defer.promise.catch(onrejected);
  }
  promise() {
    return this.defer.promise;
  }
  run(command, options = {}) {
    options = Object.assign({
      shell: true,
      stdio: "pipe",
      color: true,
      extendEnv: true
    }, options);
    options.env = Object.assign({
      FORCE_COLOR: options.color
    }, options.extendEnv ? process.env : {}, options.env || {});
    const args = command.split(" ");
    const cmd = args.shift();
    if (typeof cmd !== "string")
      throw new Error(`No command to execute`);
    const ps = import_child_process.spawn(cmd, args, options);
    let stdout = Buffer.from("");
    let stderr = Buffer.from("");
    if (ps.stdin) {
      this.stdin = ps.stdin;
      this.stdio[0] = ps.stdin;
    }
    if (ps.stdout) {
      this.stdout = ps.stdout;
      this.stdio[1] = ps.stdout;
    }
    if (ps.stderr) {
      this.stderr = ps.stderr;
      this.stdio[2] = ps.stderr;
    }
    if (ps.stdout && options.fetchStdout) {
      ps.stdout.on("data", function(d) {
        const b = typeof d === "string" ? Buffer.from(d) : d;
        stdout = Buffer.concat([stdout, b]);
      });
    }
    if (ps.stderr && options.fetchStderr) {
      ps.stderr.on("data", function(d) {
        const b = typeof d === "string" ? Buffer.from(d) : d;
        stderr = Buffer.concat([stderr, b]);
      });
    }
    ps.on("error", (error) => {
      if (options.throwOnError) {
        this.defer.reject(error);
      }
    });
    ps.on("exit", (code, signal) => {
      this.defer.resolve({
        code,
        signal,
        stdout,
        stderr
      });
    });
    return this;
  }
};
function exec(command, options = {}) {
  const e = new Exec();
  return e.run(command, options);
}
function execParallel(commands) {
  return Promise.all(commands.map((c) => {
    if (typeof c === "string") {
      return exec(c).promise();
    }
    return exec(c.command, c.options).promise();
  }));
}
async function execSerie(commands) {
  for (let i = 0; i < commands.length; i++) {
    const c = commands[i];
    if (typeof c === "string") {
      await exec(c).promise();
    } else {
      await exec(c.command, c.options).promise();
    }
  }
}

// lib/node/fs.ts
var Fs = __toModule(require("fs"));
var import_filelist = __toModule(require("filelist"));
var import_path = __toModule(require("path"));
var import_child_process2 = __toModule(require("child_process"));
import_filelist.FileList.debug = false;
function isFile(path) {
  try {
    const stat = Fs.statSync(path);
    if (!stat.isFile())
      throw "Not a file";
  } catch (e) {
    return false;
  }
  return true;
}
function isDirectory(path) {
  try {
    const stat = Fs.statSync(path);
    if (!stat.isDirectory())
      throw "Not a file";
  } catch (e) {
    return false;
  }
  return true;
}
function exists(path) {
  try {
    Fs.statSync(path);
  } catch (e) {
    return false;
  }
  return true;
}
function copy(fromFile, toFile) {
  return new Promise(function(resolve, reject) {
    let fileValid = fromFile !== toFile;
    if (!fileValid)
      throw `Cannot copy '${fromFile}' to the same path`;
    fileValid = isFile(fromFile);
    if (!fileValid)
      throw `'${fromFile}' is not a file`;
    ensureDir(import_path.dirname(toFile)).then(function() {
      const rs = Fs.createReadStream(fromFile);
      const ws = Fs.createWriteStream(toFile);
      ws.on("error", function(error) {
        reject(error);
      });
      rs.on("error", function(error) {
        reject(error);
      });
      rs.on("end", function() {
        resolve(true);
      });
      rs.pipe(ws, {end: true});
    });
  });
}
function remove(path) {
  if (isDirectory(path))
    return removeDir(path);
  return new Promise((resolve, reject) => {
    if (!isFile(path))
      throw "Cannot be removed. This is not a file.";
    Fs.unlink(path, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
async function removeDir(dir) {
  const files = fetch(import_path.join(dir, "**/*"));
  for (let i = 0; i < files.length; i++) {
    await remove(files[i]);
  }
  const dirs = fetchDirs(import_path.join(dir, "**/*")).reverse();
  for (let j = 0; j < dirs.length; j++) {
    Fs.rmdirSync(dirs[j]);
  }
  Fs.rmdirSync(dir);
  return true;
}
function mkdir2(dir) {
  return new Promise(function(resolve, reject) {
    Fs.mkdir(dir, function(err) {
      if (err && err.code !== "EEXIST") {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
async function move(fromFile, toFile) {
  await copy(fromFile, toFile);
  return remove(fromFile);
}
function rename(fromFile, toFile) {
  return move(fromFile, toFile);
}
async function ensureDir(path) {
  path = import_path.normalize(path);
  if (isDirectory(path))
    return new Promise((resolve) => resolve(true));
  const dirs = path.split(/\\|\//);
  const initial = import_path.isAbsolute(path) ? dirs.shift() : ".";
  const slash = process.platform == "win32" ? "\\" : "/";
  let res = initial;
  let d = "";
  for (let i = 0; i < dirs.length; i++) {
    d = dirs[i];
    if (d === ".")
      continue;
    res += slash + d;
    if (!isDirectory(res))
      await mkdir2(res);
  }
}
function fetch(include, exclude) {
  const FL = new import_filelist.FileList();
  const includes = Array.isArray(include) ? include : [include];
  const excludes = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];
  includes.forEach((inc) => FL.include(inc));
  excludes.forEach((exc) => FL.exclude(exc));
  let files = [];
  try {
    files = FL.toArray();
  } catch (e) {
  }
  files = files.filter(function(file) {
    return isFile(file);
  });
  return files;
}
function fetchDirs(include, exclude) {
  const FL = new import_filelist.FileList();
  const includes = Array.isArray(include) ? include : [include];
  const excludes = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];
  includes.forEach((inc) => FL.include(inc));
  excludes.forEach((exc) => FL.exclude(exc));
  const files = FL.toArray().filter(function(file) {
    return isDirectory(file);
  });
  return files;
}
async function writeFile2(file, content) {
  await ensureDir(import_path.dirname(file));
  return new Promise((resolve, reject) => {
    Fs.writeFile(file, content, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
function readFile2(file, options) {
  if (!isFile(file))
    throw "This is not a file.";
  return new Promise((resolve, reject) => {
    Fs.readFile(file, options, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
async function editFile(file, callback) {
  const content = await readFile2(file);
  const modified = await callback(content);
  return writeFile2(file, modified);
}
function appendFile2(file, content) {
  return new Promise((resolve, reject) => {
    Fs.appendFile(file, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
function isSymbolicLink(path) {
  try {
    const stats = Fs.statSync(path);
    if (!stats.isSymbolicLink())
      throw "Not a symbolic link";
  } catch (e) {
    return false;
  }
  return true;
}
async function symlink2(fromPath, toPath) {
  if (!import_path.isAbsolute(fromPath))
    fromPath = import_path.join(process.cwd(), fromPath);
  if (!import_path.isAbsolute(toPath))
    toPath = import_path.join(process.cwd(), toPath);
  if (isSymbolicLink(toPath) || exists(toPath)) {
    throw `Cannot create a symbolic link at ${toPath}`;
  }
  await ensureDir(import_path.dirname(toPath));
  return new Promise((resolve, reject) => {
    Fs.symlink(fromPath, toPath, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
async function symlink22(fromPath, toPath, shell = process.platform == "win32" ? "cmd" : "bash") {
  if (exists(toPath))
    throw `Cannot create a symbolic link at ${toPath}`;
  let command = "";
  if (!import_path.isAbsolute(fromPath))
    fromPath = import_path.join(process.cwd(), fromPath);
  if (!import_path.isAbsolute(toPath))
    toPath = import_path.join(process.cwd(), toPath);
  await ensureDir(import_path.dirname(toPath));
  if (process.platform == "win32") {
    command = `mklink /D "${toPath}" "${fromPath}"`;
  } else {
    command = `ln -s ${fromPath} ${toPath}`;
  }
  return new Promise((resolve, reject) => {
    const cmd = command.split(" ");
    const cli = cmd.shift();
    const ps = import_child_process2.spawnSync(cli, cmd, {shell});
    if (ps.error) {
      reject(ps.error);
    } else {
      resolve(true);
    }
  });
}
function touch(path) {
  const id = Fs.openSync(path, "w");
  Fs.closeSync(id);
  return true;
}
function ensureDirSync(path) {
  path = import_path.normalize(path);
  if (isDirectory(path))
    return;
  const dirs = path.split(/\\|\//);
  const initial = import_path.isAbsolute(path) ? dirs.shift() : ".";
  const slash = process.platform == "win32" ? "\\" : "/";
  let res = initial;
  let d = "";
  for (let i = 0; i < dirs.length; i++) {
    d = dirs[i];
    if (d === ".")
      continue;
    res += slash + d;
    if (!isDirectory(res))
      Fs.mkdirSync(res);
  }
}
function writeFileSync2(file, content) {
  ensureDirSync(import_path.dirname(file));
  Fs.writeFileSync(file, content);
}
function editFileSync(file, callback) {
  const content = Fs.readFileSync(file);
  const modified = callback(content);
  return writeFileSync2(file, modified);
}
function removeSync(path) {
  if (isDirectory(path))
    return removeDirSync(path);
  if (!isFile(path))
    throw "Cannot be removed. This is not a file.";
  Fs.unlinkSync(path);
}
function removeDirSync(dir) {
  const files = fetch(import_path.join(dir, "**/*"));
  for (let i = 0; i < files.length; i++) {
    removeSync(files[i]);
  }
  const dirs = fetchDirs(import_path.join(dir, "**/*")).reverse();
  for (let j = 0; j < dirs.length; j++) {
    Fs.rmdirSync(dirs[j]);
  }
  Fs.rmdirSync(dir);
}

// lib/node/memory-stream.ts
var import_stream = __toModule(require("stream"));
var MemoryStream = class extends import_stream.Transform {
  constructor() {
    super(...arguments);
    this._buffer = new Buffer("");
  }
  _transform(chunk2, encoding, callback) {
    var bf = Buffer.isBuffer(chunk2) ? chunk2 : new Buffer(chunk2);
    this._buffer = Buffer.concat([this._buffer, bf]);
    this.push(chunk2, encoding);
    callback();
  }
  data(encoding) {
    return encoding ? this._buffer.toString(encoding) : this._buffer;
  }
};

// lib/node/require-string.ts
var import_path2 = __toModule(require("path"));
var import_module = __toModule(require("module"));
function requireContent(code, filename, context) {
  const paths = import_module.default._nodeModulePaths(import_path2.dirname(filename));
  const parent = require.main;
  const mod = new import_module.default(filename, parent);
  mod.filename = filename;
  mod.exports = context;
  mod.loaded = true;
  mod.paths = paths;
  mod._compile(code, filename);
  const xports = mod.exports;
  parent && parent.children && parent.children.splice(parent.children.indexOf(mod), 1);
  return xports;
}
function requireJSON(json, filename, context) {
  return requireContent(`module.exports = ${json}`, filename, context);
}

// lib/index-node.ts
var _2 = {
  node: node_exports,
  ..._
};
