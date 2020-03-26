/// <reference types="node" />
import { SpawnOptions } from 'child_process';
import { Readable, Writable } from 'stream';
export interface ExecOptions extends SpawnOptions {
    throwOnError?: boolean;
    color?: boolean;
    extendEnv?: boolean;
    fetchStdout?: boolean;
    fetchStderr?: boolean;
}
export interface ExecEntry {
    command: string;
    options: ExecOptions;
}
export interface ExecResult {
    code: number | null;
    signal: NodeJS.Signals | null;
    stdout: Buffer;
    stderr: Buffer;
}
export declare class Exec {
    protected defer: import("../promise").DeferredPromise<ExecResult>;
    stdout?: Readable;
    stderr?: Readable;
    stdin?: Writable;
    stdio: [Writable?, Readable?, Readable?];
    then<TResult1 = ExecResult, TResult2 = never>(onfulfilled?: ((value: ExecResult) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<ExecResult | TResult>;
    promise(): Promise<ExecResult>;
    run(command: string, options?: ExecOptions): this;
}
export declare function exec(command: string, options?: ExecOptions): Exec;
export declare function execParallel(commands: Array<ExecEntry | string>): Promise<ExecResult[]>;
export declare function execSerie(commands: Array<ExecEntry | string>): Promise<void>;
