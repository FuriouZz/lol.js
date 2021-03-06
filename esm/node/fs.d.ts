/// <reference types="node" />
export declare function isFile(path: string): boolean;
export declare function isDirectory(path: string): boolean;
export declare function exists(path: string): boolean;
export declare function copy(fromFile: string, toFile: string): Promise<boolean>;
export declare function remove(path: string): Promise<boolean>;
export declare function removeDir(dir: string): Promise<boolean>;
export declare function mkdir(dir: string): Promise<boolean>;
export declare function move(fromFile: string, toFile: string): Promise<boolean>;
export declare function rename(fromFile: string, toFile: string): Promise<boolean>;
export declare function ensureDir(path: string): Promise<boolean | undefined>;
export declare function fetch(include: string | string[], exclude?: string | string[]): string[];
export declare function fetchDirs(include: string | string[], exclude?: string | string[]): string[];
export declare function writeFile(file: string, content: string | Buffer): Promise<boolean>;
export declare function readFile(file: string, options?: {
    encoding: "utf8";
    flag?: string;
} | string | undefined | null): Promise<string>;
export declare function readFile(file: string, options?: {
    encoding: "utf-8";
    flag?: string;
} | string | undefined | null): Promise<string>;
export declare type EditFileCallback = (value: string | Buffer) => string | Buffer | Promise<string | Buffer>;
export declare function editFile(file: string, callback: EditFileCallback): Promise<boolean>;
export declare function appendFile(file: string, content: string | Buffer): Promise<unknown>;
export declare function isSymbolicLink(path: string): boolean;
export declare function symlink(fromPath: string, toPath: string): Promise<boolean>;
declare type ShellType = 'cmd' | 'bash' | 'powershell' | 'zsh';
export declare function symlink2(fromPath: string, toPath: string, shell?: ShellType): Promise<boolean>;
export declare function touch(path: string): boolean;
export declare function ensureDirSync(path: string): void;
export declare function writeFileSync(file: string, content: string | Buffer): void;
export declare function editFileSync(file: string, callback: (value: string | Buffer) => string | Buffer): void;
export declare function removeSync(path: string): void;
export declare function removeDirSync(dir: string): void;
export {};
