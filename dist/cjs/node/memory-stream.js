"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var memStore = {};
var MemoryStream = /** @class */ (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(key, options) {
        var _this = _super.call(this, options) || this;
        _this.key = key;
        memStore[_this.key] = new Buffer('');
        return _this;
    }
    MemoryStream.prototype._write = function (chunk, encoding, callback) {
        var bf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk);
        memStore[this.key] = Buffer.concat([memStore[this.key], bf]);
        callback();
    };
    MemoryStream.prototype.getData = function (encoding) {
        return encoding ? memStore[this.key].toString(encoding) : memStore[this.key];
    };
    MemoryStream.prototype.clean = function () {
        if (memStore[this.key]) {
            delete memStore[this.key];
        }
    };
    return MemoryStream;
}(stream_1.Writable));
exports.MemoryStream = MemoryStream;
