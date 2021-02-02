import { Transform } from 'stream';
export class MemoryStream extends Transform {
    constructor() {
        super(...arguments);
        this._buffer = new Buffer('');
    }
    _transform(chunk, encoding, callback) {
        var bf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk);
        this._buffer = Buffer.concat([this._buffer, bf]);
        this.push(chunk, encoding);
        callback();
    }
    data(encoding) {
        return encoding ? this._buffer.toString(encoding) : this._buffer;
    }
}
