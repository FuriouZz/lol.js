import { Writable, WritableOptions } from 'stream'

const memStore:{ [key:string]: Buffer } = {}

export class MemoryStream extends Writable {

  constructor(public key:string, options?:WritableOptions) {
    super(options)
    memStore[this.key] = new Buffer('')
  }

  _write( chunk: Buffer|string, encoding: string, callback: (err?: Error) => void ) {
    var bf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk)
    memStore[this.key] = Buffer.concat([memStore[this.key], bf])
    callback()
  }

  getData(encoding?: string) {
    return encoding ? memStore[this.key].toString(encoding) : memStore[this.key]
  }

  clean() {
    if (memStore[this.key]) {
      delete memStore[this.key]
    }
  }

}