/// <reference types="node" />
import { Writable, WritableOptions } from 'stream';
export declare class MemoryStream extends Writable {
    key: string;
    constructor(key: string, options?: WritableOptions);
    _write(chunk: Buffer | string, encoding: string, callback: (err?: Error) => void): void;
    getData(encoding?: string): string | Buffer;
    clean(): void;
}
