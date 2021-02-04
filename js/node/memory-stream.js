"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStream = void 0;
var stream_1 = require("stream");
var MemoryStream = /** @class */ (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._buffer = new Buffer('');
        return _this;
    }
    MemoryStream.prototype._transform = function (chunk, encoding, callback) {
        var bf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk);
        this._buffer = Buffer.concat([this._buffer, bf]);
        this.push(chunk, encoding);
        callback();
    };
    MemoryStream.prototype.data = function (encoding) {
        return encoding ? this._buffer.toString(encoding) : this._buffer;
    };
    return MemoryStream;
}(stream_1.Transform));
exports.MemoryStream = MemoryStream;
