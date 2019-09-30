var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defer } from "./index";
export class Cache {
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
