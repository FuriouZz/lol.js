/// <reference types="node" />
import { Transform } from 'stream';
export declare class MemoryStream extends Transform {
    private _buffer;
    _transform(chunk: Buffer | string, encoding: string, callback: (err?: Error) => void): void;
    data(encoding?: string): string | Buffer;
}
