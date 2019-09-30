import { Writable } from 'stream';
const memStore = {};
export class MemoryStream extends Writable {
    constructor(key, options) {
        super(options);
        this.key = key;
        memStore[this.key] = new Buffer('');
    }
    _write(chunk, encoding, callback) {
        var bf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk);
        memStore[this.key] = Buffer.concat([memStore[this.key], bf]);
        callback();
    }
    getData(encoding) {
        return encoding ? memStore[this.key].toString(encoding) : memStore[this.key];
    }
    clean() {
        if (memStore[this.key]) {
            delete memStore[this.key];
        }
    }
}
