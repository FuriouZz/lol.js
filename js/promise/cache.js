"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Cache = /** @class */ (function () {
    function Cache() {
        this.items = {};
    }
    Cache.prototype.get = function (key) {
        return this.items[key];
    };
    Cache.prototype.set = function (key, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var d, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.items[key])
                            return [2 /*return*/, this.items[key]];
                        d = this.create(key);
                        _b = (_a = d).resolve;
                        return [4 /*yield*/, resolve()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, d.promise];
                }
            });
        });
    };
    Cache.prototype.create = function (key) {
        if (this.items[key])
            return this.items[key];
        return this.items[key] = _1.defer();
    };
    Cache.prototype.createBatch = function (keys, to_object) {
        if (to_object === void 0) { to_object = false; }
        var records;
        if (to_object) {
            records = {};
        }
        else {
            records = [];
        }
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var item = this.create(key);
            if (to_object) {
                records[key] = item;
            }
            else {
                records.push(item);
            }
        }
        return records;
    };
    Cache.prototype.remove = function (key) {
        delete this.items[key];
    };
    Cache.prototype.removeBatch = function (keys) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            this.remove(key);
        }
    };
    Cache.prototype.resolve = function (key, value) {
        if (!this.items[key]) {
            throw new Error("[Cache] No item with key \"" + key + "\" found");
        }
        this.items[key].resolve(value);
    };
    Cache.prototype.resolveBatch = function (items, keys) {
        if (keys === void 0) { keys = ['key', 'value']; }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.resolve(item[keys[0]], item[keys[1]]);
        }
    };
    Cache.prototype.reject = function (key, value) {
        if (!this.items[key]) {
            throw new Error("[Cache] No item with key \"" + key + "\" found");
        }
        this.items[key].reject(value);
    };
    Cache.prototype.rejectBatch = function (items, keys) {
        if (keys === void 0) { keys = ['key', 'value']; }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.reject(item[keys[0]], item[keys[1]]);
        }
    };
    return Cache;
}());
exports.Cache = Cache;
