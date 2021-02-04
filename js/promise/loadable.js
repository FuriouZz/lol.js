"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loadable = void 0;
var Loadable = /** @class */ (function () {
    function Loadable() {
        this._promises = [];
        this._all = null;
    }
    Loadable.prototype.add = function (data) {
        if (this._all)
            return;
        if (typeof data === "function") {
            var p = data();
            if (typeof p.then === "function") {
                this._promises.push(p);
            }
            else {
                this._promises.push(Promise.resolve(p));
            }
        }
        else if (typeof data === "object" && typeof data.then === "function") {
            this._promises.push(data);
        }
    };
    Loadable.prototype.push = function (data) {
        return this.add(data);
    };
    Loadable.prototype.finish = function () {
        if (this._all)
            return this._all;
        return this._all = Promise.all(this._promises);
    };
    return Loadable;
}());
exports.Loadable = Loadable;
